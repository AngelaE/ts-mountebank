import { assert } from 'chai';
import { Proxy, ProxyMode } from './proxy';


describe('Proxy', () => {
  describe('can be initialized correctly', () => {
    const to = 'http://localhost:5123';
    const mode = ProxyMode.ProxyOnce;
    const addWaitBehavior = true;
    const proxy = new Proxy(to).withMode(mode).withAddWaitBehavior(true);

    it('should have a target address (to)', () => {
      assert.equal(to, proxy.to);
    });

    it('should assign #mode', () => {
      assert.equal(mode, proxy.mode);
    });

    it('should assign #addWaitBehavior', () => {
      assert.equal(addWaitBehavior, proxy.addWaitBehavior);
    });
  });
});
