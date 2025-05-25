import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SearchComponent } from '../search/search.component';
import { CategoriesComponent } from '../../pages/categories/categories.component';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, FormsModule, CommonModule, SearchComponent, CategoriesComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
}