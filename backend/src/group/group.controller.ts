import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Get,
  UseGuards,
  Delete,
} from "@nestjs/common";
import { GroupService } from "./group.service";
import { CreateGroupDto } from "./dto/create-group.dto";
import { Group } from "@prisma/client";
import { RolesGuard } from "src/user/guards/roles.guard";
import { Roles } from "src/user/decorators/role.decorator";
import { CurrentUser } from "src/auth/decorators/user.decorator";
import { Auth } from "src/auth/decorators/auth.decorator";

@Controller("group")
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles("ELDER")
  @Auth()
  @UsePipes(new ValidationPipe({ transform: true }))
  async createGroup(@Body() createGroupDto: CreateGroupDto): Promise<Group> {
    return await this.groupService.createGroup(createGroupDto);
  }

  @Get()
  @UseGuards(RolesGuard)
  @Auth()
  @Roles("ELDER")
  async getGroup(@CurrentUser("id") userId: string): Promise<Group> {
    if (!userId) throw new Error("User id required");
    return await this.groupService.getGroup({ userId });
  }

  @Delete()
  @UseGuards(RolesGuard)
  @Auth()
  @Roles("ELDER")
  async deleteCustomerInGroup(
    @Body() deleteDto: { userId: string; groupId: string }
  ): Promise<{ message: string }> {
    if (!deleteDto.userId) throw new Error("User id required");
    if (!deleteDto.groupId) throw new Error("Group id required");
    return await this.groupService.deleteCustomerInGroup(deleteDto);
  }
}
