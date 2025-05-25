import { Component, OnInit } from '@angular/core';
import { WatchlistService } from '../../services/watchlist.service';
import { Movie } from '../../movie.model';
import { ActivatedRoute,RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovieService } from '../../services/movie.service';
import { Location } from '@angular/common'; // 👈 import this
@Component({
  selector: 'app-watchlist',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {
  watchlist: Movie[] = [];

  constructor(private watchlistService: WatchlistService, private service: MovieService, private router: ActivatedRoute,  private location: Location) {}

  ngOnInit() {
    this.watchlist = this.watchlistService.getWatchlist();
  }

  remove(movieId: string) {
    this.watchlistService.removeFromWatchlist(movieId);
    this.watchlist = this.watchlistService.getWatchlist();
  }

  
  goBack() {
    this.location.back(); // 👈 goes back to previous page in history
  }
}
