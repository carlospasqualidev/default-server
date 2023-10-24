import 'dotenv/config';
import { S3Client } from '@aws-sdk/client-s3';
import multer from 'multer';
import multerS3 from 'multer-s3';

import { Response, Request } from 'express';

export async function uploadMany(req: Request, res: Response) {
  const s3bucket = new S3Client({
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
    region: process.env.AWS_BUCKET_REGION!,
  });

  const fileUpload = multer({
    storage: multerS3({
      s3: s3bucket,
      bucket: process.env.AWS_S3_BUCKET!,
      metadata(_req1, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key(_req2, file, cb) {
        const { originalname } = file;
        cb(null, originalname);
      },
      acl: 'public-read',
    }),
  }).array('files');

  fileUpload(req, res, () => res.status(200).json(req.files));
}
