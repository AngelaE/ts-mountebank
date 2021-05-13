#ts-mountebank 

A simple node package that lets you manage your [Mountebank test server](http://mbtest.org).
Based on https://www.npmjs.com/package/@toincrease/node-mountebank, but updated/removed vulnerable packages and modernized the code.

## Usage

### Pre-Requisite

Install Mountebank:

```
npm install -g mountebank --production
```

Start Mountebank:

```
mb 
```

I recommend reading the [Mountebank documentation](http://www.mbtest.org/docs/api/overview) for a deeper understanding of their API.

### Create Imposter
```typescript
const mb = new Mountebank();
let imposter = new Imposter().withPort(port).withStub(
    new DefaultStub(testPath, HttpMethod.GET, 'testbody', 222));
await mb.createImposter(imposter);
```
 
