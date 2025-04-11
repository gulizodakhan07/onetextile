import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDyHouseDto } from './dto/create-dy-house.dto';
import { UpdateDyHouseDto } from './dto/update-dy-house.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DyHouse } from './entities/dy-house.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DyHouseService {
  constructor(@InjectRepository(DyHouse) private dyeHouseRepository: Repository<DyHouse>){}
  async create(createDyHouseDto: CreateDyHouseDto) {
    const dyeHouse = this.dyeHouseRepository.create(createDyHouseDto)
    return await this.dyeHouseRepository.save(dyeHouse)
  }

  async findAll(): Promise<DyHouse[]> {
    return await this.dyeHouseRepository.find()
  }

  async findOne(id: number) {
    const dyeHouse = await this.dyeHouseRepository.createQueryBuilder('DyeHouse')
    .leftJoinAndSelect('DyeHouse.sentToDyeHouse', 'SentToDyeHouse')
    .leftJoinAndSelect('DyeHouse.dyedYarn', 'dyedYarn')
    .select([
      'DyeHouse.id','DyeHouse.name','DyeHouse.contactPerson','DyeHouse.phoneNumber',
      'DyeHouse.adress','DyeHouse.createdAt','DyeHouse.updatedAt',


      'SentToDyeHouse.id','SentToDyeHouse.quantity','SentToDyeHouse.notes',

      'dyedYarn.id','dyedYarn.yarnNumber','dyedYarn.packageQuantity'
    ])
    .where('DyeHouse.id = :id', { id }) 
    .getOne()
    if(!dyeHouse){
      throw new NotFoundException(`DyeHouse with ID  ${id} not found`)

    }
    return dyeHouse
  }

  async update(id: number, updateDyHouseDto: UpdateDyHouseDto) {
    const dyeHouse = await this.dyeHouseRepository.findOne({where:{id}})

    if(!dyeHouse){
      throw new NotFoundException(`DyeHouse with ID  ${id} not found`)
    }

    const updated = Object.assign(dyeHouse,updateDyHouseDto)
    return await this.dyeHouseRepository.save(updated)
  }

  async remove(id: number) {
    const deleted = await this.dyeHouseRepository.findOne({where:{id}})
    if(!deleted){
      throw new NotFoundException(`DyeHouse with ID  ${id} not found`)
    }
    await this.dyeHouseRepository.remove(deleted)

    return {message: 'success'}
  }
}
