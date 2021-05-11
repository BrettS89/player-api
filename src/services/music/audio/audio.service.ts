// Initializes the `music/audio` service on path `/music/audio`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import { Audio } from './audio.class';
import hooks from './hooks';

// Add this service to the service type index
declare module '../../../declarations' {
  interface ServiceTypes {
    'music/audio': Audio & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/music/audio', new Audio(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('music/audio');

  service.hooks(hooks);
}
