#ts-mountebank 

A simple node package that lets you manage your [Mountebank test server](http://mbtest.org).
Based on https://www.npmjs.com/package/@toincrease/node-mountebank, but 
* updated/removed vulnerable packages,
* modernized the code and
* added ability to create very simple proxies.

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

### Create Debug Proxy
A simple proxy which always proxies the request and records the responses.
This is useful to 
* 'debug' traffic during tests or
* record traffic between APIs to use as template for building imposters.
 