import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDyedYarnDto } from './dto/create-dyed-yarn.dto';
import { UpdateDyedYarnDto } from './dto/update-dyed-yarn.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DyedYarn } from './entities/dyed-yarn.entity';
import { Repository } from 'typeorm';
import { RawMaterial } from '../raw-material/entities/raw-material.entity';
import { DyHouse } from '../dy-house/entities/dy-house.entity';

@Injectable()
export class DyedYarnService {
  constructor(
    @InjectRepository(DyedYarn) private dyedYarnRepository: Repository<DyedYarn>,
    @InjectRepository(DyedYarn) private rawMaterialsRepository: Repository<RawMaterial>,
    @InjectRepository(DyHouse) private dyeHouseRepository: Repository<DyHouse>


  ){}
  async create(createDyedYarnDto: CreateDyedYarnDto): Promise<DyedYarn  > {
    const rawMaterial = await this.rawMaterialsRepository.findOne({where:{id: createDyedYarnDto.rawMaterialsId}})
    if(!rawMaterial){
      throw new NotFoundException(`RawMaterial ID with ${createDyedYarnDto.rawMaterialsId} not found`)
    }
    const dyeHouse = await this.dyeHouseRepository.findOne({where:{id: createDyedYarnDto.dyeHouseId}})
    if(!dyeHouse){
      throw new NotFoundException(`DyeHouse ID with ${createDyedYarnDto.dyeHouseId} not found`)
    }
    const created = this.dyedYarnRepository.create({...createDyedYarnDto,rawMaterials: rawMaterial,dyeHouse: dyeHouse})
    return await this.dyedYarnRepository.save(created);
  }

  async findAll(): Promise<DyedYarn[]> {
    return await this.dyedYarnRepository.find();
  }

  async findOne(id: number): Promise<DyedYarn> {
    const finOne = await this.dyedYarnRepository.findOne({where: {id}})
    if(!finOne){
      throw new NotFoundException(`DyedYarn ID with ${id} not found`)
    }
    return finOne;
  }

  async update(id: number, updateDyedYarnDto: UpdateDyedYarnDto): Promise<CreateDyedYarnDto> {
    const finOne = await this.dyedYarnRepository.findOne({where: {id}})
    if(!finOne){
      throw new NotFoundException(`DyedYarn ID with ${id} not found`)
    }
    const updated = Object.assign(finOne,updateDyedYarnDto)
    return await this.dyedYarnRepository.save(updated);
  }

  async remove(id: number): Promise<object> {
    const finOne = await this.dyedYarnRepository.findOne({where: {id}})
    if(!finOne){
      throw new NotFoundException(`DyedYarn ID with ${id} not found`)
    }

    await this.dyedYarnRepository.remove(finOne)
    return {message: 'success'};
  }
}
