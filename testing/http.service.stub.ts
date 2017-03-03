import {EventEmitter} from "@angular/core";

import {ErrorResponse, Request, PostRequest} from "../app/http.service";

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

export class HttpServiceStub<T> {

    private value: T[] = [];
    private error: ErrorResponse[] = [];

    public unauthorized: EventEmitter<ErrorResponse> = new EventEmitter();

    public returnValue(value: T) {
        this.value.push(value);
    }

    public popReturnValue(): T {
        return this.value.pop();
    }

    public shiftReturnValue(): T {
        return this.value.shift();
    }

    public throwError(value: ErrorResponse) {
        this.error.push(value);
    }

    public get(request: Request<T>, auth: boolean = true): Observable<T> {
        if (this.error.length) {
            let error = this.error.shift();
            return Observable.throw(error);
        }
        let value: T = this.value.shift();
        return Observable.of(value);
    }

    public post(request: PostRequest<T>, auth: boolean = true): Observable<T> {
        return this.get(request, auth);
    }
}