import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import ExceptionHandlerFilter from './filters/exception.filters';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{logger:['log','error','warn','debug']});
  app.use(cookieParser())
  app.setGlobalPrefix('api')
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: "1"
  });
  app.enableCors({
    origin: '*', 
    credentials: true, 
  });
  const config = new DocumentBuilder()
  .setTitle('One Textile CRM')
  .setDescription("Loyiha Farg’onadagi textile firma uchun ip mahsulotlarini xisoblash, kirdi -chiqtilar, mijozlar bilan qazrdorlik va haqdorlikni doimiy kuzatish uchun. Ip dastlab furada xomip bolib keladi uni asosiy bazaga qo’shadi va buni rang berish uchun bo’yoqxonaga yuboradi bu yerdagi protses saytda ko’rinib turishi kerak yani boyoqxonaga qancha Kg ip yuborildi. Bo’yoqxonadan chiqgan ip togri bazaga yana qaytib keladi va bazadan mijozlarga uzatiladi. Har bir mijozga uzatilgan mahsulot faktura bolib saqlanib boradi. Mijozga yuborilgan mahsulot bazadan arxivga o’tadi. Mijozni qancha qarzi bor har bir fakturada qancha qazr qoshilgan yoki o’sha mijozdan qancha qazrdorlik bor shu malumotlar har bir fakturada va qarzdorliklar sahifasida bo’ladi.")
  .setVersion('1.0')
  .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
  .build();
  const document = SwaggerModule.createDocument(app,config)
  SwaggerModule.setup('/api/docs',app,document)
  app.useGlobalPipes(new ValidationPipe({transform: true,whitelist: true}))
  app.useGlobalFilters(new ExceptionHandlerFilter())

  await app.listen(process.env.PORT,()=>{console.log('Server run on ',process.env.PORT)});
}
bootstrap();
