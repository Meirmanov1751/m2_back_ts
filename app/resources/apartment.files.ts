import uploadFeature from '@adminjs/upload';

const {ApartmentImage} = require("../models/apartment.image.model");

const localProvider = {
  bucket: 'public/files/apartment',
  opts: {
    baseUrl: '/files/apartment',
  },
};

export const ApartmentImages = {
  resource: ApartmentImage,
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
