import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 클래스의 멤버가 아닌 다른 멤버값이 있다면 경고문을 출력한다.
      forbidNonWhitelisted: true,
      transform: true, // REST 에서 넘어온 값을 자동으로 형변환 해준다.
    }),
  );
  await app.listen(3000);
  console.log(`🔥 App Listening PORT: 3000`);
}
bootstrap();
