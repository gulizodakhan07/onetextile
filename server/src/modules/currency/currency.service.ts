// src/modules/currency/currency.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Currency, CurrencyType } from './entities/currency.entity';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { ExchangeRate } from '../exchange-rate/entities/exchange-rate.entity';

@Injectable()
export class CurrencyService {
  constructor(
    @InjectRepository(Currency)
    private readonly currencyRepo: Repository<Currency>,

    @InjectRepository(ExchangeRate)
    private readonly historyRepo: Repository<ExchangeRate>,
  ) {}

  async create(createDto: CreateCurrencyDto) {
    const currency = this.currencyRepo.create({
      ...createDto,
      updatedAt: new Date(),
    });

    const saved = await this.currencyRepo.save(currency);

    const history = this.historyRepo.create({
      currency: saved,
      rate: createDto.currentRate,
    });

    await this.historyRepo.save(history);
    return saved;
  }

  async findAll() {
    return this.currencyRepo.find();
  }

  async update(id: number,updateDto: CreateCurrencyDto) {
    const currency = await this.currencyRepo.findOne({where:{ id}});
  
    if (!currency) throw new NotFoundException('Currency not found');
  
    currency.currentRate = updateDto.currentRate;
    currency.updatedAt = new Date();
  
    const updated = await this.currencyRepo.save(currency);
  
    const history = this.historyRepo.create({
      currency: updated,
      rate: updateDto.currentRate,
    });
  
    await this.historyRepo.save(history);
    return updated;
  }
  async findHistory(code: string) {
    return this.historyRepo.find({
      where: { currency: { code: code as any } },
      relations: ['currency'],
      order: { createdAt: 'DESC' },
    });
  }
}
