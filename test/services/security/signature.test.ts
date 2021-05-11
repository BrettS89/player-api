import app from '../../../src/app';

describe('\'security/signature\' service', () => {
  it('registered the service', () => {
    const service = app.service('security/signature');
    expect(service).toBeTruthy();
  });
});
