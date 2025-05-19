import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInvoiceItemDto } from './dto/create-invoice-item.dto';
import { UpdateInvoiceItemDto } from './dto/update-invoice-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { InvoiceItem } from './entities/invoice-item.entity';
import { DyedYarn } from '../dyed-yarn/entities/dyed-yarn.entity';
import { Repository } from 'typeorm';
import { Invoice } from '../invoice/entities/invoice.entity';

@Injectable()
export class InvoiceItemService {
  constructor(
    @InjectRepository(InvoiceItem)
    private readonly invoiceItemRepository: Repository<InvoiceItem>,

    @InjectRepository(DyedYarn)
    private readonly dyedYarnRepository: Repository<DyedYarn>,

    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>
  ) { }

  async create(createInvoiceItemDto: CreateInvoiceItemDto): Promise<InvoiceItem> {
    const { invoiceId, dyedYarnId, quantity, unitPrice } = createInvoiceItemDto;

    const dyedYarn = await this.dyedYarnRepository.findOne({ where: { id: dyedYarnId } });
    if (!dyedYarn) {
      throw new Error('Dyed Yarn not found');
    }

    const invoice = await this.invoiceRepository.findOne({ where: { id: invoiceId } });
    // if (!invoice) {
    //   throw new Error('Invoice not found');
    // }

    const totalPrice = quantity * unitPrice;

    const invoiceItem = this.invoiceItemRepository.create({
      dyedYarn: dyedYarn,
      invoice: invoice,
      quantity,
      unitPrice,
      totalPrice,
    });

    return await this.invoiceItemRepository.save(invoiceItem);
  }

  async findAll() {
    return await this.invoiceItemRepository.find({
      relations: ["dyedYarn", "invoice"]
    });
  }

  async findOne(id: number) {
    return await this.invoiceItemRepository.findOne({
      where: { id },
      relations: ["dyedYarn", "invoice"]
    });
  }

  async update(id: number, updateInvoiceItemDto: UpdateInvoiceItemDto) {
    const findOne  = await this.invoiceItemRepository.findOne({where:{id}});
    if(!findOne){
      throw new NotFoundException(`Invoice item ID with ${findOne} not found`)
    }
    const updatedItem = Object.assign(findOne,updateInvoiceItemDto)
    return await this.invoiceItemRepository.save(updatedItem)
  }

  remove(id: number) {
    return `This action removes a #${id} invoiceItem`;
  }
}
