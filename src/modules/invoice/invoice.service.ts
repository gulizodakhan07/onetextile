import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { Invoice, PaymentStatus } from './entities/invoice.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from '../client/entities/client.entity';
import { InvoiceItem } from '../invoice-item/entities/invoice-item.entity';
import { InvoiceItemService } from '../invoice-item/invoice-item.service';
import { TelegramBotService } from '../telegram-bot/telegram-bot.service';

@Injectable()
export class InvoiceService {


  // async create(createInvoiceDto: CreateInvoiceDto): Promise<Invoice> {
  //   const {  discount, discountType, paidAmount, clientId, invoiceDate } = createInvoiceDto;

  //   // Mijozni topamiz
  //   const client = await this.clientRepository.findOneOrFail({ where: { id: clientId } });

  //   // Har bir item uchun totalPrice hisoblaymiz
  //   // const calculatedItems = invoiceItemsId.map(item => ({
  //   //   ...item,
  //   //   totalPrice: item.quantity * item.unitPrice,
  //   // }));

  //   // const totalAmount = calculatedItems.reduce((sum, item) => sum + item.totalPrice, 0);

  //   // Chegirmadan keyingi yakuniy summa
  //   // let finalAmount = totalAmount;
  //   // if (discountType === 'percent') {
  //   //   finalAmount -= (totalAmount * discount / 100);
  //   // } else {
  //   //   finalAmount -= discount;
  //   // }

  //   // const remainingDebt = finalAmount - paidAmount;

  //   // To‘lov holati
  //   let paymentStatus: PaymentStatus = PaymentStatus.UNPAID;
  //   // if (remainingDebt === 0) paymentStatus = PaymentStatus.PAID;
  //   // else if (paidAmount > 0) paymentStatus = PaymentStatus.PARTIALLY_PAID;

  //   // Invoice raqami avtomatik generatsiya (misol uchun oddiy)
  //   const invoiceNumber = 'INV-' + uuidv4().substring(0, 8).toUpperCase();

  //   // Har bir item ni yaratamiz (InvoiceItem)
  //   // const invoiceItems = calculatedItems.map(item => {
  //   //   return this.invoiceItemRepository.create({
  //   //     ...item,
  //   //   });
  //   // });

  //   // Invoice yaratamiz
  //   const invoice = this.invoiceRepository.create({
  //     invoiceNumber,
  //     invoiceDate,
  //     clientId: client,
  //     // invoiceItemsId: invoiceItems,
  //     discount,
  //     discountType,
  //     paidAmount,
  //     // totalAmount,
  //     // finalAmount,
  //     // remainingDebt,
  //     paymentStatus,
  //   });

  //   return await this.invoiceRepository.save(invoice);
  // }
  constructor(
    @InjectRepository(Invoice)
    private invoiceRepository: Repository<Invoice>,

    @InjectRepository(Client)
    private clientRepository: Repository<Client>,

    @InjectRepository(InvoiceItem)
    private invoiceItemRepository: Repository<InvoiceItem>,

    private readonly invoiceItemService: InvoiceItemService,

    private readonly telegramService: TelegramBotService
  ) { }
  async create(createInvoiceDto: CreateInvoiceDto): Promise<Invoice> {
    const { invoiceItemsId, discount, discountType, paidAmount, clientId, invoiceDate } = createInvoiceDto;

    const client = await this.clientRepository.findOneOrFail({ where: { id: clientId } });

    const invoiceNumber = 'INV-' + uuidv4().substring(0, 8).toUpperCase();

    // InvoiceItem larni ID bo‘yicha olib kelamiz
    const invoiceItems = await this.invoiceItemRepository.find({
      where: invoiceItemsId.map(id => ({ id })) // ID lar bo‘yicha filter
    });

    if (invoiceItems.length !== invoiceItemsId.length) {
      throw new BadRequestException("Ba'zi invoiceItem ID lar topilmadi.");
    }

    // totalAmount hisoblash
    const totalAmount = invoiceItems.reduce((sum, item) => sum + item.totalPrice, 0);

    let finalAmount = totalAmount;
    if (discountType === 'percent') {
      finalAmount -= (totalAmount * discount) / 100;
    } else {
      finalAmount -= discount;
    }

    const remainingDebt = finalAmount - paidAmount;

    let paymentStatus: PaymentStatus = PaymentStatus.UNPAID;
    if (remainingDebt === 0) paymentStatus = PaymentStatus.PAID;
    else if (paidAmount > 0) paymentStatus = PaymentStatus.PARTIALLY_PAID;



    const invoice = this.invoiceRepository.create({
      invoiceNumber,
      invoiceDate,
      clientId: client,
      invoiceItemsId: invoiceItems,
      discount,
      discountType,
      paidAmount,
      totalAmount,
      finalAmount,
      remainingDebt,
      paymentStatus,
    });

    await this.telegramService.sendInvoiceNotification({
      invoiceNumber,
      from: 'MUTex',
      to: client.companyName || client.firstName,
      amount: totalAmount,
      currentBalance: finalAmount,
      totalBalance: finalAmount,
      debt: remainingDebt,
      phone: client.phoneNumber || '+998 90 000 00 00',
    });
    return await this.invoiceRepository.save(invoice);
  }


