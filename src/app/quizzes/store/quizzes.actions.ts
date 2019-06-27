import { Action } from "@ngrx/store";

export enum QuizzesActionTypes {
    QuizzesRequest = "[Quizzes] Quizzes Request",
    QuizzesSuccess = "[Quizzes] Quizzes Success",
    QuizzesFailure = "[Quizzes] Quizzes Failure"
}

export class QuizzesRequest implements Action {
    readonly type = QuizzesActionTypes.QuizzesRequest;
}
export class QuizzesSuccess implements Action {
    readonly type = QuizzesActionTypes.QuizzesSuccess;
    constructor(public payload: { quizzes: Array<any> }) {}
}
export class QuizzesFailure implements Action {
    readonly type = QuizzesActionTypes.QuizzesFailure;
    constructor(public payload: { error: string }) {}
}

export type QuizzesActions = QuizzesRequest | QuizzesSuccess | QuizzesFailure;
