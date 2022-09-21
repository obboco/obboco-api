import { Ulid } from '../../Domain/Shared/Ulid';
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
require('dotenv').config();

const credentials = {
  accessKeyId: process.env.STORAGE_ACCESS_KEY_ID,
  secretAccessKey: process.env.STORAGE_SECRET_KEY
};
const bucketName = process.env.STORAGE_BUCKET_NAME;
const spacesEndpoint = new aws.Endpoint(process.env.STORAGE_SPACES_ENDPOINT);

const s3 = new aws.S3({
  credentials,
  s3ForcePathStyle: true,
  endpoint: spacesEndpoint
});

export const uploadFiles = (request, response, next) => {
  const activityImageId = Ulid.create();

  const upload = multer({
    storage: multerS3({
      limits: { files: 1 },
      s3: s3,
      bucket: bucketName,
      acl: 'public-read',
      metadata: function (req, file, cb) {
        cb(null, { fieldName: activityImageId.value });
      },
      key: function (request, file, cb) {
        cb(null, activityImageId.value + '.jpg');
      }
    })
  }).single('activity_photo');

  upload(request, response, (error) => {
    if (error instanceof multer.MulterError)
      return response.status(400).json({
        message: 'Upload unsuccessful',
        errorMessage: error.message,
        errorCode: error.code
      });

    if (error)
      return response.status(500).json({
        message: 'Error occured',
        errorMessage: error.message
      });
    response.locals.activityImageId = activityImageId.value;
    next();
  });
};
