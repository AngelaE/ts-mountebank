import { assert, expect } from 'chai';
import request from 'superagent';
import { HttpMethod } from '../http-method';
import { Imposter } from '../imposter';
import { Matches } from './matches';
import { Mountebank } from '../mountebank';
import { PredicateGenerator } from './predicate-generator';
import { DebugProxy, Proxy, ProxyMode } from './proxy';
import { DefaultStub, Stub } from '../stub';

const port = 12345;
const testPath = '/testpath';

describe('Proxy', () => {
  describe('can be initialized correctly', () => {
    const to = 'http://localhost:5123';
    const mode = ProxyMode.ProxyOnce;
    const addWaitBehavior = true;
    let proxy = new Proxy(to).withMode(mode).withAddWaitBehavior(true);

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
        let responseImposter = new Imposter()
          .withPort(port)
          .withStub(
            new DefaultStub(
              testPath,
              HttpMethod.GET,
              body,
              firstImposterResponseStatus
            )
          );
        let newImposter = new Imposter()
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
        let proxyImposter = new Imposter()
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
