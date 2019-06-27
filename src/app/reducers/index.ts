import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { environment } from "../../environments/environment";
import { AuthState, authReducer } from "../auth/store/auth.reducer";
import {
    WorkshopsState,
    workshopsReducer
} from "../workshops/store/workshops.reducer";
import { QuizzesState, quizzesReducer } from "../quizzes/store/quizzes.reducer";

export interface AppState {
    auth: AuthState;
    workshops: WorkshopsState;
    quizzes: QuizzesState;
}

export const reducers: ActionReducerMap<AppState> = {
    auth: authReducer,
    workshops: workshopsReducer,
    quizzes: quizzesReducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
    ? []
    : [];
