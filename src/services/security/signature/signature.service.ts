// Initializes the `security/signature` service on path `/security/signature`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import { Signature } from './signature.class';
import createModel from '../../../models/signature.model';
import hooks from './signature.hooks';

// Add this service to the service type index
declare module '../../../declarations' {
  interface ServiceTypes {
    'security/signature': Signature & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/security/signature', new Signature(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('security/signature');

  service.hooks(hooks);
}
