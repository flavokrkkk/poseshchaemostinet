export interface News {
  id: string;
  date: string;
  title: string;
  content: string;
}

export interface NewsParams {
  limit: number;
  offset: number;
}
