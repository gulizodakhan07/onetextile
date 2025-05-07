import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientService {
  constructor(@InjectRepository(Client) private clientRepository: Repository<Client>){}
  async create(createClientDto: CreateClientDto):Promise<CreateClientDto> {
    const created = this.clientRepository.create(createClientDto)
    return await this.clientRepository.save(created);
  }

  async findAll(): Promise<CreateClientDto[]> {
    return await this.clientRepository.find();
  }

  async findOne(id: number): Promise<CreateClientDto> {
    const findOne = await this.clientRepository.findOne({where: {id}})
    if(!findOne){
      throw new NotFoundException(`Client ID with ${id} not found`)
    }
    return findOne;
  }

  async update(id: number, updateClientDto: UpdateClientDto): Promise<CreateClientDto> {
    const findOne = await this.clientRepository.findOne({where: {id}})
    if(!findOne){
      throw new NotFoundException(`Client ID with ${id} not found`)
    }
    const updated = Object.assign(findOne,updateClientDto)
    return await this.clientRepository.save(updated);
  }

  async remove(id: number): Promise<object> {
    const findOne = await this.clientRepository.findOne({where: {id}})
    if(!findOne){
      throw new NotFoundException(`Client ID with ${id} not found`)
    }
    await this.clientRepository.remove(findOne)
    return {message: 'success'};
  }
}
