import { assert } from 'chai';
import { Stub, DefaultStub } from './stub';
import { EqualPredicate } from './predicate';
import { HttpMethod } from './http-method';

describe('Stub', () => {
  describe('#new', () => {
    let stub = new Stub();
    it('should have a stub instance', () => {
      assert.isNotNull(stub);
    });
    it('should have an initialized predicates array', () => {
      assert.isNotNull(stub.predicates);
    });
  });
  describe('#withPredicate', () => {
    let pred = new EqualPredicate();
    let stub = new Stub().withPredicate(pred);
    it('the predicate should be added to the predicates array', () => {
      assert.equal(pred, stub.predicates[0]);
    });
  });

  describe('#DefaultStub', () => {
    let stub = new DefaultStub('path', HttpMethod.POST, 'the body', 200);
    it('should have a predicate with the expected path', () => {
      let pred = <EqualPredicate>stub.predicates[0];
      assert.equal('path', pred.path);
    });
  });
});
