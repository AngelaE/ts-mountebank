# ts-mountebank 

## This is a fork of based of https://github.com/AngelaE/ts-mountebank


A simple node package that lets you manage your [Mountebank test server](http://mbtest.org).
Based on https://www.npmjs.com/package/@toincrease/node-mountebank, but 
* updated/removed vulnerable packages,
* modernized the code and
* added ability to create very simple proxies
* improved predicates (not just equal)

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

For more samples on how to use this package check this blog: https://angela-evans.com/easy-api-tests-with-mountebank/

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
 
```
// forward all requestsfrom port 5000 => 5001 and generate response stubs
let proxyImposter = new Imposter()
    .withPort(5000)
    .withStub(new Stub()
        .withProxy(new DebugProxy(`http://localhost:5001}`))); 

await mb.createImposter(proxyImposter);
 ```
