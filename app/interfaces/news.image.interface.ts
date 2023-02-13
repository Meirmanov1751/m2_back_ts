export interface INewsImage {
  id: number;
  NewsId: any;
  s3Key: string;
  bucket: string;
  mime: string;
  comment: string | null;
}
