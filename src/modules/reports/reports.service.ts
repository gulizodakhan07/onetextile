import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice } from 'src/modules/invoice/entities/invoice.entity';
import { InvoiceItem } from 'src/modules/invoice-item/entities/invoice-item.entity';
import { Client } from 'src/modules/client/entities/client.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    @InjectRepository(InvoiceItem)
    private readonly invoiceItemRepository: Repository<InvoiceItem>,
  ) {}

  async getReports(startDate?: string, endDate?: string, clientId?: number) {
    const salesQuery = this.invoiceRepository.createQueryBuilder('invoice');

    if (startDate && endDate) {
      salesQuery.andWhere('invoice.invoiceDate BETWEEN :startDate AND :endDate', { startDate, endDate });
    }

    if (clientId) {
      salesQuery.andWhere('invoice.clientId = :clientId', { clientId });
    }

    const salesReport = await salesQuery.getMany();

    const debtQuery = this.invoiceRepository
      .createQueryBuilder('invoice')
      .where('invoice.remainingDebt > 0');

    if (startDate && endDate) {
      debtQuery.andWhere('invoice.invoiceDate BETWEEN :startDate AND :endDate', { startDate, endDate });
    }

    if (clientId) {
      debtQuery.andWhere('invoice.clientId = :clientId', { clientId });
    }

    const debtReport = await debtQuery.getMany();

    const eligibilityQuery = this.invoiceItemRepository
      .createQueryBuilder('item')
      .leftJoinAndSelect('item.invoice', 'invoice');

    if (startDate && endDate) {
      eligibilityQuery.andWhere('invoice.invoiceDate BETWEEN :startDate AND :endDate', { startDate, endDate });
    }

    if (clientId) {
      eligibilityQuery.andWhere('invoice.clientId = :clientId', { clientId });
    }

    const eligibilityReport = await eligibilityQuery.getMany();

    const stockQuery = this.invoiceItemRepository
      .createQueryBuilder('item')
      .leftJoin('item.dyedYarn', 'dyedYarn') 
      .select('dyedYarn.color', 'color') 
      .addSelect('SUM(item.quantity)', 'totalQuantity')
      .groupBy('dyedYarn.color'); 

    const stockReport = await stockQuery.getRawMany();

    // Bo‘yoqxona hisoboti
    const dyedYarnQuery = this.invoiceItemRepository
      .createQueryBuilder('item')
      .leftJoinAndSelect('item.dyedYarn', 'dyedYarn') 
      .leftJoinAndSelect('item.invoice', 'invoice');

    if (startDate && endDate) {
      dyedYarnQuery.andWhere('invoice.invoiceDate BETWEEN :startDate AND :endDate', { startDate, endDate });
    }

    if (clientId) {
      dyedYarnQuery.andWhere('invoice.clientId = :clientId', { clientId });
    }

    const dyedYarnReport = await dyedYarnQuery.getMany();

    return {
      salesReport,
      debtReport,
      eligibilityReport,
      stockReport,
      dyedYarnReport,
    };
  }
}
