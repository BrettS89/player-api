import app from '../../../src/app';

describe('\'music/track\' service', () => {
  it('registered the service', () => {
    const service = app.service('music/track');
    expect(service).toBeTruthy();
  });
});
