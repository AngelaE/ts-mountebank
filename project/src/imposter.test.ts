import { DefaultImposter } from './imposter';
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
