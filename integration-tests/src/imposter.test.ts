import { expect } from 'chai';
import request = require('superagent');

import {
  HttpMethod,
  Imposter,
  Mountebank,
  DefaultStub,
} from '@efr-os/ts-mountebank';

const port = 12345;
const testPath = '/testpath';
async function getImposterResponseCode(): Promise<number> {
  return (await request.get(`http://localhost:${port}${testPath}`)).statusCode;
}

describe('Imposter', () => {
  // only runs on local machine for now
  const mb = new Mountebank();

  it('can record requests', async () => {
    const imposter = new Imposter()
      .withPort(port)
      .withStub(new DefaultStub(testPath, HttpMethod.GET, 'testbody', 222))
      .withRecordRequests(true);

    // act
    await mb.createImposter(imposter);
    const responseCode = await getImposterResponseCode();
    expect(responseCode).to.equal(222);
    const queriedImposter = await mb.getImposter(port);

    // assert
    expect(queriedImposter.numberOfRequests).to.equal(1);
    expect(queriedImposter.requests.length).to.equal(1);

    const request = queriedImposter.requests[0];
    expect(request.method).to.equal('GET');
    expect(request.path).to.equal(testPath);
    console.log(queriedImposter);
  });

});
