import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from "class-validator";
import { UserRoles } from "src/utils/user-role.enum";

export class UpdateUserDto{

    @ApiProperty({
        description: 'The email address of the user',
        example: 'user@example.com',
      })
      @IsEmail()
      @IsOptional()
      email: string;
    
      @ApiProperty({
        description: 'The username of the user',
        example: 'john_doe',
      })
      @IsString()
      @IsOptional()
      username: string;
    
      @ApiProperty({
        description: 'The password for the user account',
        example: 'password123',
      })
      @MinLength(6)
      @IsOptional()
      password: string;
    
      @ApiProperty({
        description: 'The role of the user',
        enum: UserRoles,
        example: UserRoles.ADMIN,
      })
      @IsEnum(UserRoles)
      @IsOptional()
      role: UserRoles;
}
