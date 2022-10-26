import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create.movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  // 모든 무비리스트
  getAllMovies() {
    return this.movies;
  }

  createMovie(movieData: CreateMovieDto) {
    this.movies.push({ id: this.movies.length + 1, ...movieData });
  }

  // 하나의 무비
  getMovie(id: number) {
    const movie = this.movies.find((movie) => movie.id === id);
    if (!movie) {
      throw new NotFoundException(`${id} 비디오가 없습니다.`);
    }
    return movie;
  }

  deleteMovie(id: number) {
    this.getMovie(id);
    this.movies = this.movies.filter((movie) => movie.id !== id);
    return true;
  }

  patchMovie(id: number, updateData) {
    const movie = this.getMovie(id);
    this.deleteMovie(id);
    this.movies.push({ ...movie, ...updateData });
  }
}
