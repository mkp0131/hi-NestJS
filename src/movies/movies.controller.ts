import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create.movie.dto';
import { UpdateMovieDto } from './dto/update.movie.dto';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly movieServvice: MoviesService) {}

  @Get()
  getAllMovies() {
    return this.movieServvice.getAllMovies();
  }

  @Get('search')
  searchMovies(@Query('keyword') keyword: string) {
    return 'dd';
  }

  @Get(':movieId')
  getMovie(@Param('movieId') movieId: number) {
    return this.movieServvice.getMovie(movieId);
  }

  @Post()
  createMovie(@Body() movieData: CreateMovieDto) {
    return this.movieServvice.createMovie(movieData);
  }

  @Delete(':movieId')
  deleteMovie(@Param('movieId') movieId: number) {
    return this.movieServvice.deleteMovie(movieId);
  }

  @Patch(':movieId')
  patchMovie(
    @Param('movieId') movieId: number,
    @Body() updateData: UpdateMovieDto,
  ) {
    return this.movieServvice.patchMovie(movieId, updateData);
  }
}
