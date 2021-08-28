export class Response {
  statusCode = 200;
  body?: string = undefined;
  headers: Map<string, string>;
  constructor() {
    this.headers = new Map<string, string>();
  }
  withHeader(name: string, value: string): Response {
    this.headers.set(name, value);
    return this;
  }
  withStatusCode(statusCode: number): Response {
    this.statusCode = statusCode;
    return this;
  }
  withJSONBody(body: any): Response {
    this.withHeader('Content-Type', 'application/json'); // set the header to json for convenience
    this.body = JSON.stringify(body);
    return this;
  }

  withBody(body: any): Response {
    this.body = body;
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
