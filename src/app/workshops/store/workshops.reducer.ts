import { Tag, Article, Comment } from "src/app/interfaces";
import { WorkshopsActionTypes, WorkshopsActions } from "./workshops.actions";

export interface WorkshopsState {
    loading: boolean;
    error: string;
    tags: Array<Tag>;
    articles: Array<Article>;
    article: null | Article;
    comments: Array<Comment>;
}

export const initialState: WorkshopsState = {
    loading: false,
    error: "",
    tags: [],
    articles: [],
    article: null,
    comments: []
};

export function workshopsReducer(
    state = initialState,
    action: WorkshopsActions
): WorkshopsState {
    switch (action.type) {
        case WorkshopsActionTypes.ArticlesRequest:
            return {
                ...state,
                loading: true,
                error: ""
            };
        case WorkshopsActionTypes.ArticlesSuccess:
            return {
                ...state,
                articles: action.payload.articles,
                loading: false,
                error: ""
            };
        case WorkshopsActionTypes.ArticlesFailure:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };

        case WorkshopsActionTypes.TagsRequest:
            return {
                ...state
            };
        case WorkshopsActionTypes.TagsSuccess:
            return {
                ...state,
                tags: action.payload.tags
            };
        case WorkshopsActionTypes.TagsFailure:
            return {
                ...state
            };

        case WorkshopsActionTypes.ArticlePageRequest:
            return {
                ...state,
                loading: true,
                error: ""
            };
        case WorkshopsActionTypes.ArticlePageSuccess:
            return {
                ...state,
                loading: false,
                error: "",
                article: action.payload.article
            };
        case WorkshopsActionTypes.ArticlePageFailure:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };

        case WorkshopsActionTypes.ArticleCommentsRequest:
            return {
                ...state,
                loading: true,
                error: ""
            };
        case WorkshopsActionTypes.ArticleCommentsSuccess:
            return {
                ...state,
                loading: false,
                error: "",
                comments: action.payload.comments
            };
        case WorkshopsActionTypes.ArticleCommentsFailure:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };

        default:
            return state;
    }
}
