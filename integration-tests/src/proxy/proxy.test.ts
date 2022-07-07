import { assert, expect } from 'chai';
import request from 'superagent';

import {
  Mountebank,
  Imposter,
  HttpMethod,
  DefaultStub,
  Stub,
  DebugProxy,
  ProxyMode,
} from '@efr-os/ts-mountebank';

const port = 12345;
const testPath = '/testpath';

describe('Proxy', () => {
  describe('Proxies work in Mountebank', async () => {
    const firstImposterResponseStatus = 201;
    const secondImposterResponseStatus = 222;
    const proxyTestCases = [
      {
        mode: ProxyMode.ProxyAlways,
        expectedSecondResponseStatus: secondImposterResponseStatus,
      },
      {
        mode: ProxyMode.ProxyOnce,
        expectedSecondResponseStatus: firstImposterResponseStatus,
      },
    ];

    proxyTestCases.forEach((test) => {
      it(`can create a debug proxy for mode ${test.mode}`, async () => {
        const mb = new Mountebank();

        const body = 'yippie';
        const responseImposter = new Imposter()
          .withPort(port)
          .withStub(
            new DefaultStub(
              testPath,
              HttpMethod.GET,
              body,
              firstImposterResponseStatus
            )
          );
        const newImposter = new Imposter()
          .withPort(port)
          .withStub(
            new DefaultStub(
              testPath,
              HttpMethod.GET,
              body,
              secondImposterResponseStatus
            )
          );

        const proxyPort = port + 1;

        // act
        const proxyImposter = new Imposter()
          .withPort(proxyPort)
          .withStub(
            new Stub().withProxy(
              new DebugProxy(`http://localhost:${port}`)
                .withMode(test.mode)
                .withAddWaitBehavior(true)
            )
          );

        try {
          await mb.createImposter(responseImposter);
          await mb.createImposter(proxyImposter);
        } catch (error) {
          console.log(error);
          assert.fail();
        }

        // assert
        let response = await request.get(
          `http://localhost:${proxyPort}${testPath}`
        );
        expect(response.statusCode).to.equal(firstImposterResponseStatus);
        expect(response.body).to.equal(body);

        try {
          await mb.createImposter(newImposter);
        } catch (error) {
          console.log(error);
          assert.fail();
        }
        response = await request.get(
          `http://localhost:${proxyPort}${testPath}`
        );
        expect(response.statusCode).to.equal(test.expectedSecondResponseStatus);
      });
    });
  });
});
