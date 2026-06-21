import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Param,
  Patch,
} from "@nestjs/common";
import { InviteService } from "./invite.service";
import { CreateInviteDto } from "./dto/create-invite.dto";
import { Auth } from "src/auth/decorators/auth.decorator";
import { Roles } from "src/user/decorators/role.decorator";
import { CurrentUser } from "src/auth/decorators/user.decorator";

@Controller("invite")
export class InviteController {
  constructor(private readonly inviteService: InviteService) {}

  @Auth()
  @Roles("ELDER", "STUDENT")
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post()
  async createInvite(
    @Body() createInviteDto: CreateInviteDto,
    @CurrentUser("id") userId: string
  ) {
    const { token } = await this.inviteService.createInvite(
      createInviteDto,
      userId
    );
    return { token };
  }

  @Auth()
  @UsePipes(new ValidationPipe({ transform: true }))
  @Patch(":token")
  async acceptInvite(
    @Param("token") token: string,
    @CurrentUser("id") userId: string
  ) {
    await this.inviteService.acceptInvite(token, userId);
    return { message: "Invite accepted successfully" };
  }
}
