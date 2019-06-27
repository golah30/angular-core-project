import { Action } from "@ngrx/store";
import { Article, Tag } from "src/app/interfaces";

export enum WorkshopsActionTypes {
    ArticlesRequest = "[Workshops] Articles request",
    ArticlesSuccess = "[Workshops] Articles success",
    ArticlesFailure = "[Workshops] Articles failure",

    TagsRequest = "[Workshops] Tags request",
    TagsSuccess = "[Workshops] Tags success",
    TagsFailure = "[Workshops] Tags failure",

    ArticlePageRequest = "[Workshops] Article page request",
    ArticlePageSuccess = "[Workshops] Article page success",
    ArticlePageFailure = "[Workshops] Article page failure",

    ArticleCommentsRequest = "[Workshops] Article comments request",
    ArticleCommentsSuccess = "[Workshops] Article comments success",
    ArticleCommentsFailure = "[Workshops] Article comments failure"
}

export class ArticlesRequest implements Action {
    readonly type = WorkshopsActionTypes.ArticlesRequest;
    constructor(public payload: any) {}
}
export class ArticlesSuccess implements Action {
    readonly type = WorkshopsActionTypes.ArticlesSuccess;
    constructor(public payload: { articles: Array<Article> }) {}
}
export class ArticlesFailure implements Action {
    readonly type = WorkshopsActionTypes.ArticlesFailure;
    constructor(public payload: any) {}
}
export class TagsRequest implements Action {
    readonly type = WorkshopsActionTypes.TagsRequest;
}
export class TagsSuccess implements Action {
    readonly type = WorkshopsActionTypes.TagsSuccess;
    constructor(public payload: { tags: Array<Tag> }) {}
}
export class TagsFailure implements Action {
    readonly type = WorkshopsActionTypes.TagsFailure;
    constructor(public payload: any) {}
}
export class ArticlePageRequest implements Action {
    readonly type = WorkshopsActionTypes.ArticlePageRequest;
    constructor(public payload: any) {}
}
export class ArticlePageSuccess implements Action {
    readonly type = WorkshopsActionTypes.ArticlePageSuccess;
    constructor(public payload: { article: Article }) {}
}
export class ArticlePageFailure implements Action {
    readonly type = WorkshopsActionTypes.ArticlePageFailure;
    constructor(public payload: any) {}
}

export class ArticleCommentsRequest implements Action {
    readonly type = WorkshopsActionTypes.ArticleCommentsRequest;
    constructor(public payload: { id: string }) {}
}
export class ArticleCommentsSuccess implements Action {
    readonly type = WorkshopsActionTypes.ArticleCommentsSuccess;
    constructor(public payload: any) {}
}
export class ArticleCommentsFailure implements Action {
    readonly type = WorkshopsActionTypes.ArticleCommentsFailure;
    constructor(public payload: any) {}
}

export type WorkshopsActions =
    | ArticlesRequest
    | ArticlesSuccess
    | ArticlesFailure
    | TagsRequest
    | TagsSuccess
    | TagsFailure
    | ArticlePageRequest
    | ArticlePageSuccess
    | ArticlePageFailure
    | ArticleCommentsRequest
    | ArticleCommentsSuccess
    | ArticleCommentsFailure;
