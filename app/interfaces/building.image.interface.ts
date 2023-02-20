export interface IBuildingImage {
  id: number;
  buildingId: any;
  s3Key: string;
  bucket: string;
  mime: string;
  comment: string | null;
  isCover: boolean;
}
