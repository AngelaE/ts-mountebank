import {NotFoundResponse} from "./response";
import {HttpMethod} from "./http-method";
import {Stub, DefaultStub} from "./stub";

export class Imposter {
    public protocol: string = "http";
    public port: number = 0;
    public stubs: Stub[];

    constructor() {
        this.stubs = [];
    }

    withStub(s: Stub): Imposter {
        this.stubs.push(s);
        return this;
    }

    withPort(p: number): Imposter {
        this.port = p;
        return this;
    }
}

export class DefaultImposter extends Imposter {
    constructor(path: string, method: HttpMethod, body: any, statusCode: number) {
        super();
        
        return this
            .withStub(new DefaultStub(path, method, body, statusCode))
            .withStub(new Stub().withResponse(new NotFoundResponse()));
    }
}
