import {HttpMethod} from "./http-method";

export interface Predicate {

}

export class EqualPredicate implements Predicate {
    method: HttpMethod = HttpMethod.GET;
    path: string = '/';
    private _body? : string = undefined;
    
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
        this.withHeader("authorization", "bearer " + token);
        return this;
    }

    withBody(body : any) : EqualPredicate {
        this._body = body;
        return this;
    }
    toJSON(): any {
        var res: any = {};

        if (this.headers !== undefined) {
            var headers: any;
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
            equals: res
        };
    }


}

export class DefaultPredicate extends EqualPredicate {
    constructor(path: string, method: HttpMethod) {
        super();
        return this.withPath(path).withMethod(method);
    }
}
