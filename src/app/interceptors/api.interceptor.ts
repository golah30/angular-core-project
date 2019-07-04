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
import { ModalMessageService } from "../core/modal-message/modal-message.service";
@Injectable()
export class ApiInterceptor implements HttpInterceptor {
    constructor(private modalService: ModalMessageService) {}
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.error.message) {
                    this.modalService.modal({ message: error.error.message });
                }

                return throwError(error);
            })
        );
    }
}
