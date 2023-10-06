import { expect } from 'chai';
import request = require('superagent');

import {
  Imposter,
  Mountebank,
  Stub,
  FlexiPredicate,
  Operator,
  DefaultResponse,
} from '@anev/ts-mountebank';

const port = 12345;
const path = '/testpath';
async function getImposterResponseCode(body: any): Promise<number> {
  return (await request.post(`http://localhost:${port}${path}`).send(body))
    .statusCode;
}

describe('The flexi predicate works with query', () => {
  // only runs on local machine for now
  const mb = new Mountebank();

  const tests = [
    {
      predicateBody: { name: 'x', max: 5 },
      matches: [
        { name: 'x', max: 5 },
        { name: 'x', max: 5, min: 1 },
      ],
      nonMatching: [{ name: 'x' }, { name: 'x', max: 6 }],
    },
  ];

  tests.forEach(async (test) => {
    describe(`Body works for predicate '${JSON.stringify(
      test.predicateBody,
    )}'`, () => {
      before(async () => {
        const imposter = new Imposter()
          .withPort(port)
          .withStub(
            new Stub()
              .withPredicate(
                new FlexiPredicate()
                  .withOperator(Operator.equals)
                  .withPath(path)
                  .withBody(test.predicateBody),
              )
              .withResponse(new DefaultResponse('found', 222)),
          );

        await mb.createImposter(imposter);
      });

      test.matches.forEach(async (match) => {
        it(`works with match '${JSON.stringify(match)}'`, async () => {
          // assert
          const responseCode = await getImposterResponseCode(match);
          expect(responseCode).to.equal(222);
        });
      });

      test.nonMatching.forEach(async (nonMatch) => {
        it(`does not work with '${JSON.stringify(nonMatch)}'`, async () => {
          // assert
          const responseCode = await getImposterResponseCode(nonMatch);
          expect(responseCode).to.equal(200);
        });
      });
    });
  });
});
