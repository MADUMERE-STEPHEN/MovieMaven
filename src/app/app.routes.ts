import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { MovieDetailComponent } from './pages/movie-detail/movie-detail.component';
import { DiscoverComponent } from './pages/discover/discover.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { ActorDetailsComponent } from './pages/actor-details/actor-details.component';
import { WatchlistComponent } from './pages/watchlist/watchlist.component';
import { UpcomingComponent } from './pages/upcoming/upcoming.component';
export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'search', component: SearchComponent},
    {path: 'movie/:id', component:MovieDetailComponent},
    {path: 'discover', component: DiscoverComponent},
  { path: 'categories', component: CategoriesComponent }, // 
  {path: 'actor/:id', component:ActorDetailsComponent},
  {path: 'watchlist', component: WatchlistComponent},
  {path: 'upcoming', component: UpcomingComponent}
];
