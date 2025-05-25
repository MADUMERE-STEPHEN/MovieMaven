import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MovieService } from '../../services/movie.service';

MovieService
@Component({
  selector: 'app-search',
  imports: [FormsModule, RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit{
  searchQuery: string = '';

constructor(private service: MovieService){}

  ngOnInit(): void {
    
  }
searchResult: any;
  searchForm = new FormGroup({
    'movieName': new FormControl(null)
  })

  submitForm(){
    console.log(this.searchForm.value, 'searchform#')
    this.service.getSearchMovie(this.searchForm.value).subscribe((result) =>{
      console.log(result, "searchmovie#")
      this.searchResult = result.results
    })
  }
}
