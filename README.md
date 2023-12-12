# ts-mountebank 

A simple node package that lets you manage your [Mountebank test server](http://mbtest.org).
Based on https://www.npmjs.com/package/@toincrease/node-mountebank, but 
* updated/removed vulnerable packages,
* modernized the code and
* added ability to create very simple proxies
* improved predicates (not just equal)

## Usage

### Pre-Requisite

Using nix and devbox.sh to setup local dev environment tooling
# [Devbox.sh](https://www.jetpack.io/devbox/docs/)
1. [Motivation](https://alan.norbauer.com/articles/devbox-intro)
2. Install nix using `./setup-nix.sh`
3. [Install devbox.sh](https://www.jetpack.io/devbox/docs/installing_devbox/)
4. Start devbox.sh using `devbox shell`

Install Mountebank:

```
npm install -g mountebank --production
```

Start Mountebank:

```
mb 
```

I recommend reading the [Mountebank documentation](http://www.mbtest.org/docs/api/overview) for a deeper understanding of their API.

For more samples on how to use this package check this blog: https://angela-evans.com/easy-api-tests-with-mountebank/ or the integration tests.

### Create Imposter
```typescript
const mb = new Mountebank();
let imposter = new Imposter().withPort(port).withStub(
    new DefaultStub(testPath, HttpMethod.GET, 'testbody', 222));
await mb.createImposter(imposter);
```

### Check for QueryString
Add a query to the stub. For usages check the tests in ./integration-tests/predicate.flexi-predicate.query.mb-tests.ts
```typescript
new Stub()
    .withPredicate(
    new FlexiPredicate()
        .withOperator(Operator.equals)
        .withPath('/testpath')
        .withQuery({name: 'x', max: 5})
    )
    .withResponse(new DefaultResponse('found', 222))
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
