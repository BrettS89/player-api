import { Service, MongooseServiceOptions } from 'feathers-mongoose';
import { v4 as uuid } from 'uuid';
import { Application } from '../../../declarations';

import AWS from 'aws-sdk';

interface SignatureReq {
  file_type: string;
}

interface ReturnType {
  url: string;
  key: string;
}

export class Signature extends Service {
  private s3: AWS.S3;
  private app: Application;
  private s3Config: Record<string, string>;
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<MongooseServiceOptions>, app: Application) {
    super(options);

    this.app = app;
    this.s3Config = app.get('aws.s3');

    this.s3 = new AWS.S3({
      accessKeyId: this.s3Config.public,
      secretAccessKey: this.s3Config.secret,
    });
  }

  async create(data: SignatureReq): Promise<ReturnType> {
    const { file_type } = data;

    const key = uuid();

    const url = this.s3.getSignedUrl('putObject', {
      Bucket: this.s3Config.bucket,
      Key: key,
      ContentType: file_type,
      ACL: 'public-read',
    });

    return {
      url,
      key: this.s3Config.key + key,
    };
  }
}
