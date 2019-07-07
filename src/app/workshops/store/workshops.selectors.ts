import { createFeatureSelector, createSelector } from "@ngrx/store";
import { WorkshopsState } from "./workshops.reducer";

export const selectWorkshopsState = createFeatureSelector<WorkshopsState>(
    "workshops"
);

export const selectArticles = createSelector(
    selectWorkshopsState,
    (state: WorkshopsState) => state.articles
);
export const selectTotalArticlesCount = createSelector(
    selectWorkshopsState,
    (state: WorkshopsState) => state.total
);
export const selectArticle = createSelector(
    selectWorkshopsState,
    (state: WorkshopsState) => state.article
);
export const selectTags = createSelector(
    selectWorkshopsState,
    (state: WorkshopsState) => state.tags
);
export const selectWorkshopsLoading = createSelector(
    selectWorkshopsState,
    (state: WorkshopsState) => state.loading
);
export const selectWorkshopsError = createSelector(
    selectWorkshopsState,
    (state: WorkshopsState) => state.error
);
export const selectComments = createSelector(
    selectWorkshopsState,
    (state: WorkshopsState) => state.comments
);
