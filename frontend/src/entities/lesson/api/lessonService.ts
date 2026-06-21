import { ErrorMessages } from "@/shared/api/queryError";
import { Lesson, LessonCreateDto } from "../types/types";
import { authApi } from "@/shared";
import { ELessonEndpoints } from "../lib/endpoints";

class LessonService {
  public async createLesson(lessonDto: LessonCreateDto) {
    try {
      return await authApi
        .post(ELessonEndpoints.LESSONS, { json: lessonDto })
        .json<Lesson>();
    } catch (error) {
      throw new Error(ErrorMessages.REQUEST_PREPARATION_ERROR);
    }
  }

  public async deleteLesson({ lessonId }: { lessonId: string }) {
    try {
      return await authApi
        .delete(`${ELessonEndpoints.LESSONS}/${lessonId}`)
        .json<Lesson>();
    } catch (error) {
      throw new Error(ErrorMessages.REQUEST_PREPARATION_ERROR);
    }
  }

  public async getLessonById({
    lessonId,
  }: {
    lessonId: string;
  }): Promise<Lesson> {
    try {
      return await authApi
        .get(`${ELessonEndpoints.LESSONS}/detail/${lessonId}`)
        .json<Lesson>();
    } catch (error) {
      throw new Error(ErrorMessages.REQUEST_PREPARATION_ERROR);
    }
  }

  public async updateLesson(dto: Partial<Lesson>): Promise<Lesson> {
    try {
      return await authApi
        .patch(`${ELessonEndpoints.LESSONS}/${dto.id}`, {
          json: {
            ...dto,
          },
        })
        .json<Lesson>();
    } catch (error) {
      throw new Error(ErrorMessages.REQUEST_PREPARATION_ERROR);
    }
  }

  public async uploadHomeworkFiles(dto: {
    files: File[];
    lessonId: string;
  }): Promise<Lesson> {
    try {
      const formData = new FormData();
      dto.files.forEach((file) => formData.append("files", file));

      return authApi
        .post(
          `${ELessonEndpoints.LESSONS}/${dto.lessonId}/${ELessonEndpoints.LESSON_UPLOAD_HOMEWOR}`,
          {
            body: formData,
          }
        )
        .json<Lesson>();
    } catch (error) {
      throw new Error(ErrorMessages.REQUEST_PREPARATION_ERROR);
    }
  }
}

export const {
  createLesson,
  deleteLesson,
  getLessonById,
  updateLesson,
  uploadHomeworkFiles,
} = new LessonService();
