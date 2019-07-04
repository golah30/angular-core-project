import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import {
    QuizzesRequest,
    QuizzesActionTypes,
    QuizzesSuccess,
    QuizzesFailure,
    QuizzPageRequest,
    QuizzPageSuccess
} from "./quizzes.actions";
import { exhaustMap, map, catchError } from "rxjs/operators";
import { QuizzesService } from "src/app/service/quizzes/quizzes.service";
import { of } from "rxjs";

@Injectable()
export class QuizzesEffects {
    constructor(
        private actions$: Actions,
        private QuizzesService: QuizzesService
    ) {}
    @Effect()
    quizzesRequest$ = this.actions$.pipe(
        ofType<QuizzesRequest>(QuizzesActionTypes.QuizzesRequest),
        map((action: QuizzesRequest) => action.payload),
        exhaustMap((payload: any) => {
            return this.QuizzesService.getQuizzes({ ...payload }).pipe(
                map((data: any) => {
                    return new QuizzesSuccess({ quizzes: data });
                }),
                catchError(error =>
                    of(new QuizzesFailure({ error: error.error.message }))
                )
            );
        })
    );
    @Effect()
    quizRequest$ = this.actions$.pipe(
        ofType<QuizzPageRequest>(QuizzesActionTypes.QuizzPageRequest),
        map((action: QuizzPageRequest) => action.payload),
        exhaustMap((payload: { id: string }) => {
            return this.QuizzesService.getQuizById(payload.id).pipe(
                map((data: any) => {
                    return new QuizzPageSuccess({ quiz: data });
                }),
                catchError(error =>
                    of(new QuizzesFailure({ error: error.error.message }))
                )
            );
        })
    );
}
