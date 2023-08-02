import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  IsOptional,
  IsEnum,
  IsArray,
} from 'class-validator'

export class CreateUsersDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  nombre: string

  @IsOptional()
  @IsString()
  @MaxLength(255)
  segundoNombre: string

  @IsEmail()
  email: string

  @IsString()
  @MinLength(8)
  @MaxLength(128)
  password: string
}
