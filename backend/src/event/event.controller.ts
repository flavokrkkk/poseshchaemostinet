import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Query,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { EventService } from "./event.service";
import { CreateEventDto } from "./dto/create-event.dto";
import { Auth } from "../auth/decorators/auth.decorator";
import { Roles } from "../user/decorators/role.decorator";
import { CurrentUser } from "../auth/decorators/user.decorator";
import { Event } from "@prisma/client";

@Controller("event")
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @Auth()
  @Roles("ADMIN")
  @UsePipes(new ValidationPipe({ transform: true }))
  async createEvent(
    @Body() dto: CreateEventDto,
    @CurrentUser("id") userId: string
  ): Promise<Event> {
    return this.eventService.createEvent(dto, userId);
  }

  @Get(":universityId")
  @Auth()
  async getEvents(
    @Param("universityId") universityId: string,
    @Query("date") date: string
  ): Promise<Event[]> {
    return this.eventService.getEvents(universityId, date);
  }
}
