import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RawMaterial } from './entities/raw-material.entity';
import { CreateRawMaterialDto } from './dto/create-raw-material.dto';
import { UpdateRawMaterialDto } from './dto/update-raw-material.dto';

@Injectable()
export class RawMaterialService {
  constructor(
    @InjectRepository(RawMaterial)
    private rawMaterialRepository: Repository<RawMaterial>,
  ) { }

  async create(createRawMaterialDto: CreateRawMaterialDto): Promise<RawMaterial> {
    const rawMaterial = this.rawMaterialRepository.create(createRawMaterialDto);
    return await this.rawMaterialRepository.save(rawMaterial);
  }

  async findAll(): Promise<RawMaterial[]> {
    return await this.rawMaterialRepository.createQueryBuilder('RawMAterial')
      .leftJoinAndSelect('RawMAterial.sentToDyeHouse', 'SentToDyeHouse')
      .select([
        'RawMAterial.id','RawMAterial.name','RawMAterial.quantity','RawMAterial.arrivalDate',
        'RawMAterial.supplier','RawMAterial.batchNumber','RawMAterial.createdAt','RawMAterial.updatedAt',


        'SentToDyeHouse.id','SentToDyeHouse.quantity','SentToDyeHouse.sentDate','SentToDyeHouse.notes'
      ])
      .getMany()

  }

  // async findAll() {
  //   return await this.sentToDyeHouseRepository.createQueryBuilder('sentToDyeHouse')
  //     .leftJoinAndSelect('sentToDyeHouse.rawMaterials', 'RawMAterial') 
  //     .select([
  //       'sentToDyeHouse.id', 'sentToDyeHouse.quantity', 'sentToDyeHouse.sentDate', 'sentToDyeHouse.status',
  //       'sentToDyeHouse.notes', 

  //       'RawMAterial.name', 'RawMAterial.quantity', 'RawMAterial.supplier'
  //     ])
  //     .getMany()

  // }

  // async findOne(id: number): Promise<Senttodyehouse> {

  //   const findOne = await this.sentToDyeHouseRepository.createQueryBuilder('sentToDyeHouse')
  //   .leftJoinAndSelect('sentToDyeHouse.rawMaterials', 'RawMAterial') 
  //   .select([
  //     'sentToDyeHouse.id', 'sentToDyeHouse.quantity', 'sentToDyeHouse.sentDate', 'sentToDyeHouse.status',
  //     'sentToDyeHouse.notes', 

  //     'RawMAterial.name', 'RawMAterial.quantity', 'RawMAterial.supplier'
  //   ])

  //   .where('sentToDyeHouse.id = :id', { id }) 
  //     .getOne();
  //   if (!findOne) {
  //     throw new NotFoundException(`SentToDyeHouse ID with ${id} not found`);
  //   }
  //   return findOne;
  // }


  async findOne(id: number): Promise<RawMaterial> {
    const rawMaterial = await this.rawMaterialRepository.createQueryBuilder('RawMAterial')
    .leftJoinAndSelect('RawMAterial.sentToDyeHouse', 'SentToDyeHouse')
    .select([
      'RawMAterial.id','RawMAterial.name','RawMAterial.quantity','RawMAterial.arrivalDate',
      'RawMAterial.supplier','RawMAterial.batchNumber','RawMAterial.createdAt','RawMAterial.updatedAt',


      'SentToDyeHouse.id','SentToDyeHouse.quantity','SentToDyeHouse.sentDate','SentToDyeHouse.notes'
    ])
    .where('RawMAterial.id = :id', { id }) 
    .getOne()
    if (!rawMaterial) {
      throw new NotFoundException(`RawMaterial with ID ${id} not found`);
    }
    return rawMaterial;
  }

  async update(id: number, updateRawMaterialDto: UpdateRawMaterialDto): Promise<RawMaterial> {
    const rawMaterial = await this.rawMaterialRepository.findOne({ where: { id } });
    const updated = Object.assign(rawMaterial, updateRawMaterialDto);
    return await this.rawMaterialRepository.save(updated);
  }

  async remove(id: number): Promise<object> {
    const rawMaterial = await this.rawMaterialRepository.findOne({ where: { id } });
    if (!rawMaterial) {
      throw new NotFoundException(`RawMaterial with ID ${id} not found`);
    }
    await this.rawMaterialRepository.remove(rawMaterial);
    return { message: 'success' }
  }
}
