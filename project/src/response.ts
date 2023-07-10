type ResponseMode = 'text' | 'binary';

export class Response {
  statusCode = 200;
  body?: string = undefined;
  headers: Map<string, string>;
  mode?: ResponseMode;
  constructor() {
    this.headers = new Map<string, string>();
  }
  withHeader(name: string, value: string): this {
    this.headers.set(name, value);
    return this;
  }
  withStatusCode(statusCode: number): this {
    this.statusCode = statusCode;
    return this;
  }
  withJSONBody(body: any): this {
    this.withHeader('Content-Type', 'application/json'); // set the header to json for convenience
    this.body = JSON.stringify(body);
    return this;
  }

  withBody(body: any): this {
    this.body = body;
    return this;
  }

  withMode(mode: ResponseMode): this {
    this.mode = mode;
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

    if (this.body) {
      res.body = this.body;
    }
    if (this.statusCode) {
      res.statusCode = this.statusCode;
    }
    if (this.mode) {
      res._mode = this.mode;
    }

    return { is: res };
  }
}

export class DefaultResponse extends Response {
  constructor(body: string, statusCode: number) {
    super();
    return this.withJSONBody(body).withStatusCode(statusCode);
  }
}

export class NotFoundResponse extends Response {
  constructor() {
    super();
    return this.withStatusCode(404);
  }
}
