import { Module } from "@nestjs/common";
import { UniversityService } from "./university.service";
import { UniversityController } from "./university.controller";
import { PrismaService } from "src/prisma.service";
import { ConfigModule } from "@nestjs/config";

@Module({
  controllers: [UniversityController],
  providers: [UniversityService, PrismaService],
  imports: [ConfigModule],
})
export class UniversityModule {}
