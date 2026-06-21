import { Injectable, BadRequestException } from "@nestjs/common";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

export interface FileStructure {
  fileName: string;
  fileUrl: string;
}

@Injectable()
export class FileService {
  private supabase: SupabaseClient;

  constructor() {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new BadRequestException("Supabase configuration is missing");
    }

    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  async uploadFiles(
    entityType: string,
    entityId: string,
    files: Express.Multer.File[]
  ): Promise<FileStructure[]> {
    const uploadedUrls: FileStructure[] = [];
    for (const file of files) {
      const filePath = `${entityType.toLowerCase()}/${entityId}/${Date.now()}-${file.originalname}`;

      const { data, error } = await this.supabase.storage
        .from("blimfy")
        .upload(filePath, file.buffer, {
          cacheControl: "3600",
          contentType: file.mimetype,
          upsert: false,
        });

      if (error || !data) {
        throw new BadRequestException(
          `Failed to upload file ${file.originalname}: ${error?.message}`
        );
      }
      const publicUrl = this.supabase.storage
        .from("blimfy")
        .getPublicUrl(data.path).data.publicUrl;
      uploadedUrls.push({
        fileName: file.originalname,
        fileUrl: publicUrl,
      });
    }

    return uploadedUrls;
  }

  async deleteFile(fileUrl: string): Promise<void> {
    const fileName = fileUrl.split("/").pop();
    if (!fileName) {
      throw new BadRequestException("Invalid file URL");
    }

    const { error } = await this.supabase.storage
      .from("poseshchaemostinet")
      .remove([fileName]);
    if (error) {
      throw new BadRequestException(
        `Failed to delete file from storage: ${error.message}`
      );
    }
  }
}
