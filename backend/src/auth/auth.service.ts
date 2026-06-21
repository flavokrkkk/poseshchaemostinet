import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { LoginDto, RegisterDto } from "./dto/auth.dto";
import { faker } from "@faker-js/faker";
import { hash, verify } from "argon2";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  public async login(dto: LoginDto) {
    const user = await this.validateUser(dto);

    const tokens = await this.issueTokens(user.id);

    return {
      user: this.returnsUserFields(user),
      ...tokens,
    };
  }

  public async refreshToken(refreshToken: string) {
    const verifyToken = await this.jwtService.verifyAsync(refreshToken);

    if (!verifyToken)
      throw new UnauthorizedException("Невалидный токен авторизации.");

    const user = await this.prismaService.user.findUnique({
      where: {
        id: verifyToken.id,
      },
    });

    if (!user) throw new UnauthorizedException("Пользователь не найден.");

    const tokens = await this.issueTokens(user.id);

    return tokens;
  }

  public async register(dto: RegisterDto) {
    const oldUser = await this.prismaService.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (oldUser) {
      throw new BadRequestException("Пользователь уже существует.");
    }
    const user = await this.prismaService.user.create({
      data: {
        email: dto.email,
        password: await hash(dto.password),
        fullName: dto.fullName,
        role: dto.role,
        avatarUrl: faker.image.avatarGitHub(),
        gender: dto.gender,
      },
    });

    const tokens = await this.issueTokens(user.id);

    return {
      user: this.returnsUserFields(user),
      ...tokens,
    };
  }

  private async issueTokens(userId: string) {
    const data = { id: userId };

    const accessToken = this.jwtService.sign(data, {
      expiresIn: this.configService.getOrThrow("JWT_ACCESS_TOKEN_TIME"),
    });
    const refreshToken = this.jwtService.sign(data, {
      expiresIn: this.configService.getOrThrow("JWT_REFRESH_TOKEN_TIME"),
    });

    return { accessToken, refreshToken };
  }

  private returnsUserFields(user: User) {
    return {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      avatarUrl: user.avatarUrl,
    };
  }

  private async validateUser(dto: LoginDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) throw new NotFoundException("Пользователь не найден.");

    const isValid = await verify(user.password, dto.password);

    if (!isValid) throw new UnauthorizedException("Неверный пароль.");

    return user;
  }
}
