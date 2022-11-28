import {Ulid} from '../../Domain/Shared/Ulid';
const {S3Client} = require('@aws-sdk/client-s3');
const multer = require('multer');
const multerS3 = require('multer-s3');
require('dotenv').config();

const credentials = {
  accessKeyId: process.env.STORAGE_ACCESS_KEY_ID,
  secretAccessKey: process.env.STORAGE_SECRET_KEY,
};
const bucketName = process.env.STORAGE_BUCKET_NAME;
const spacesEndpoint = process.env.STORAGE_SPACES_ENDPOINT;

const s3 = new S3Client({
  credentials,
  forcePathStyle: true,
  endpoint: spacesEndpoint,
  region: 'nyc3',
});

export const uploadFiles = (request, response, next) => {
  const activityImageId = Ulid.create();

  const upload = multer({
    storage: multerS3({
      limits: {files: 1},
      s3: s3,
      bucket: bucketName,
      acl: 'public-read',
      metadata: function (req, file, cb) {
        cb(null, {fieldName: activityImageId.value});
      },
      key: function (request, file, cb) {
        cb(null, activityImageId.value + '.jpg');
      },
    }),
  }).single('activity_photo');

  upload(request, response, error => {
    if (error instanceof multer.MulterError)
      return response.status(400).json({
        message: 'Upload unsuccessful',
        errorMessage: error.message,
        errorCode: error.code,
      });

    if (error)
      return response.status(500).json({
        message: 'Error occured',
        errorMessage: error.message,
      });
    response.locals.activityImageId = activityImageId.value;
    next();
  });
};
