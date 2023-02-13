export interface IApartmentImage {
  id: number;
  apartmentId: any;
  s3Key: string;
  bucket: string;
  mime: string;
  comment: string | null;
}
