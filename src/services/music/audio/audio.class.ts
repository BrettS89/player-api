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
    const id = uuid();
    deleteFile();
    await downloadAudio(data.url);
    await convertToWav();
    await executeCommand(`soundstretch ./public/audio/audio.wav ./public/audio/${id}.wav -pitch=${data.pitch}`);
    data.url = `${this.app.get('audioUrl')}/${id}.wav`;
    return data;
  }
}
