import { assert, expect } from 'chai';
import request = require('superagent');

import { HttpMethod } from './http-method';
import { Imposter } from './imposter';
import { Mountebank } from './mountebank';
import { DefaultStub } from './stub';

const port = 12345;
const testPath = '/testpath';
async function getImposterResponseCode(): Promise<number> {
  return (await request.get(`http://localhost:${port}${testPath}`)).statusCode;
}

describe('Mountebank', () => {
  // only runs on local machine for now
  const mb = new Mountebank();

  it('is running', async () => {
    // act
    const isAlive = await mb.checkIsAlive(true);

    // assert
    expect(isAlive).to.be.true;
  });

  it('can create an imposter', async () => {
    const imposter = new Imposter()
      .withPort(port)
      .withStub(new DefaultStub(testPath, HttpMethod.GET, 'testbody', 222));

    // act
    try {
      await mb.createImposter(imposter);
    } catch (error) {
      console.log(error);
      assert.fail();
    }

    // assert
    const responseCode = await getImposterResponseCode();
    expect(responseCode).to.equal(222);
  });

  it('can delete an imposter', async () => {
    // act
    await mb.deleteImposter(port);

    // assert
    try {
      await getImposterResponseCode();
    } catch (error) {
      expect(error).to.match(/(?:ECONNREFUSED)/);
      return;
    }
    assert.fail('the request should have failed');
  });
});
