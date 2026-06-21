import { ErrorMessages } from "@/shared/api/queryError";
import { CreateTemplateLessonTypeSchema } from "../lib/schemes/createTemplateLessonSchema";
import { authApi } from "@/shared";
import { ETemplateLessonEndpoints } from "../lib/endpoints";
import { CalendarCell, TemplateLesson } from "../types/types";
import { DeleteRegularSlotsDto } from "@/entities/schedule/types/types";

class TemplateLessonService {
  public async createTemplateLesson(
    templateLessonDto: CreateTemplateLessonTypeSchema
  ) {
    try {
      return await authApi
        .post(ETemplateLessonEndpoints.CREATE_TEMPLATE_LESSON, {
          json: templateLessonDto,
        })
        .json<TemplateLesson>();
    } catch (e) {
      throw new Error(ErrorMessages.REQUEST_PREPARATION_ERROR);
    }
  }

  public async getTemplateLessons({ groupId }: { groupId: string }) {
    try {
      return await authApi
        .get(
          `${ETemplateLessonEndpoints.CREATE_TEMPLATE_LESSON}/group/${groupId}`
        )
        .json<TemplateLesson[]>();
    } catch (e) {
      throw new Error(ErrorMessages.REQUEST_PREPARATION_ERROR);
    }
  }

  public async deleteTemplateLesson({ lessonId }: { lessonId: string }) {
    try {
      return await authApi
        .delete(
          `${ETemplateLessonEndpoints.CREATE_TEMPLATE_LESSON}/${lessonId}`
        )
        .json<TemplateLesson>();
    } catch (e) {
      throw new Error(ErrorMessages.REQUEST_PREPARATION_ERROR);
    }
  }

  public async generateTemplateSlots({ lessonId }: { lessonId: string }) {
    try {
      return await authApi
        .get(`${ETemplateLessonEndpoints.GET_TEMPLATE_CELL}/${lessonId}`)
        .json<CalendarCell[][]>();
    } catch (e) {
      throw new Error(ErrorMessages.REQUEST_PREPARATION_ERROR);
    }
  }

  public async deleteRegularSlots(regularScheduleDto: DeleteRegularSlotsDto) {
    try {
      return await authApi
        .delete(
          `${ETemplateLessonEndpoints.CREATE_TEMPLATE_LESSON}/${regularScheduleDto.templateLessonId}/regular-slot`,
          {
            json: regularScheduleDto,
          }
        )
        .json();
    } catch (error) {
      throw new Error(ErrorMessages.REQUEST_PREPARATION_ERROR);
    }
  }
}

export const {
  createTemplateLesson,
  getTemplateLessons,
  deleteTemplateLesson,
  deleteRegularSlots,
  generateTemplateSlots,
} = new TemplateLessonService();
