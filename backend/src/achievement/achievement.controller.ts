import { Body, Controller, Get, Post } from "@nestjs/common";
import { AchievementService } from "./achievement.service";
import { CreateAchievementTemplateDto } from "./dto/create-achievement.dto";
import { CurrentUser } from "src/auth/decorators/user.decorator";
import { Auth } from "src/auth/decorators/auth.decorator";

@Controller("achievement")
export class AchievementController {
  constructor(private readonly achievementService: AchievementService) {}

  @Post("templates")
  createTemplate(
    @Body() createAchievementTemplateDto: CreateAchievementTemplateDto
  ) {
    return this.achievementService.create(createAchievementTemplateDto);
  }

  @Get("templates")
  findAllTemplates() {
    return this.achievementService.findAllTemplates();
  }

  @Get("user-achievements")
  @Auth()
  async getUserAchievements(@CurrentUser("id") userId: string) {
    return this.achievementService.getUserAchievements(userId);
  }
}
