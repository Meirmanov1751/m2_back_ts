import uploadFeature from '@adminjs/upload';

const {NewsImage} = require("../models/news.image.model");

const localProvider = {
  bucket: 'public/files/news',
  opts: {
    baseUrl: '/files/news',
  },
};

export const NewsImages = {
  resource: NewsImage,
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
      validation: {mimeTypes: ['image/gif', 'image/png', 'application/pdf', 'audio/mpeg', 'image/jpeg', 'image/svg+xml']},
      properties: {
        key: 's3Key',
        file: 'file',
        bucket: 'bucket',
        mimeType: 'mime',
      }
    }),
  ],
};