  async findAll() {
    return await this.invoiceRepository.createQueryBuilder('invoice')
      .leftJoinAndSelect('invoice.clientId', 'client')  // Client modelini qo'shish
      .leftJoinAndSelect('invoice.invoiceItemsId', 'invoiceItem')  // InvoiceItem modelini qo'shish
      .select([
        'invoice.id', 'invoice.invoiceNumber', 'invoice.invoiceDate', 'invoice.totalAmount',
        'invoice.discount', 'invoice.discountType', 'invoice.finalAmount', 'invoice.paidAmount',
        'invoice.remainingDebt', 'invoice.status', 'invoice.paymentStatus',

        // Client modelidan kerakli maydonlar
        'client.firstName', 'client.phoneNumber', 'client.address', 'client.email',

        // InvoiceItem modelidan kerakli maydonlar
        'invoiceItem.quantity', 'invoiceItem.unitPrice', 'invoiceItem.totalPrice',
      ])
      .getMany();
  }

  async findOne(id: number) {
    const invoice =  await this.invoiceRepository.createQueryBuilder('invoice')
      .leftJoinAndSelect('invoice.clientId', 'client')  // Client modelini qo'shish
      .leftJoinAndSelect('invoice.invoiceItemsId', 'invoiceItem')  // InvoiceItem modelini qo'shish
      .select([
        'invoice.id', 'invoice.invoiceNumber', 'invoice.invoiceDate', 'invoice.totalAmount',
        'invoice.discount', 'invoice.discountType', 'invoice.finalAmount', 'invoice.paidAmount',
        'invoice.remainingDebt', 'invoice.status', 'invoice.paymentStatus',

        // Client modelidan kerakli maydonlar
        'client.firstName', 'client.phoneNumber', 'client.address', 'client.email',

        // InvoiceItem modelidan kerakli maydonlar
        'invoiceItem.quantity', 'invoiceItem.unitPrice', 'invoiceItem.totalPrice',
      ])
      .where('invoice.id = :id', { id })  // ID orqali so'rovni cheklash
      .getOne();
      if (!invoice) {
        throw new NotFoundException('Invoice topilmadi');  // 404 javobini qaytarish
      }
      return invoice
  }

  async update(id: number, updateInvoiceDto: UpdateInvoiceDto): Promise<Invoice> {
    const invoice = await this.invoiceRepository.findOne({
      where: { id },
      relations: ['invoiceItemsId', 'clientId']
    });

    if (!invoice) {
      throw new NotFoundException('Invoice not found');
    }

    // update qilinayotgan maydonlar
    const {
      invoiceDate,
      clientId,
      invoiceItemsId,
      discount,
      discountType,
      paidAmount
    } = updateInvoiceDto;

    if (invoiceDate) invoice.invoiceDate = invoiceDate;
    if (clientId) {
      const client = await this.clientRepository.findOneOrFail({ where: { id: clientId } });
      invoice.clientId = client;
    }

    if (invoiceItemsId) {
      const invoiceItems = await Promise.all(
        invoiceItemsId.map(id => this.invoiceItemRepository.findOneOrFail({ where: { id } }))
      );
      invoice.invoiceItemsId = invoiceItems;

      const totalAmount = invoiceItems.reduce((sum, item) => sum + item.totalPrice, 0);
      invoice.totalAmount = totalAmount;

      let finalAmount = totalAmount;
      if (discountType === 'percent') {
        finalAmount -= (totalAmount * (discount ?? invoice.discount)) / 100;
      } else {
        finalAmount -= discount ?? invoice.discount;
      }

      invoice.finalAmount = finalAmount;
      invoice.remainingDebt = finalAmount - (paidAmount ?? invoice.paidAmount);

      if (invoice.remainingDebt === 0) {
        invoice.paymentStatus = PaymentStatus.PAID;
      } else if ((paidAmount ?? invoice.paidAmount) > 0) {
        invoice.paymentStatus = PaymentStatus.PARTIALLY_PAID;
      } else {
        invoice.paymentStatus = PaymentStatus.UNPAID;
      }
    }

    if (discount !== undefined) invoice.discount = discount;
    if (discountType !== undefined) invoice.discountType = discountType;
    if (paidAmount !== undefined) invoice.paidAmount = paidAmount;

    return await this.invoiceRepository.save(invoice);
  }
  async remove(id: number):Promise<object> {
    const invoice = await this.invoiceRepository.findOne({where:{id}})
    if (!invoice) {
      throw new NotFoundException('Invoice not found');
    }
    await this.invoiceRepository.remove(invoice)
    return {message: true};
  }
}
