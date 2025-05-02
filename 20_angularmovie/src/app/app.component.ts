import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Add this import
interface Movie {
  title: string;
  year: number;
  genre: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule], // Add CommonModule here
  template: `
    <div class="container">
      <h1>Movie Search App</h1>
      <div class="search-box">
        <input [(ngModel)]="searchTerm" placeholder="Search movies..." class="search-input">
        <button (click)="searchMovies()" class="search-button">Search</button>
      </div>

      <div class="results">
        <!-- Search Results -->
        <div *ngIf="filteredMovies.length > 0">
          <div *ngFor="let movie of filteredMovies" class="movie-card">
            <div class="movie-details">
              <h3 class="movie-title">{{ movie.title }}</h3>
              <p class="movie-info">{{ movie.genre }} | Released: {{ movie.year }}</p>
            </div>
          </div>
        </div>

        <!-- No Results Message -->
        <div *ngIf="searchPerformed && filteredMovies.length === 0" class="no-results">
          No movies found for "{{ searchTerm }}"
        </div>

        <!-- Initial State -->
        <div *ngIf="!searchPerformed" class="initial-state">
          Enter a movie title to start searching
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 800px;
      margin: 2rem auto;
      padding: 20px;
      font-family: Arial, sans-serif;
    }

    .search-box {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }

    .search-input {
      flex: 1;
      padding: 10px;
      font-size: 16px;
      border: 2px solid #ddd;
      border-radius: 4px;
    }

    .search-button {
      padding: 10px 20px;
      background: #2196F3;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background 0.3s;
    }

    .search-button:hover {
      background: #1976D2;
    }

    .movie-card {
      background: #ffffff;
      padding: 15px;
      margin-bottom: 10px;
      border-radius: 5px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .movie-title {
      color: #2c3e50;
      margin: 0 0 5px 0;
    }

    .movie-info {
      color: #7f8c8d;
      margin: 0;
    }

    .no-results {
      padding: 20px;
      background: #ffeeba;
      border-radius: 4px;
      color: #856404;
      text-align: center;
    }

    .initial-state {
      padding: 20px;
      background: #f8f9fa;
      border-radius: 4px;
      color: #6c757d;
      text-align: center;
    }
  `]
})
export class AppComponent {
  searchTerm = '';
  searchPerformed = false;
  movies: Movie[] = [
    { title: 'The Matrix', year: 1999, genre: 'Sci-Fi' },
    { title: 'Inception', year: 2010, genre: 'Action' },
    { title: 'Titanic', year: 1997, genre: 'Drama' },
    { title: 'Jurassic Park', year: 1993, genre: 'Adventure' },
    { title: 'Avatar', year: 2009, genre: 'Fantasy' }
  ];
  filteredMovies: Movie[] = [];

  searchMovies() {
    this.searchPerformed = true;
    this.filteredMovies = this.movies.filter(movie =>
      movie.title.toLowerCase().includes(this.searchTerm.toLowerCase().trim())
    );
  }
}
