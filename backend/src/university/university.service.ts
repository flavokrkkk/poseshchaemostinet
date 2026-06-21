import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios, { AxiosResponse } from "axios";
import { PrismaService } from "src/prisma.service";
import { CreateUniversityDto } from "./dto/create-university.dto";

interface UniversitySuggestion {
  value: string;
  unrestricted_value: string;
  data: {
    address: string;
    inn: string;
    orgn: string;
    okpo: string;
  };
}

interface ApiResponse {
  suggestions: UniversitySuggestion[];
}

@Injectable()
export class UniversityService {
  private readonly apiUrl: string;
  private readonly apiKey: string;

  constructor(
    private readonly configService: ConfigService,
    private prismaService: PrismaService
  ) {
    this.apiUrl = this.configService.getOrThrow<string>("UNIVERSITY_API_URL");
    this.apiKey = this.configService.getOrThrow<string>("UNIVERSITY_API_KEY");
  }

  async getUniversitySuggestions(
    query: string,
    count: number = 2000
  ): Promise<UniversitySuggestion[]> {
    try {
      const response: AxiosResponse<ApiResponse> = await axios.post(
        this.apiUrl,
        { query, count },
        {
          headers: {
            Authorization: this.apiKey,
          },
        }
      );

      return response.data.suggestions;
    } catch (error) {
      throw new HttpException(
        "Failed to fetch university suggestions",
        HttpStatus.BAD_GATEWAY
      );
    }
  }

  async createOrGetUniversity(dto: CreateUniversityDto): Promise<string> {
    const existingUniversity = await this.prismaService.university.findUnique({
      where: { inn: dto.data.inn },
    });

    if (existingUniversity) {
      return existingUniversity.id;
    }

    try {
      const university = await this.prismaService.university.create({
        data: {
          name: dto.value,
          inn: dto.data.inn,
          image: null,
        },
      });
      return university.id;
    } catch (error) {
      throw new HttpException(
        "Failed to create university",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async groupsCountByUniversityId({
    universityId,
  }: {
    universityId: string;
  }): Promise<{ groupCount: number }> {
    const university = await this.prismaService.university.findFirst({
      where: { id: universityId },
      include: { groups: true },
    });

    if (!university) {
      throw new NotFoundException("Universiyty not fount");
    }

    return { groupCount: university.groups.length };
  }
}
