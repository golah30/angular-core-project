import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { WorkshopsService } from "src/app/service/workshops/workshops.service";
import {
    ArticlesRequest,
    WorkshopsActionTypes,
    ArticlesSuccess,
    ArticlesFailure,
    TagsRequest,
    TagsSuccess,
    TagsFailure,
    ArticlePageRequest,
    ArticlePageSuccess,
    ArticlePageFailure,
    ArticleCommentsRequest,
    ArticleCommentsSuccess,
    ArticleCommentsFailure
} from "./workshops.actions";
import { exhaustMap, map, catchError } from "rxjs/operators";
import { Article, Tag } from "src/app/interfaces";
import { of } from "rxjs";
import { TagsService } from "src/app/service/tags/tags.service";
import { CommentsService } from "src/app/service/comments/comments.service";

@Injectable()
export class WorkshopsEffects {
    constructor(
        private actions$: Actions,
        private WorkshopsService: WorkshopsService,
        private TagsService: TagsService,
        private CommentsService: CommentsService
    ) {}

    @Effect()
    articlesRequest$ = this.actions$.pipe(
        ofType<ArticlesRequest>(WorkshopsActionTypes.ArticlesRequest),
        map((action: ArticlesRequest) => action.payload),
        exhaustMap((payload: any) => {
            return this.WorkshopsService.getPosts(
                payload.page,
                payload.tags,
                payload.author
            ).pipe(
                map((data: any) => {
                    return new ArticlesSuccess({
                        articles: data.posts,
                        total: data.total
                    });
                }),
                catchError(error =>
                    of(new ArticlesFailure({ error: error.error.message }))
                )
            );
        })
    );

    @Effect()
    tagsRequest$ = this.actions$.pipe(
        ofType<TagsRequest>(WorkshopsActionTypes.TagsRequest),
        map((action: TagsRequest) => action),
        exhaustMap((action: any) => {
            return this.TagsService.getTags().pipe(
                map((data: Array<Tag>) => {
                    return new TagsSuccess({ tags: data });
                }),
                catchError(error =>
                    of(new TagsFailure({ error: error.error.message }))
                )
            );
        })
    );

    @Effect()
    articlePageRequest$ = this.actions$.pipe(
        ofType<ArticlePageRequest>(WorkshopsActionTypes.ArticlePageRequest),
        map((action: ArticlePageRequest) => action.payload),
        exhaustMap((payload: any) => {
            return this.WorkshopsService.getPostById(payload.id).pipe(
                map((data: Article) => {
                    return new ArticlePageSuccess({ article: data });
                }),
                catchError(error =>
                    of(new ArticlePageFailure({ error: error.error.message }))
                )
            );
        })
    );

    @Effect()
    articleCommentsRequest$ = this.actions$.pipe(
        ofType<ArticleCommentsRequest>(
            WorkshopsActionTypes.ArticleCommentsRequest
        ),
        map((action: ArticleCommentsRequest) => action.payload),
        exhaustMap((payload: any) => {
            return this.CommentsService.getCommentsByPostId(payload.id).pipe(
                map((data: Array<Comment>) => {
                    return new ArticleCommentsSuccess({ comments: data });
                }),
                catchError(error =>
                    of(
                        new ArticleCommentsFailure({
                            error: error.error.message
                        })
                    )
                )
            );
        })
    );
}
