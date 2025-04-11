import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { UserRoles } from 'src/utils/user-role.enum';

export class CreateUserDto {
  @ApiProperty({
    description: 'The email address of the user',
    example: 'user@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'The username of the user',
    example: 'john_doe',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'The password for the user account',
    example: 'password123',
  })
  @MinLength(6)
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'The role of the user',
    enum: UserRoles,
    example: UserRoles.ADMIN,
  })
  @IsEnum(UserRoles)
  @IsNotEmpty()
  role: UserRoles;
}
