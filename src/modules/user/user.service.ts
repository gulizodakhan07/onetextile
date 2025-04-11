import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../auth/dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>){}


  async findAll(): Promise<CreateUserDto[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<CreateUserDto> {
    const findUser = await this.userRepository.findOne({where:{id}})
    if(!findUser){
      throw new NotFoundException(`User ID with ${id} not found`)
    }

    return findUser;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UpdateUserDto> {
    const findUser = await this.userRepository.findOne({where:{id}})
    if(!findUser){
      throw new NotFoundException(`User ID with ${id} not found`)
    }
    const updatedUser = Object.assign(findUser,updateUserDto)
    return await this.userRepository.save(updatedUser);
  }

  async remove(id: number): Promise<object> {
    const findUser = await this.userRepository.findOne({where:{id}})
    if(!findUser){
      throw new NotFoundException(`User ID with ${id} not found`)
    }
    await this.userRepository.remove(findUser)
    return {message: 'success'};
  }
}
