import { DefaultImposter, Imposter } from './imposter';
import { HttpMethod } from './http-method';
import { expect } from 'chai';

describe('DefaultImposter', () => {
  const imp = new DefaultImposter(
    '/path',
    HttpMethod.POST,
    { xxx: 'test123' },
    200
  ).withName('testImposter');

  it('should have a default stub', () => {
    expect(imp.stubs[0]).to.not.be.undefined;
  });

  it('should have #name initialized', () => {
    expect(imp.name).to.not.be.undefined;
  });
});

describe('Imposter', () => {
  it('should not record requests by default', () => {
    const imp = new Imposter();

    expect(imp.recordRequests).to.be.undefined;
  });

  it('should record requests when set', () => {
    const imp = new Imposter().withRecordRequests(true);

    expect(imp.recordRequests).to.be.true;
  });
});
