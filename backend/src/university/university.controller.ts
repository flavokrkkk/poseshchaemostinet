import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { UniversityService } from "./university.service";
import { UniversitySuggestion } from "./types/types";
import { SuggestionUniversityDto } from "./dto/suggestion-university.dto";
import { CreateUniversityDto } from "./dto/create-university.dto";
import { Auth } from "src/auth/decorators/auth.decorator";
import { RolesGuard } from "src/user/guards/roles.guard";
import { Roles } from "src/user/decorators/role.decorator";

@Controller("university")
export class UniversityController {
  constructor(private readonly universityService: UniversityService) {}

  @Post("suggestions")
  @Auth()
  async getUniversitySuggestions(
    @Body() { count, query }: SuggestionUniversityDto
  ): Promise<Array<UniversitySuggestion>> {
    if (!query) {
      throw new Error("Query parameter is required");
    }
    if (isNaN(count) || count <= 0) {
      throw new Error("Count must be a positive number");
    }
    return this.universityService.getUniversitySuggestions(query, count);
  }

  @Post()
  @Auth()
  @UsePipes(new ValidationPipe({ transform: true }))
  async createOrGetUniversity(
    @Body() dto: CreateUniversityDto
  ): Promise<{ universityId: string }> {
    const universityId =
      await this.universityService.createOrGetUniversity(dto);
    return { universityId };
  }

  @Get("group-count/:universityId")
  @UseGuards(RolesGuard)
  @Auth()
  @Roles("ELDER")
  async getGroup(
    @Param("universityId") universityId: string
  ): Promise<{ groupCount: number }> {
    if (!universityId) throw new Error("User id required");
    return await this.universityService.groupsCountByUniversityId({
      universityId,
    });
  }
}
