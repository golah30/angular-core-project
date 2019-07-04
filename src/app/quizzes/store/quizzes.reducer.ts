import { QuizzesActions, QuizzesActionTypes } from "./quizzes.actions";

export interface QuizzesState {
    loading: boolean;
    error: string;
    list: Array<any>;
    quiz: any;
}

export const initialState: QuizzesState = {
    loading: false,
    error: "",
    list: [],
    quiz: null
};

export function quizzesReducer(
    state = initialState,
    action: QuizzesActions
): QuizzesState {
    switch (action.type) {
        case QuizzesActionTypes.QuizzesRequest:
            return {
                ...state,
                loading: true,
                error: "",
                list: []
            };
        case QuizzesActionTypes.QuizzesSuccess:
            return {
                ...state,
                loading: false,
                error: "",
                list: action.payload.quizzes
            };
        case QuizzesActionTypes.QuizzesFailure:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                list: []
            };
        case QuizzesActionTypes.QuizzPageRequest:
            return {
                ...state,
                loading: true,
                error: "",
                quiz: null
            };
        case QuizzesActionTypes.QuizzPageSuccess:
            return {
                ...state,
                loading: true,
                error: "",
                quiz: action.payload.quiz
            };
        default:
            return state;
    }
}
