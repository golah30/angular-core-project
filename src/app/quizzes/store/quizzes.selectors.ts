import { createFeatureSelector, createSelector } from "@ngrx/store";
import { QuizzesState } from "./quizzes.reducer";

export const selectQuizzesState = createFeatureSelector<QuizzesState>(
    "quizzes"
);

export const selectQuizzes = createSelector(
    selectQuizzesState,
    (state: QuizzesState) => state.list
);
export const selectQuizzesError = createSelector(
    selectQuizzesState,
    (state: QuizzesState) => state.error
);
export const selectQuizzesLoading = createSelector(
    selectQuizzesState,
    (state: QuizzesState) => state.loading
);
