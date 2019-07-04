import { Action } from "@ngrx/store";

export enum QuizzesActionTypes {
    QuizzesRequest = "[Quizzes] Quizzes Request",
    QuizzesSuccess = "[Quizzes] Quizzes Success",
    QuizzesFailure = "[Quizzes] Quizzes Failure",

    QuizzPageRequest = "[Quizzes] Quiz page request",
    QuizzPageSuccess = "[Quizzes] Quiz page success"
}

export class QuizzesRequest implements Action {
    readonly type = QuizzesActionTypes.QuizzesRequest;
    constructor(public payload: any) {}
}
export class QuizzesSuccess implements Action {
    readonly type = QuizzesActionTypes.QuizzesSuccess;
    constructor(public payload: { quizzes: Array<any> }) {}
}
export class QuizzesFailure implements Action {
    readonly type = QuizzesActionTypes.QuizzesFailure;
    constructor(public payload: { error: string }) {}
}

export class QuizzPageRequest implements Action {
    readonly type = QuizzesActionTypes.QuizzPageRequest;
    constructor(public payload: { id: string }) {}
}
export class QuizzPageSuccess implements Action {
    readonly type = QuizzesActionTypes.QuizzPageSuccess;
    constructor(public payload: { quiz: any }) {}
}
export type QuizzesActions =
    | QuizzesRequest
    | QuizzesSuccess
    | QuizzesFailure
    | QuizzPageRequest
    | QuizzPageSuccess;
