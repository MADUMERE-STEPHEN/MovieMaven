import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Location } from '@angular/common'; // 👈 import this
import { WatchlistService } from '../../services/watchlist.service';
import { Movie } from '../../movie.model';


@Component({
  selector: 'app-movie-detail',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css'
})
export class MovieDetailComponent implements OnInit {
  movieId!: number;
  movie: any;
  getMovieDetailResult: any;
  getMovieCastResult: any;
  getMovieVidResult: string = '';
  genresList: string = ''; // Precomputed genres
  languagesList: string = ''; // Added for languages
  productionList: string = ''; // Added for production companies
  recommendedMoviesResult: any = []

  // Trailer modal properties
  showTrailer: boolean = false;
  sanitizedTrailerUrl: SafeResourceUrl | undefined;

  constructor(
    private service: MovieService, 
    private router: ActivatedRoute, 
    private sanitizer: DomSanitizer,
    private location: Location,
    private watchlistService: WatchlistService,
  ) {}
  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.movieId = +id;
        this.getMovie(this.movieId);
        this.getVideo(this.movieId);
        this.getCast(this.movieId);
        this.recommendedMovies(this.movieId);
  
        // ✅ Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }
  
  
  
  loadMovieDetails() {
    this.service.getMovieDetails(this.movieId).subscribe(movie => {
      this.movie = movie;
    });
  }
  getMovie(id: any) {
    this.service.getMovieDetails(id).subscribe((result) => {
      console.log(result, "moviedetails#");
      this.getMovieDetailResult = result;

      this.service.gettvDetails(id).subscribe((result) => {
        this.getMovieDetailResult = result;
      });

      this.genresList = this.getMovieDetailResult?.genres?.map((g: any) => g.name).join(', ') || 'N/A';
      this.languagesList = this.getMovieDetailResult?.spoken_languages?.map((l: any) => l.name).join(', ') || 'N/A';
      this.productionList = this.getMovieDetailResult?.production_companies?.map((p: any) => p.name).join(', ') || 'N/A';
    });
  }

recommendedMovies(id:any){
  this.service.getRecommendationsMovies(id).subscribe((result) =>{
  
    this.recommendedMoviesResult = result.results
  })
}

  getVideo(id: any) {
    this.service.getMovieVid(id).subscribe((result) => {
      console.log(result, "getvideresult");
      result.results.forEach((element: any) => {
        if (element.type === "Trailer") {
          this.getMovieVidResult = element.key;
        }
      });
    });
  }

  getCast(id: any) {
    this.service.getMovieCast(id).subscribe((result) => {
      console.log(result, "getcasteresult");
      this.getMovieCastResult = result.cast;
    });
  }

  openTrailer() {
    if (this.getMovieVidResult) {
      this.sanitizedTrailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.getMovieVidResult}`);
      this.showTrailer = true;
    }
  }

  closeTrailer() {
    this.showTrailer = false;
    this.sanitizedTrailerUrl = undefined; // Stops the video when closed
  }

  goBack() {
    this.location.back(); // 👈 goes back to previous page in history
  }

  
  toggleWatchlist(movie: Movie) {
    if (this.isInWatchlist(movie.id)) {
      this.watchlistService.removeFromWatchlist(movie.id);
    } else {
      this.watchlistService.addToWatchlist(movie);
    }
  }

  isInWatchlist(id: string): boolean {
    return this.watchlistService.isInWatchlist(id);
  }
}

