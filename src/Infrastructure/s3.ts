import { Uuid } from './../Domain/Shared/uuid';
const AWS = require('aws-sdk');
var multer = require('multer');
var multerS3 = require('multer-s3');
require('dotenv').config();

const credentials = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY
};

const useLocal = process.env.NODE_ENV !== 'production';

const bucketName = process.env.AWS_BUCKET_NAME;

const s3client = new AWS.S3({
  credentials,
  /**
   * When working locally, we'll use the Localstack endpoints. This is the one for S3.
   * A full list of endpoints for each service can be found in the Localstack docs.
   */
  endpoint: useLocal ? 'http://localhost:4566' : undefined,
  /**
   * Including this option gets localstack to more closely match the defaults for
   * live S3. If you omit this, you will need to add the bucketName to the `Key`
   * property in the upload function below.
   *
   * see: https://github.com/localstack/localstack/issues/1180
   */
  s3ForcePathStyle: true
});

export const uploadSingleFile = (fileNameId: string) => {
  return multer({
    storage: multerS3({
      s3: s3client,
      bucket: bucketName,
      metadata: function (req, file, cb) {
        cb(null, { fieldName: fileNameId });
      },
      key: function (req, file, cb) {
        cb(null, fileNameId + '.jpg');
      }
    })
  });
};
