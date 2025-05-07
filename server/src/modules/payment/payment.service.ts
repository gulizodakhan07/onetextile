import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentService {
  constructor(@InjectRepository(Payment) private paymentrepository: Repository<Payment>){}
  async create(createPaymentDto: CreatePaymentDto):Promise<CreatePaymentDto> {
    const created = this.paymentrepository.create(createPaymentDto)
    return await this.paymentrepository.save(created)
  }

  async findAll(): Promise<CreatePaymentDto[]> {
    return await this.paymentrepository.find();
  }

  async findOne(id: number): Promise<CreatePaymentDto> {
    const findOne = await this.paymentrepository.findOne({where:{id}})
    if(!findOne){
      throw new NotFoundException(`Payment ID with ${id} not found`)
    }
    return findOne
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto): Promise<UpdatePaymentDto> {
    const findOne = await this.paymentrepository.findOne({where:{id}})
    if(!findOne){
      throw new NotFoundException(`Payment ID with ${id} not found`)
    }
    const updated = Object.assign(findOne,updatePaymentDto)
    return await this.paymentrepository.save(updated);
  }

  async remove(id: number): Promise<object> {
    const findOne = await this.paymentrepository.findOne({where:{id}})
    if(!findOne){
      throw new NotFoundException(`Payment ID with ${id} not found`)
    }
    await this.paymentrepository.remove(findOne)

    return {message: 'success'};
  }
}
