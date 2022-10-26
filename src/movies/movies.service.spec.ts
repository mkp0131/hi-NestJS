import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);

    // 모든 테스트 하기전에 실행
    // 테스트의 목업 데이터를 여기에 넣어도 된다.
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // getAllMovies 메소드 테스트
  describe('getAllMovies', () => {
    // 배열인지 확인
    it('It should be Array', () => {
      expect(service.getAllMovies()).toBeInstanceOf(Array);
    });
  });

  // getMovie 메소드 테스트
  describe('getMovie', () => {
    // movie 리턴 확인
    it('It should be defined', () => {
      service.createMovie({
        title: '영화 타이틀',
        year: 2022,
        genres: ['액션', '멜로'],
      });
      const movie = service.getMovie(1);
      expect(movie).toBeDefined();
    });
    // 404 리턴 확인
    it('get movie 404', () => {
      try {
        const movie = service.getMovie(99999999);
      } catch (error) {
        // nestJS의 404 객체가 맞는지 확인
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('deleteMovie', () => {
    it('delete a movie', () => {
      service.createMovie({
        title: '영화 타이틀',
        year: 2022,
        genres: ['액션', '멜로'],
      });
      const beforeDelete = service.getAllMovies().length;
      service.deleteMovie(1);
      const afterDelete = service.getAllMovies().length;
      expect(afterDelete).toBeLessThan(beforeDelete);
    });

    it('should be return 404', () => {
      try {
        service.deleteMovie(999999);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  // 생성
  describe('create', () => {
    it('create movie', () => {
      const beforeCreate = service.getAllMovies().length;
      service.createMovie({
        title: '영화 타이틀',
        year: 2022,
        genres: ['액션', '멜로'],
      });
      const afterCreate = service.getAllMovies().length;
      expect(afterCreate).toEqual(beforeCreate + 1);
    });
  });

  // 업데이트
  describe('patach', () => {
    it('update movie', () => {
      const MOVIE_TITLE = '테스트';
      service.createMovie({
        title: '영화 타이틀',
        year: 2022,
        genres: ['액션', '멜로'],
      });
      service.patchMovie(1, {
        title: MOVIE_TITLE,
      });
      const movie = service.getMovie(1);
      expect(movie.title).toEqual(MOVIE_TITLE);
    });

    it('patch 404', () => {
      try {
        service.patchMovie(99999, {});
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
