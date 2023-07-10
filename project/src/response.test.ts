import { assert } from 'chai';
import { Response } from './response';

describe('Response', () => {
  describe('#withHeader', () => {
    const res = new Response().withHeader('authorization', 'bearer');

    it('should have a port', () => {
      assert.equal('bearer', res.headers.get('authorization'));
    });
  });
  describe('#withBody', () => {
    const res = new Response().withJSONBody({ name: 'name' });
    it('should have a body', () => {
      assert.isNotNull(res.body);
    });
    it('should have a content-type header', () => {
      assert.equal('application/json', res.headers.get('Content-Type'));
    });
  });
  describe('#withMode', () => {
    const res = new Response();
    it('should not set _mode by default', () => {
      const payload = res.toJSON();
      assert.isUndefined(payload.is._mode);
    });
    it('should have a mode of "binary"', () => {
      res.withMode('binary');
      const payload = res.toJSON();
      assert.equal(payload.is._mode, 'binary');
    });
  });
});
