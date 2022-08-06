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

  withOperator(operator: Operator): FlexiPredicate {
    this.operator = operator;
    return this;
  }

  withHeader(header: string, value: string): FlexiPredicate {
    this.headers.set(header, value);
    return this;
  }

  withQuery(query: any): FlexiPredicate {
    this.query = query;
    return this;
  }
  
  withPath(path: string): FlexiPredicate {
    this.path = path;
    return this;
  }

  withMethod(method: HttpMethod): FlexiPredicate {
    this.method = method;
    return this;
  }
  
  withBearerToken(token: string): FlexiPredicate {
    this.withHeader('authorization', 'bearer ' + token);
    return this;
  }

  withBody(body: any): FlexiPredicate {
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

    if(this.query !== undefined) {
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

  withHeader(header: string, value: string): EqualPredicate {
    this.headers.set(header, value);
    return this;
  }
  withPath(path: string): EqualPredicate {
    this.path = path;
    return this;
  }
  withMethod(method: HttpMethod): EqualPredicate {
    this.method = method;
    return this;
  }
  withBearerToken(token: string): EqualPredicate {
    this.withHeader('authorization', 'bearer ' + token);
    return this;
  }

  withBody(body: any): EqualPredicate {
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
