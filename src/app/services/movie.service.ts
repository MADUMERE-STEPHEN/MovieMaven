import { HttpClient } from '@angular/common/http';
import { ReturnStatement } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {


  baseURL = "https://api.themoviedb.org/3";
  apiKey = "050bdf82e0d6f98ef62a3e6320f07e2c"
  constructor(private http: HttpClient) { }


  bannerApiData():Observable<any>{
    return this.http.get(`${this.baseURL}/trending/all/week?api_key=${this.apiKey}`)
  }


  trendingMovies():Observable<any>{
    return this.http.get(`${this.baseURL}/trending/movie/day?api_key=${this.apiKey}`)
  }

 nowPlaying():Observable<any>{
  return this.http.get(`${this.baseURL}/movie/now_playing?api_key=${this.apiKey}`)
 }

tvSeries():Observable<any>{
  return this.http.get(`${this.baseURL}/trending/tv/week?api_key=${this.apiKey}`)
}

getDiscoverMovie():Observable<any>{
  return this.http.get(`${this.baseURL}/discover/movie?api_key=${this.apiKey}`)
}


getDiscovertv():Observable<any>{
  return this.http.get(`${this.baseURL}/discover/tv?api_key=${this.apiKey}`)
}


getSearchMovie(data:any):Observable<any>{
  console.log(data)
  return this.http.get(`${this.baseURL}/search/movie?api_key=${this.apiKey}&query=${data.movieName}`)
}

getMovieDetails(data:any):Observable<any>{
  console.log(data, "moviedetails#")
  return this.http.get(`${this.baseURL}/movie/${data}?api_key=${this.apiKey}&query=${data.movieName}`)
}


gettvDetails(data:any):Observable<any>{
  console.log(data, "tvdetails#")
  return this.http.get(`${this.baseURL}/tv/${data}?api_key=${this.apiKey}&query=${data.movieName}`)
}

getMovieVid(data:any):Observable<any>{
  return this.http.get(`${this.baseURL}/movie/${data}/videos?api_key=${this.apiKey}`)
}

getMovieCast(data:any):Observable<any>{
  return this.http.get(`${this.baseURL}/movie/${data}/credits?api_key=${this.apiKey}`)
}

getActionMovies():Observable<any>{
  return this.http.get(`${this.baseURL}/discover/movie?api_key=${this.apiKey}&with_genres=28`)
}

getAdventureMovies():Observable<any>{
  return this.http.get(`${this.baseURL}/discover/movie?api_key=${this.apiKey}&with_genres=12`)
}
getAnimationMovies():Observable<any>{
  return this.http.get(`${this.baseURL}/discover/movie?api_key=${this.apiKey}&with_genres=16`)
}
getComedyMovies():Observable<any>{
  return this.http.get(`${this.baseURL}/discover/movie?api_key=${this.apiKey}&with_genres=35`)
}
getDocumentaryMovies():Observable<any>{
  return this.http.get(`${this.baseURL}/discover/movie?api_key=${this.apiKey}&with_genres=99`)
}
getScienceFictionMovies():Observable<any>{
  return this.http.get(`${this.baseURL}/discover/movie?api_key=${this.apiKey}&with_genres=878`)
}

getThrillerMovies():Observable<any>{
  return this.http.get(`${this.baseURL}/discover/movie?api_key=${this.apiKey}&with_genres=53`)
}


getRecommendationsMovies(data:any):Observable<any>{
  return this.http.get(`${this.baseURL}/movie/${data}/recommendations?api_key=${this.apiKey}`)
}

getActorDetails(actorId: number): Observable<any> {
  return this.http.get(`${this.baseURL}/person/${actorId}?api_key=${this.apiKey}`);
}

getActorTvCredits(actorId: number): Observable<any>{
  return this.http.get(`${this.baseURL}/person/${actorId}/combined_credits?api_key=${this.apiKey}`)
}

getUpcomingMovies():Observable<any>{
  return this.http.get(`${this.baseURL}/movie/upcoming?api_key=${this.apiKey}`)
}
}
