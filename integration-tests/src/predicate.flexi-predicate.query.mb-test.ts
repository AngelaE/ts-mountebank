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
async function getImposterResponseCode(queryString: string): Promise<number> {
  return (await request.get(`http://localhost:${port}${path}?${queryString}`)).statusCode;
}

describe('The flexi predicate works with query', () => {
  // only runs on local machine for now
  const mb = new Mountebank();

  const tests = [
    {
      predicateQuery: {name: 'x', max: 5},
      matches: ['name=x&max=5', 'max=5&name=x', 'MAX=5&namE=X', 'name=x&max=5&another=y'],
      nonMatching: ['max=5', 'name=x&max=6'],
    },

  ];

  tests.forEach(async (test) => {
    describe(`Query works for predicate '${JSON.stringify(test.predicateQuery)}'`, () => {
      before(async () => {
        const imposter = new Imposter()
          .withPort(port)
          .withStub(
            new Stub()
              .withPredicate(
                new FlexiPredicate()
                  .withOperator(Operator.equals)
                  .withPath(path)
                  .withQuery(test.predicateQuery)
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
