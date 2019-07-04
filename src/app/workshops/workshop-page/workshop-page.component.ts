import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Article, User, Tag } from "../../interfaces";
import { TagsService } from "src/app/service/tags/tags.service";
import { UserService } from "src/app/service/user/user.service";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/reducers";
import { ArticlePageRequest, TagsRequest } from "../store/workshops.actions";
import { selectArticle, selectTags } from "../store/workshops.selectors";
import { Subscription } from "rxjs";

@Component({
    selector: "acp-workshop-page",
    templateUrl: "./workshop-page.component.pug",
    styleUrls: ["./workshop-page.component.scss"]
})
export class WorkshopPageComponent implements OnInit, OnDestroy {
    article: Article;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private TagsService: TagsService,
        private UserService: UserService,
        private store: Store<AppState>
    ) {}
    tags: Array<string> = [];
    allTags: Array<Tag>;
    loading: boolean = true;
    userName: string = "";
    pageSub: Subscription;
    tagsSub: Subscription;
    likeToggle() {
        // this.article.isLike = !this.article.isLike;
        // if (this.article.isLike) {
        //     this.article.likes++;
        // } else {
        //     this.article.likes--;
        // }
    }
    favoriteToggle() {
        // this.article.isFavorite = !this.article.isFavorite;
        // if (this.article.isFavorite) {
        //     this.article.stars++;
        // } else {
        //     this.article.stars--;
        // }
    }
    getTags() {
        if (this.allTags.length > 0) {
            this.tags = this.article.tags.map(t => {
                let name: string = "";
                this.allTags.forEach(e => {
                    if (e.seq === t) {
                        name = e.name;
                    }
                });
                return name;
            });
        }
    }
    getUser() {
        this.UserService.getUserById(this.article.author).subscribe(
            (data: User) => {
                this.userName =
                    data.firstName && data.lastName
                        ? `${data.firstName} ${data.lastName}`
                        : data.username;
            }
        );
    }
    ngOnInit() {
        this.store.dispatch(
            new ArticlePageRequest({ id: this.route.snapshot.params.id })
        );
        this.tagsSub = this.store
            .select(selectTags)
            .subscribe((data: Array<Tag>) => {
                if (data.length === 0) {
                    this.store.dispatch(new TagsRequest());
                }
                this.allTags = data;
            });
        this.pageSub = this.store
            .select(selectArticle)
            .subscribe((data: any) => {
                if (data) {
                    this.article = data;
                    this.article.isFavorite = false;
                    this.article.isLike = false;

                    if (this.article.id === this.route.snapshot.params.id) {
                        this.loading = false;
                    }

                    this.getTags();
                    this.getUser();
                }
                // if (data.error) {
                //     this.router.navigate(["/404"]);
                // } else {

                // }
            });
    }
    ngOnDestroy() {
        this.pageSub.unsubscribe();
        this.tagsSub.unsubscribe();
    }
}
