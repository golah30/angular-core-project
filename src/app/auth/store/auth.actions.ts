import { Action } from "@ngrx/store";
import { User } from "src/app/interfaces";

export enum AuthActionTypes {
    LogInRequest = "[Auth] Login Request",
    LogInSuccess = "[Auth] Login Success",
    LogInFailure = "[Auth] Login Failure",
    SignUpRequest = "[Auth] Sign up request",
    SignUpSuccess = "[Auth] Sign up success",
    SignUpFailure = "[Auth] Sign up failure",
    LogInByToken = "[Auth] Login by token Request",
    Logout = "[Auth] Logout"
}
export class Logout implements Action {
    readonly type = AuthActionTypes.Logout;
}
export class LogInByToken implements Action {
    readonly type = AuthActionTypes.LogInByToken;
    constructor(public payload: { token: string }) {}
}
export class LogInRequest implements Action {
    readonly type = AuthActionTypes.LogInRequest;
    constructor(public payload: { login: string; password: string }) {}
}
export class LogInSuccess implements Action {
    readonly type = AuthActionTypes.LogInSuccess;
    constructor(public payload: { user: User; token: string }) {}
}
export class LogInFailure implements Action {
    readonly type = AuthActionTypes.LogInFailure;
    constructor(public payload: { error: string }) {}
}

export class SignUpRequest implements Action {
    readonly type = AuthActionTypes.SignUpRequest;
}
export class SignUpSuccess implements Action {
    readonly type = AuthActionTypes.SignUpSuccess;
}
export class SignUpFailure implements Action {
    readonly type = AuthActionTypes.SignUpFailure;
}

export type AuthActions =
    | LogInRequest
    | LogInSuccess
    | LogInFailure
    | SignUpRequest
    | SignUpSuccess
    | SignUpFailure
    | LogInByToken
    | Logout;
