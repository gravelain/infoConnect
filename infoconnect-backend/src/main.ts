import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Pipes globaux pour validation des DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // supprime les champs non définis dans les DTO
      forbidNonWhitelisted: true, // erreur si un champ non défini est reçu
    }),
  );

  // CORS : autorise localhost pour dev + tes futurs domaines frontend
  app.enableCors({
    origin: [
      'http://localhost:4200', // dev Angular
      'https://ton-site.netlify.app', // frontend prod Netlify
      'https://ton-domaine.com', // autre domaine prod
    ],
    methods: 'GET,POST,PATCH,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization',
  });

  // Utilise le port fourni par Render, sinon 3000 par défaut
  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`🚀 Backend running on port ${port}`);
}

void bootstrap();
