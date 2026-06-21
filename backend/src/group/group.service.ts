import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from "@nestjs/common";
import { CreateGroupDto } from "./dto/create-group.dto";
import { Group } from "@prisma/client";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class GroupService {
  constructor(private readonly prisma: PrismaService) {}

  async createGroup(dto: CreateGroupDto): Promise<Group> {
    const university = await this.prisma.university.findUnique({
      where: { id: dto.universityId },
    });
    if (!university) {
      throw new HttpException("University not found", HttpStatus.NOT_FOUND);
    }

    if (dto.elderId) {
      const elder = await this.prisma.user.findUnique({
        where: { id: dto.elderId },
      });
      if (!elder) {
        throw new HttpException("Elder user not found", HttpStatus.NOT_FOUND);
      }

      if (elder.groupId) {
        throw new HttpException(
          "Elder user is already in a group",
          HttpStatus.BAD_REQUEST
        );
      }
    }

    try {
      const group = await this.prisma.group.create({
        data: {
          name: dto.name,
          universityId: dto.universityId,
          elderId: dto.elderId,
        },
        include: {
          university: true,
          elder: true,
        },
      });

      await this.prisma.user.update({
        where: { id: dto.elderId },
        data: { groupId: group.id },
      });
      return group;
    } catch (error) {
      throw new HttpException(
        "Failed to create group",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getGroup({ userId }: { userId: string }): Promise<Group> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new NotFoundException("User not found");
      }

      if (!user.groupId) {
        throw new NotFoundException("User is not in any group");
      }

      const group = await this.prisma.group.findUnique({
        where: { id: user.groupId },
        include: {
          users: true,
          university: true,
          elder: true,
        },
      });

      if (!group) {
        throw new NotFoundException("Group not found");
      }
      return group;
    } catch (error) {
      throw new HttpException(
        "Failed to get group",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async deleteCustomerInGroup({
    userId,
    groupId,
  }: {
    userId: string;
    groupId: string;
  }) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    if (user.groupId !== groupId) {
      throw new HttpException(
        "User is not in the specified group",
        HttpStatus.BAD_REQUEST
      );
    }

    await this.prisma.user.update({
      where: { id: userId },
      data: { groupId: null },
    });

    return { message: "User removed from group successfully" };
  }
}
