import { Application } from '../declarations';
import musicTrack from './music/track/track.service';
import dataTag from './data/tag/tag.service';
import securitySignature from './security/signature/signature.service';
import musicAudio from './music/audio/audio.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
  app.configure(musicTrack);
  app.configure(dataTag);
  app.configure(securitySignature);
  app.configure(musicAudio);
}
