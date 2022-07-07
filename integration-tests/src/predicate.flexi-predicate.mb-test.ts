import { expect } from 'chai';
import request = require('superagent');

import {
  Imposter,
  Mountebank,
  Stub,
  FlexiPredicate,
  Operator,
  DefaultResponse,
} from '@efr-os/ts-mountebank';

const port = 12345;
async function getImposterResponseCode(path: string): Promise<number> {
  return (await request.get(`http://localhost:${port}${path}`)).statusCode;
}

describe('The flexi predicate', () => {
  // only runs on local machine for now
  const mb = new Mountebank();

  const tests = [
    {
      operator: Operator.startsWith,
      predicatePath: '/test',
      matches: ['/testpath'],
      nonMatching: ['/te'],
    },
    {
      operator: Operator.endsWith,
      predicatePath: 'ong',
      matches: ['/testpath-long'],
      nonMatching: ['/testing'],
    },
  ];

  tests.forEach(async (test) => {
    describe(`${test.operator} Operator with path '${test.predicatePath}'`, () => {
      before(async () => {
        const imposter = new Imposter()
          .withPort(port)
          .withStub(
            new Stub()
              .withPredicate(
                new FlexiPredicate()
                  .withOperator(test.operator)
                  .withPath(test.predicatePath)
              )
              .withResponse(new DefaultResponse('found', 222))
          );

        await mb.createImposter(imposter);
      });

      test.matches.forEach(async (match) => {
        it(`works with match '${match}'`, async () => {
          // assert
          const responseCode = await getImposterResponseCode(match);
          expect(responseCode).to.equal(222);
        });
      });

      test.nonMatching.forEach(async (nonMatch) => {
        it(`does not work with '${nonMatch}'`, async () => {
          // assert
          const responseCode = await getImposterResponseCode(nonMatch);
          expect(responseCode).to.equal(200);
        });
      });
    });
  });
});
