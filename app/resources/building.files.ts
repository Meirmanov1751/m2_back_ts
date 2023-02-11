import uploadFeature from '@adminjs/upload';

const {BuildingImage} = require("../models/building.image.model");

const localProvider = {
  bucket: 'public/files/building',
  opts: {
    baseUrl: '/files/building',
  },
};

export const BuildingImages = {
  resource: BuildingImage,
  options: {
    properties: {
      s3Key: {
        type: 'string',
      },
      bucket: {
        type: 'string',
      },
      mime: {
        type: 'string',
      },
      comment: {
        type: 'textarea',
        isSortable: false,
      },
    },
  },
  features: [
    uploadFeature({
      provider: {local: localProvider},
      validation: {mimeTypes: ['image/png', 'application/pdf', 'audio/mpeg']},
      properties: {
        key: 's3Key',
        file: 'file',
        bucket: 'bucket',
        mimeType: 'mime',
      }
    }),
  ],
};
