import {
  Controller,
  Get,
  HttpCode,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CurrentUser } from "src/auth/decorators/user.decorator";
import { User } from "@prisma/client";
import { Auth } from "src/auth/decorators/auth.decorator";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Auth()
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get()
  public async getCurrentUser(
    @CurrentUser("id") userId: string
  ): Promise<Omit<User, "password">> {
    const { password, ...currentUser } = await this.userService.currentUser({
      userId,
    });

    return currentUser;
  }
}
