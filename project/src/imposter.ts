import { NotFoundResponse } from './response';
import { HttpMethod } from './http-method';
import { Stub, DefaultStub } from './stub';
import { IRequest } from './request';

export class Imposter {
  public protocol = 'http';
  public port = 0;
  public stubs: Stub[] = [];
  public name?: string = undefined;
  public recordRequests?: boolean = undefined;

  // these properties are only populated when queried from MB
  public numberOfRequests = 0;
  public requests: IRequest[] = [];

  withStub(s: Stub): Imposter {
    this.stubs.push(s);
    return this;
  }

  withPort(p: number): Imposter {
    this.port = p;
    return this;
  }

  withName(name: string): Imposter {
    this.name = name;
    return this;
  }

  withRecordRequests(recordRequests: boolean): Imposter {
    this.recordRequests = recordRequests;
    return this;
  }
}

export class DefaultImposter extends Imposter {
  constructor(path: string, method: HttpMethod, body: any, statusCode: number) {
    super();

    return this.withStub(
      new DefaultStub(path, method, body, statusCode)
    ).withStub(new Stub().withResponse(new NotFoundResponse()));
  }
}
