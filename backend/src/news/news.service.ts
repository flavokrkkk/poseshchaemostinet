import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { News } from "@prisma/client";
import { CreateNewsDto } from "./dto/create-news.dto";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class NewsService {
  constructor(private prisma: PrismaService) {}

  public async createNews(dto: CreateNewsDto, userId: string): Promise<News> {
    const university = await this.prisma.university.findUnique({
      where: { id: dto.universityId },
    });
    if (!university) {
      throw new NotFoundException("University not found");
    }

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user || user.role !== "ADMIN") {
      throw new HttpException(
        "Only ADMIN can create events",
        HttpStatus.FORBIDDEN
      );
    }

    return this.prisma.news.create({
      data: {
        title: dto.title,
        content: dto.content,
        date: new Date().toISOString(),
        universityId: dto.universityId,
      },
    });
  }

  public async getAllNews(universityId: string): Promise<News[]> {
    return this.prisma.news.findMany({
      where: {
        universityId,
      },
    });
  }
}
