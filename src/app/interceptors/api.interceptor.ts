import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse
} from "@angular/common/http";
@Injectable()
export class ApiInterceptor implements HttpInterceptor {
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.error.message) {
                    alert(error.error.message);
                }

                return throwError(error);
            })
        );
    }
}
