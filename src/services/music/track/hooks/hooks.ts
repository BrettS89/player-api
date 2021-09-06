import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import https from 'https';
import ffmpeg from 'fluent-ffmpeg';

export const deleteFile = () => {
  fs.readdir(path.join('./public'), (err, files) => {
    if (err) throw err;

    files.forEach((file: string) => {
      if (file.length > 15) {
        fs.unlink('./public/' + file, (err) => {
          if (err) {
            throw err;
          }
        });
      }
    });
  });
};

export const downloadAudio = (url: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream('./public/audio.mp3');
    https.get(url, res => {
      res.pipe(file);
      file.on('finish', () => resolve(true));
      file.on('error', reject);
    });
  })
};

export const convertToWav = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    ffmpeg('./public/audio.mp3')
      .toFormat('wav')
      .on('error', (err) => {
          reject(err.message);
      })
      .on('end', () => {
        resolve(true)
      })
      .save('./public/audio.wav');
  });
};

export const executeCommand = (command: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    exec(command, (error) => {
      if (error) {
        reject(error);
      }
      resolve(true);
    });
  });
};
