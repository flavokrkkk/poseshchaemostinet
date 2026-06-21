export interface AchievementTemplate {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string;

  createdAt: string;
}

export interface Achievement {
  id: string;
  userId: string;
  templateId: string;
  template: AchievementTemplate;
  progress: number;
  isCompleted: boolean;

  createdAt: string;
  updatedAt: string;
}
