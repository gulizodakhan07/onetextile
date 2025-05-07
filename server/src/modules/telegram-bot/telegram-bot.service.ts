import { Injectable } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';

@Injectable()
export class TelegramBotService {
  constructor(@InjectBot() private readonly bot: Telegraf) {}

  async sendInvoiceNotification(data: {
    invoiceNumber: string;
    from: string;
    to: string;
    amount: number;
    currentBalance: number;
    totalBalance: number;
    debt: number;
    phone: string;
  }) {
    const chatId = process.env.CHAT_ID;

    const message = `📄 Faktura №${data.invoiceNumber}

🔄 ${data.from} → ${data.to}
📦 Tovar summasi: ${data.amount} USD
📊 Hozirgi qoldiq: ${data.currentBalance} USD
💰 Jami qoldiq: ${data.totalBalance} USD
💳 Qarzdorlik: ${data.debt} USD

📞 TEL: ${data.phone}`;

    await this.bot.telegram.sendMessage(chatId, message);
  }


}
