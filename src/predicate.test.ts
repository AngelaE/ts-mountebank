import { assert } from 'chai';
import { EqualPredicate } from './predicate';

describe('Predicate', () => {
  describe('EqualPredicate', () => {
    describe('#withBearerToken', () => {
      let pred = new EqualPredicate().withBearerToken('my_token');
      it('should have an authorization header with bearer token', () => {
        assert.equal(pred.headers.get('authorization'), 'bearer my_token');
      });
    });

    describe('#withHeader', () => {
      let pred = new EqualPredicate().withHeader(
        'custom_header',
        'header_value'
      );
      it('should have the header predicate', () => {
        assert.equal(pred.headers.get('custom_header'), 'header_value');
      });
    });
  });
});
