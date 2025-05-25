import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MovieService } from '../../services/movie.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Location } from '@angular/common'; // 👈 import this

import { WatchlistService } from '../../services/watchlist.service';
import { Movie } from '../../movie.model';

@Component({
  selector: 'app-categories',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit{
  @Input() movie!: Movie;
  actionMovieResult: any = []
  adventureMovieResult: any = []
  animationMovieResult: any = []
  comedyMovieResult: any = []
  documentaryMovieResult: any = []
  sFictionMovieResult: any = []
  thrillerMovieResult: any = []

  getMovieDetailResult: any;
  constructor(private service : MovieService,  private router: ActivatedRoute,  private location: Location, private watchlistService: WatchlistService ){}

  ngOnInit(): void {
    this.actionMovie();
    this.adventureMovie();
    this.animationMovie();
    this.comedyMovie();
    this.documentaryMovie();
    this.sFictionMovie();
    this.thrillerMovie();
  }

  actionMovie(){
    this.service.getActionMovies().subscribe((result) => {

      this.actionMovieResult = result.results
    })
  }

  adventureMovie(){
    this.service.getAdventureMovies().subscribe((result) => {
      this.adventureMovieResult = result.results
    })
  }

  
  animationMovie(){
    this.service.getAnimationMovies().subscribe((result) => {
      this.animationMovieResult = result.results
    })
  }


  comedyMovie(){
    this.service.getComedyMovies().subscribe((result) => {
      this.comedyMovieResult = result.results
    })
  }


  documentaryMovie(){
    this.service.getDocumentaryMovies().subscribe((result) => {
      this.documentaryMovieResult = result.results
    })
  }

  
  sFictionMovie(){
    this.service.getScienceFictionMovies().subscribe((result) => {
      this.sFictionMovieResult = result.results
    })
  }

  
  thrillerMovie(){
    this.service.getThrillerMovies().subscribe((result) => {
      this.thrillerMovieResult = result.results
    })
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

   
  goBack() {
    this.location.back(); // 👈 goes back to previous page in history
  }
  
}
