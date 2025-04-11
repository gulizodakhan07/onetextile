import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSenttodyehouseDto } from './dto/create-senttodyehouse.dto';
import { UpdateSenttodyehouseDto } from './dto/update-senttodyehouse.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Senttodyehouse } from './entities/senttodyehouse.entity';
import { Repository } from 'typeorm';
import { RawMaterial } from '../raw-material/entities/raw-material.entity';
import { DyHouse } from '../dy-house/entities/dy-house.entity';

@Injectable()
export class SenttodyehouseService {
  constructor(
    @InjectRepository(Senttodyehouse) private sentToDyeHouseRepository: Repository<Senttodyehouse>,
    @InjectRepository(RawMaterial) private readonly rawMaterialRepo: Repository<RawMaterial>,
    @InjectRepository(DyHouse) private readonly dyeHouseRepo: Repository<DyHouse>

  ){}
  async create(createSenttodyehouseDto: CreateSenttodyehouseDto): Promise<Senttodyehouse> {
    // RawMaterialni topamiz
    const rawMaterial = await this.rawMaterialRepo.findOne({ where: { id: createSenttodyehouseDto.rawMaterialsId } });
    if (!rawMaterial) {
      throw new NotFoundException(`RawMaterial ID with ${createSenttodyehouseDto.rawMaterialsId} not found!`);
    }
    const dyeHouse = await this.dyeHouseRepo.findOne({where:{id: createSenttodyehouseDto.dyeHouseId}})
    if(!dyeHouse){
      throw new NotFoundException(`DyeHouse ID with ${createSenttodyehouseDto.rawMaterialsId} not found!`);
    }
  
    const createdSenttodyehouse = this.sentToDyeHouseRepository.create({
      ...createSenttodyehouseDto,
      rawMaterials: rawMaterial,
      dyeHouse:dyeHouse 
    });
  
    return await this.sentToDyeHouseRepository.save(createdSenttodyehouse);
  }
  
  
  async findAll(): Promise<Senttodyehouse[]> {
    return await this.sentToDyeHouseRepository.find();
  }
  
  async findOne(id: number): Promise<Senttodyehouse> {
    const findOne = await this.sentToDyeHouseRepository.findOne({ where: { id }, relations: ['rawMaterials'] });
    if (!findOne) {
      throw new NotFoundException(`SentToDyeHouse ID with ${id} not found`);
    }
    return findOne;
  }
  
  async update(id: number, updateSenttodyehouseDto: UpdateSenttodyehouseDto): Promise<Senttodyehouse> {
    const checkId = await this.sentToDyeHouseRepository.findOne({ where: { id } });
    if (!checkId) {
      throw new NotFoundException(`SentToDyeHouse ID with ${id} not found`);
    }
    const updated = Object.assign(checkId, updateSenttodyehouseDto);
    return this.sentToDyeHouseRepository.save(updated);
  }
  
  async remove(id: number): Promise<object> {
    const checkId = await this.sentToDyeHouseRepository.findOne({ where: { id } });
    if (!checkId) {
      throw new NotFoundException(`SentToDyeHouse ID with ${id} not found`);
    }
    await this.sentToDyeHouseRepository.remove(checkId);
    return { message: 'success' };
  }
  
}
