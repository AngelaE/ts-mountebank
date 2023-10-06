import { HttpMethod } from './http-method';

export interface Predicate {} // eslint-disable-line

export enum Operator {
  equals = 'equals',
  startsWith = 'startsWith',
  endsWith = 'endsWith',
  deepEquals = 'deepEquals',
  contains = 'contains',
  matches = 'matches',
  exists = 'exists',
  not = 'not',
  and = 'and',
  or = 'or',
}

export class FlexiPredicate implements Predicate {
  operator: Operator = Operator.equals;
  method?: HttpMethod = undefined;
  path?: string = undefined;
  query?: any = undefined;
  body?: string = undefined;

  headers: Map<string, string> = new Map<string, string>();

  withOperator(operator: Operator): this {
    this.operator = operator;
    return this;
  }

  withHeader(header: string, value: string): this {
    this.headers.set(header, value);
    return this;
  }

  withQuery(query: any): this {
    this.query = query;
    return this;
  }

  withPath(path: string): this {
    this.path = path;
    return this;
  }

  withMethod(method: HttpMethod): this {
    this.method = method;
    return this;
  }

  withBearerToken(token: string): this {
    this.withHeader('authorization', 'bearer ' + token);
    return this;
  }

  withBody(body: any): this {
    this.body = body;
    return this;
  }
  toJSON(): any {
    const res: any = {};

    if (this.headers.size > 0) {
      let headers: any;
      this.headers.forEach((value: string, key: string) => {
        if (headers === undefined) {
          headers = {};
        }
        headers[key] = value;
      });
      res.headers = headers;
    }

    if (this.method) {
      res.method = HttpMethod[this.method];
    }

    if (this.path) {
      res.path = this.path;
    }

    if (this.query !== undefined) {
      res.query = this.query;
    }

    if (this.body !== undefined) {
      res.body = this.body;
    }
    return {
      [this.operator]: res,
    };
  }
}

export class EqualPredicate implements Predicate {
  method: HttpMethod = HttpMethod.GET;
  path = '/';
  private _body?: string = undefined;
  // does not have a queryString option because you can
  // just use the FlexiPredicate
  // The EqualPredicate is just left here for backwards compatibility

  headers: Map<string, string> = new Map<string, string>();

  withHeader(header: string, value: string): this {
    this.headers.set(header, value);
    return this;
  }
  withPath(path: string): this {
    this.path = path;
    return this;
  }
  withMethod(method: HttpMethod): this {
    this.method = method;
    return this;
  }
  withBearerToken(token: string): this {
    this.withHeader('authorization', 'bearer ' + token);
    return this;
  }

  withBody(body: any): this {
    this._body = body;
    return this;
  }

  toJSON(): any {
    const res: any = {};

    if (this.headers !== undefined) {
      let headers: any;
      this.headers.forEach((value: string, key: string) => {
        if (headers === undefined) {
          headers = {};
        }
        headers[key] = value;
      });
      res.headers = headers;
    }

    if (this.method) {
      res.method = HttpMethod[this.method];
    }

    if (this.path) {
      res.path = this.path;
    }
    if (this._body) {
      res.body = this._body;
    }
    return {
      equals: res,
    };
  }
}

export class DefaultPredicate extends EqualPredicate {
  constructor(path: string, method: HttpMethod) {
    super();
    return this.withPath(path).withMethod(method);
  }
}
