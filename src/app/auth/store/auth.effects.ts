import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { UserService } from "src/app/service/user/user.service";
import {
    LogInRequest,
    AuthActionTypes,
    LogInSuccess,
    LogInFailure,
    SignUpRequest
} from "./auth.actions";
import { exhaustMap, map, catchError } from "rxjs/operators";
import { of } from "rxjs";

@Injectable()
export class AuthEffects {
    constructor(private actions$: Actions, private UserService: UserService) {}

    @Effect()
    logInRequest$ = this.actions$.pipe(
        ofType<LogInRequest>(AuthActionTypes.LogInRequest),
        map((action: LogInRequest) => action.payload),
        exhaustMap((payload: any) => {
            return this.UserService.login(payload.login, payload.password).pipe(
                map((data: any) => {
                    return new LogInSuccess({
                        user: data,
                        token: data.token
                    });
                }),
                catchError(error =>
                    of(new LogInFailure({ error: error.error.message }))
                )
            );
        })
    );
}
