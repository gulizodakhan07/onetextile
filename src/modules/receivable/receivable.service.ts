import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Receivable } from './entities/receivable.entity';
import { CreateReceivableDto } from './dto/create-receivable.dto';
import { UpdateReceivableDto } from './dto/update-receivable.dto';

@Injectable()
export class ReceivableService {
  constructor(
    @InjectRepository(Receivable)
    private receivableRepo: Repository<Receivable>,
  ) {}

  async create(dto: CreateReceivableDto) {
    const newItem = this.receivableRepo.create(dto);
    return this.receivableRepo.save(newItem);
  }

  async findAll() {
    return this.receivableRepo.find();
  }

  async findOne(id: number) {
    const item = await this.receivableRepo.findOne({ where: { id } });
    if (!item) throw new NotFoundException('Receivable not found');
    return item;
  }

  async update(id: number, dto: UpdateReceivableDto) {
    const item = await this.findOne(id);
    Object.assign(item, dto);
    return this.receivableRepo.save(item);
  }

  async remove(id: number) {
    const item = await this.findOne(id);
    if(!item){
      throw new NotFoundException(`Receivable ID with ${item} not found`)
    }
    return this.receivableRepo.remove(item);
  }
}
