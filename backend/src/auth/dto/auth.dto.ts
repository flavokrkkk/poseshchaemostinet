import { CustomerGender, Role } from "@prisma/client";
import { IsEmail, IsEnum, IsString, MinLength } from "class-validator";

export class RegisterDto {
  @IsString()
  @IsEmail()
  email: string;

  @MinLength(6, {
    message: "Пароль не должен быть меньше 6 символов.",
  })
  @IsString()
  password: string;

  @IsString()
  fullName: string;

  @IsString()
  @IsEnum(Role)
  role: Role;

  @IsString()
  @IsEnum(CustomerGender)
  gender: CustomerGender;
}

export class LoginDto {
  @IsString()
  @IsEmail()
  email: string;

  @MinLength(6, {
    message: "Пароль не должен быть меньше 6 символов.",
  })
  @IsString()
  password: string;
}
