import { Component, Input,OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common'; // 👈 import this

import { WatchlistService } from '../../services/watchlist.service';
import { Movie } from '../../movie.model';
@Component({
  selector: 'app-discover',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './discover.component.html',
  styleUrl: './discover.component.css'
})
export class DiscoverComponent implements OnInit{
  @Input() movie!: Movie;
  discoverMovieResult : any = []
  discovertvResult: any = []
  getMovieDetailResult: any;
  constructor(private service : MovieService,  private router: ActivatedRoute,  private location: Location, private watchlistService: WatchlistService){}

  ngOnInit(): void {
    
    let ParamId = this.router.snapshot.paramMap.get('id');
    this.discoverMovie()
    this.discovertv()
    this.getMovie(ParamId)
  }

  discoverMovie(){
    this.service.getDiscoverMovie().subscribe((result) =>{
      console.log(result, "discovermovie#")
      this.discoverMovieResult = result.results;
    })
  }

  discovertv(){
    this.service.getDiscovertv().subscribe((result) =>{
      console.log(result, "discovermtv#")
      this.discovertvResult = result.results;
    })
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
