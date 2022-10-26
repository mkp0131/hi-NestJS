import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, // 클래스의 멤버가 아닌 다른 멤버값이 있다면 경고문을 출력한다.
        forbidNonWhitelisted: true,
        transform: true, // REST 에서 넘어온 값을 자동으로 형변환 해준다.
      }),
    );
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('This is NestJS API');
  });

  describe('/movies', () => {
    it('/ (GET / getAllMovie)', () => {
      return request(app.getHttpServer()) //
        .get('/movies')
        .expect(200)
        .expect([]);
    });

    it('/ (POST / create)', () => {
      return request(app.getHttpServer()) //
        .post('/movies')
        .send({
          title: '영화 제목',
          year: 2022,
        })
        .expect(201);
    });
    it('/ (POST / 404)', () => {
      return request(app.getHttpServer()) //
        .post('/movies')
        .send({})
        .expect(400);
    });
  });

  describe('/movies/:id', () => {
    it('GET 200', () => {
      return request(app.getHttpServer()) //
        .get('/movies/1')
        .expect(200);
    });

    it('GET 404', () => {
      return request(app.getHttpServer()) //
        .get('/movies/9999')
        .expect(404);
    });

    it('patch 200', () => {
      return request(app.getHttpServer()) //
        .patch('/movies/1')
        .send({
          title: 'ㅏㅏㅏㅏ',
        })
        .expect(200);
    });

    it('delete 200', () => {
      return request(app.getHttpServer()) //
        .delete('/movies/1')
        .expect(200);
    });
  });
});
