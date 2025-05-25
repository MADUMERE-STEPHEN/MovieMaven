import { Component, OnInit, Input } from '@angular/core';
import { MovieService } from '../../services/movie.service';

import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common'; // 👈 import this

import { WatchlistService } from '../../services/watchlist.service';
import { Movie } from '../../movie.model';
@Component({
  selector: 'app-upcoming',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './upcoming.component.html',
  styleUrl: './upcoming.component.css'
})
export class UpcomingComponent implements OnInit{
   @Input() movie!: Movie;
upComing: any = []
  constructor(private service: MovieService, private router: ActivatedRoute,  private location: Location, private watchlistService: WatchlistService){}

  ngOnInit(): void {
    this.UpcomingMOvies()
  }

  
  UpcomingMOvies(){
    this.service.getUpcomingMovies().subscribe((result) =>{
      this.upComing = result.results;
    })
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
