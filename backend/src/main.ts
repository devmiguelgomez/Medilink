import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configurar CORS con orígenes dinámicos desde variables de entorno
  const allowedOrigins = process.env.CORS_ORIGIN ? 
    process.env.CORS_ORIGIN.split(',') : 
    ['http://localhost:4200', 'http://frontend', 'http://frontend:80'];
  
  console.log('CORS configurado para los siguientes orígenes:', allowedOrigins);
  
  app.enableCors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  });
  
  // Configurar validación global
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));
  
  // No es necesario un prefijo global ya que cambiamos el controlador
  
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Aplicación escuchando en el puerto ${port}`);
  console.log(`URL completa: ${await app.getUrl()}`);
}
bootstrap();
