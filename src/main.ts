import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function startApp() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('port') || 8080;

  const config = new DocumentBuilder()
    .setTitle('Vinyl record store')
    .setDescription('Documentation REST API')
    .setVersion('1.0.0')
    .addTag('LeverX-course')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);
  await app.listen(port, () => console.log('Server started on port ' + port));
}

startApp();
