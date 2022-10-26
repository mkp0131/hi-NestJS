# NestJS API 만들기

## NestJS Validation DTO / 벨리데이션 유효성 검사

- `class-transformer`, `class-validator` 패키지 설치

```sh
npm i class-transformer class-validator
```

- `main.ts` 에 파이프라인 추가

```ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
```

- `.dto.ts` 파일 추가

```ts
import { IsNumber, IsString } from 'class-validator';

// `Is` -> 앞의 `I` 가 대문자 임에 유의하자
export class CreateMovieDto {
  @IsString()
  readonly title: string;
  @IsNumber()
  readonly year: number;
  // each 옵션 리스트내 모든 아이템을 검사
  @IsString({ each: true })
  readonly genres: string[];
}
```

## NestJS DTO 타입 상속 extends

- `@nestjs/mapped-types` 패키지 설치

```sh
npm i @nestjs/mapped-types
```

```ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create.movie.dto';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {}
```

- DTO 가 클래스이기 때문에 type 의 Partial 은 사용이 안되는 듯 하다.
