import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { popResultSelector } from 'rxjs/internal/util/args';

@Component({
  selector: 'app-actor-details',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './actor-details.component.html',
  styleUrls: ['./actor-details.component.css']
})
export class ActorDetailsComponent implements OnInit {
  actor: any;
  loading = true;
  error: string | null = null;
  actorCredits : any = []

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    const actorId = this.route.snapshot.params['id'];
    if (actorId) {
      this.loading = true;
      
      // Fetch actor details
      this.movieService.getActorDetails(actorId).subscribe({
        next: (data) => {
          this.actor = data;
          this.loading = false;
  
          // ✅ Now fetch actor credits (AFTER confirming actor exists)
          this.actorMovieCredits(actorId);
        },
        error: (err) => {
          this.error = 'Failed to fetch actor details.';
          this.loading = false;
          console.error(err);
        }
      });
    } else {
      this.error = 'No actor ID found in route.';
      this.loading = false;
    }
    
        // ✅ Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  


  actorMovieCredits(id:any){
    this.movieService.getActorTvCredits(id).subscribe((result) =>{
      this.actorCredits = result.cast
    }
  )}
  
  goBack() {
    window.history.back();
  }
  
}
