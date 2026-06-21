import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { NewsService } from "./news.service";
import { Auth } from "src/auth/decorators/auth.decorator";
import { Roles } from "src/user/decorators/role.decorator";
import { CreateNewsDto } from "./dto/create-news.dto";
import { CurrentUser } from "src/auth/decorators/user.decorator";
import { News } from "@prisma/client";

@Controller("news")
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
  @Auth()
  @Roles("ADMIN")
  @UsePipes(new ValidationPipe({ transform: true }))
  async createNews(
    @Body() dto: CreateNewsDto,
    @CurrentUser("id") userId: string
  ): Promise<News> {
    return this.newsService.createNews(dto, userId);
  }

  @Get(":universityId")
  @Auth()
  async getNews(@Param("universityId") universityId: string): Promise<News[]> {
    return this.newsService.getAllNews(universityId);
  }
}
