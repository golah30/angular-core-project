import { Component, OnInit, OnDestroy } from "@angular/core";
import { Tag, Article, User } from "../../interfaces";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { WorkshopsService } from "../../service/workshops/workshops.service";
import { AppState } from "src/app/reducers";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { selectTags, selectArticles } from "../store/workshops.selectors";
import {
    TagsRequest,
    ArticlesSuccess,
    ArticlesRequest
} from "../store/workshops.actions";
import { selectAuthUser } from "src/app/auth/store/auth.selectors";
@Component({
    selector: "acp-workshops-feed",
    templateUrl: "./workshops-feed.component.pug",
    styleUrls: ["./workshops-feed.component.scss"]
})
export class WorkshopsFeedComponent implements OnInit, OnDestroy {
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private WorkshopsService: WorkshopsService,
        private store: Store<AppState>
    ) {}

    tagsSub: Subscription;
    articlesSub: Subscription;
    userSub: Subscription;
    tags: Array<Tag>;
    articles: Array<Article>;
    currentUser: User;
    userid = 178;
    categories: Array<any> = [
        { name: "All" },
        { name: "Favorite" },
        { name: "My Workshops" }
    ];
    range: Array<number> | number;
    count: boolean = false;
    loading: boolean = true;
    page: number = 0;
    ngOnInit() {
        this.store.dispatch(new TagsRequest());
        this.tagsSub = this.store
            .select(selectTags)
            .subscribe((data: Array<Tag>) => {
                this.tags = data;
                this.loading = false;
            });
        this.articlesSub = this.store
            .select(selectArticles)
            .subscribe((data: Array<Article>) => {
                this.articles = data;
                this.range = data.length;
                this.count = data.length !== 0;
            });
        this.userSub = this.store
            .select(selectAuthUser)
            .subscribe((data: User) => {
                this.currentUser = data;
            });
        this.route.queryParamMap.subscribe(params => {
            this.onParamsChange(params);
        });
    }
    ngOnDestroy() {
        this.tagsSub.unsubscribe();
        this.articlesSub.unsubscribe();
        this.userSub.unsubscribe();
    }
    setQueryParams(tags: Array<number>, ctgs: Array<number>) {
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: {
                tags: tags && tags.length ? tags.toString() : null,
                categories: ctgs && ctgs.length ? ctgs.toString() : null
            },
            queryParamsHandling: "merge"
        });
    }
    onTagSelect(id: number): void {
        let paramsTags: Array<number> | null = null;
        let paramsCtgs: Array<number> | null = null;

        if (this.route.snapshot.queryParamMap.get("tags")) {
            paramsTags = JSON.parse(
                `[${this.route.snapshot.queryParamMap.get("tags")}]`
            );
        }
        if (paramsTags) {
            let newtags = paramsTags.filter(e => e !== id);
            if (newtags.length === paramsTags.length) {
                newtags.push(id);
            }
            paramsTags = newtags;
        } else {
            paramsTags = [id];
        }
        if (this.route.snapshot.queryParamMap.get("categories")) {
            paramsCtgs = JSON.parse(
                `[${this.route.snapshot.queryParamMap.get("categories")}]`
            );
        }
        if (paramsTags.length && paramsCtgs && paramsCtgs[0] === 0) {
            paramsCtgs = [];
        }
        this.page = 0;
        this.setQueryParams(paramsTags, paramsCtgs);
    }

    onCategorySelect(id: number): void {
        this.route.snapshot.queryParamMap;
        let paramsTags: Array<number> | null = null;
        let paramsCtgs: Array<number> | null = null;

        if (this.route.snapshot.queryParamMap.get("tags")) {
            paramsTags = JSON.parse(
                `[${this.route.snapshot.queryParamMap.get("tags")}]`
            );
        }
        if (this.route.snapshot.queryParamMap.get("categories")) {
            paramsCtgs = JSON.parse(
                `[${this.route.snapshot.queryParamMap.get("categories")}]`
            );
        }
        if (paramsCtgs && paramsCtgs[0] === id) {
            paramsCtgs = paramsTags ? [] : [0];
        } else {
            paramsCtgs = [id];
        }
        if (paramsCtgs[0] === 0) {
            paramsTags = [];
        }
        this.page = 0;
        this.setQueryParams(paramsTags, paramsCtgs);
    }

    onParamsChange(params: Params) {
        let paramsTags: string | null = params.get("tags");
        let paramsCtgs: string | null = params.get("categories");
        if (paramsTags) {
            paramsTags = paramsTags.replace(/,/g, "|");
        }
        if (paramsCtgs) {
            if (paramsCtgs === "0") {
                this.store.dispatch(
                    new ArticlesRequest({ page: this.page, tags: "" })
                );
            }
            if (paramsCtgs === "1") {
                this.store.dispatch(
                    new ArticlesRequest({ page: this.page, tags: paramsTags })
                );
            }
            if (paramsCtgs === "2") {
                this.store.dispatch(
                    new ArticlesRequest({
                        page: this.page,
                        tags: paramsTags,
                        author: this.currentUser._id
                    })
                );
            }
        } else {
            if (paramsTags) {
                this.store.dispatch(
                    new ArticlesRequest({
                        page: this.page,
                        tags: paramsTags
                    })
                );
            } else {
                this.onCategorySelect(0);
            }
        }
    }
    onArticleDelete(id: string) {
        this.WorkshopsService.deletePost(id).subscribe((data: any) => {
            this.onParamsChange(this.route.snapshot.queryParamMap);
        });
    }
    onPrevPage(): void {
        if (this.page) {
            this.page = this.page - 1;
            this.onParamsChange(this.route.snapshot.queryParamMap);
        }
    }
    onNextPage(): void {
        this.page = this.page + 1;
        this.onParamsChange(this.route.snapshot.queryParamMap);
    }
}
