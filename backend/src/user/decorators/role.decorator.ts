import { SetMetadata } from "@nestjs/common";
import { Role } from "@prisma/client";

export const Roles = (...roles: string[]) => SetMetadata(Role, roles);
