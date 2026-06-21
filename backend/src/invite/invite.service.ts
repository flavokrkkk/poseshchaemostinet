import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateInviteDto } from "./dto/create-invite.dto";

@Injectable()
export class InviteService {
  constructor(private readonly prisma: PrismaService) {}

  async createInvite(
    createInviteDto: CreateInviteDto,
    userId: string
  ): Promise<{ token: string }> {
    const { groupId } = createInviteDto;

    const group = await this.prisma.group.findUnique({
      where: { id: groupId },
      include: { elder: true },
    });
    if (!group) {
      throw new NotFoundException("Group not found");
    }

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user || (user.id !== group.elderId && user.role !== "ELDER")) {
      throw new HttpException(
        "Only ELDER can create invites",
        HttpStatus.FORBIDDEN
      );
    }

    const token = crypto.randomUUID();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);

    await this.prisma.invite.create({
      data: {
        groupId,
        token,
        expiresAt,
      },
    });

    return { token };
  }

  async acceptInvite(token: string, userId: string): Promise<void> {
    const invite = await this.prisma.invite.findUnique({
      where: { token },
      include: { group: true },
    });

    if (!invite) {
      throw new NotFoundException("Invalid invite token");
    }

    if (new Date() > invite.expiresAt) {
      throw new HttpException("Invite has expired", HttpStatus.BAD_REQUEST);
    }

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    if (user.groupId) {
      throw new HttpException(
        "User is already in a group",
        HttpStatus.BAD_REQUEST
      );
    }

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        groupId: invite.groupId,
      },
    });

    await this.prisma.invite.delete({
      where: { id: invite.id },
    });
  }
}
