import { Params } from '@feathersjs/feathers';
import { v4 as uuid } from 'uuid';
import { Application } from '../../../declarations';
import { deleteFile, downloadAudio, convertToWav, executeCommand } from './hooks/hooks';

interface Data {
  url: string;
  pitch: number;
}

interface ServiceOptions {}

export class Audio{
  app: Application;
  options: ServiceOptions;

  constructor (options: ServiceOptions = {}, app: Application) {
    this.options = options;
    this.app = app;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create (data: Data, params?: Params): Promise<Data> {
    console.log(data);
    const id = uuid();
    deleteFile();
    await downloadAudio(data.url);
    await convertToWav();
    await executeCommand(`soundstretch ./public/audio.wav ./public/${id}.wav -pitch=${data.pitch}`);
    data.url = `http://localhost:3030/${id}.wav`;
    return data;
  }
}
