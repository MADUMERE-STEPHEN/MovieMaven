import { Injectable } from '@angular/core';
import { Movie } from '../movie.model';

@Injectable({
  providedIn: 'root',
})
export class WatchlistService {
  private storageKey = 'watchlist';

  getWatchlist(): Movie[] {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : [];
  }

  addToWatchlist(movie: Movie): void {
    const list = this.getWatchlist();
    if (!list.find((m) => m.id === movie.id)) {
      list.push(movie);
      localStorage.setItem(this.storageKey, JSON.stringify(list));
    }
  }

  removeFromWatchlist(movieId: string): void {
    const list = this.getWatchlist().filter((m) => m.id !== movieId);
    localStorage.setItem(this.storageKey, JSON.stringify(list));
  }

  isInWatchlist(movieId: string): boolean {
    return this.getWatchlist().some((m) => m.id === movieId);
  }
}
