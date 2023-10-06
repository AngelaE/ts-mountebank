import { Response, DefaultResponse } from './response';
import { Proxy } from './proxy';
import { Predicate, DefaultPredicate } from './predicate';
import { HttpMethod } from './http-method';

export class Stub {
  predicates: Predicate[];
  responses: (Proxy | Response)[];

  constructor() {
    this.predicates = [];
    this.responses = [];
  }

  withResponse(response: Response): this {
    this.responses.push(response);
    return this;
  }

  withProxy(proxy: Proxy): this {
    this.responses.push(proxy);
    return this;
  }

  withPredicate(predicate: Predicate): this {
    this.predicates.push(predicate);
    return this;
  }
}

export class DefaultStub extends Stub {
  constructor(path: string, method: HttpMethod, body: any, statusCode: number) {
    super();
    return this.withPredicate(new DefaultPredicate(path, method)).withResponse(
      new DefaultResponse(body, statusCode),
    );
  }
}
