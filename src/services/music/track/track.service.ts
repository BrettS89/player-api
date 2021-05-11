// Initializes the `music/track` service on path `/music/track`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import { Track } from './track.class';
import createModel from '../../../models/track.model';
import hooks from './track.hooks';

// Add this service to the service type index
declare module '../../../declarations' {
  interface ServiceTypes {
    'music/track': Track & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/music/track', new Track(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('music/track');

  service.hooks(hooks);
}
