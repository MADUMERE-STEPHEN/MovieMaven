import { Component, Input, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { MovieService } from '../../services/movie.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from '../../components/search/search.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { WatchlistService } from '../../services/watchlist.service';
import { Movie } from '../../movie.model';



import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  imports: [NavbarComponent, CommonModule, FormsModule, SearchComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Add this line
})
export class HomeComponent implements OnInit{
  @Input() movie!: Movie;

  getMovieVidResult: string = '';
  getMovieDetailResult: any;
  // Trailer modal properties
  showTrailer: boolean = false;
  sanitizedTrailerUrl: SafeResourceUrl | undefined;
  constructor(private service: MovieService, private router: ActivatedRoute,  private sanitizer: DomSanitizer, private watchlistService: WatchlistService){}

  bannerResult: any = []
  trendingDataResult: any = []
  nowPlayingDataResult: any = []
  tvSeriesResult:any = []

  ngOnInit(): void {

    let ParamId = this.router.snapshot.paramMap.get('id');
    this.bannerData()
    this.trendingData()
    this.nowPlayingData()
    this.tvSeriesData()
    this.getVideo(ParamId);
    this.getMovie(ParamId);
    this.getVideo(ParamId);
  }

  bannerData(){
    this.service.bannerApiData().subscribe((result) =>{
      console.log(result, 'bannerresult#')
      this.bannerResult = result.results
    })
  }

  trendingData(){
    this.service.trendingMovies().subscribe((result) => {
      console.log(result, "trendingresult#")
      this.trendingDataResult = result.results 
      isHovered: false
    })
    
  }

  nowPlayingData(){
    this.service.nowPlaying().subscribe((result) => {
      console.log(result, 'nowplayingresult#')
      this.nowPlayingDataResult = result.results
    })
  }

    tvSeriesData(){
      this.service.tvSeries().subscribe((result) =>{
        console.log(result, "tvseriesresult#")
        this.tvSeriesResult = result.results
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

    getMovie(id: any) {
      this.service.getMovieDetails(id).subscribe((result) => {
        console.log(result, "moviedetails#");
        this.getMovieDetailResult = result;
  
        this.service.gettvDetails(id).subscribe((result) => {
          this.getMovieDetailResult = result;
        });
  
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

