import { TelegrafModule } from 'nestjs-telegraf';
import { TelegramBotService } from './telegram-bot.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
console.log('BOT TOKEN from env:', process.env.BOT_TOKEN)


@Module({
  imports: [
    ConfigModule.forRoot(),
    TelegrafModule.forRoot({
      token: process.env.BOT_TOKEN,
    }),
  ],

  providers: [TelegramBotService],
  exports: [TelegramBotService],
})
export class TelegramModule {}
