import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TelegramBotService } from './telegram-bot.service';
import { CreateTelegramBotDto } from './dto/create-telegram-bot.dto';

@Controller('telegram-bot')
export class TelegramBotController {
  constructor(private readonly telegramBotService: TelegramBotService) {}

  @Post()
  create(@Body() createTelegramBotDto: CreateTelegramBotDto) {
    return this.telegramBotService.sendInvoiceNotification(createTelegramBotDto);
  }
}
