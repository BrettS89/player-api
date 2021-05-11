import app from '../../../src/app';

describe('\'music/audio\' service', () => {
  it('registered the service', () => {
    const service = app.service('music/audio');
    expect(service).toBeTruthy();
  });
});
