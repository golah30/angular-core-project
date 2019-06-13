import { Component, OnInit, OnDestroy } from "@angular/core";
import { Tag, Article, User } from "../../interfaces";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { WorkshopsService } from "../../service/workshops/workshops.service";
import { TagsService } from "../../service/tags/tags.service";
import { UserService } from "src/app/service/user/user.service";
@Component({
    selector: "acp-workshops-feed",
    templateUrl: "./workshops-feed.component.pug",
    styleUrls: ["./workshops-feed.component.scss"]
})
export class WorkshopsFeedComponent implements OnInit, OnDestroy {
    constructor(
        private WorkshopsService: WorkshopsService,
        private TagsService: TagsService,
        private UserService: UserService,
        private route: ActivatedRoute,
        private router: Router
    ) {}
    tags: Array<Tag>;
    categories: Array<any> = [
        { name: "All" },
        { name: "Favorite" },
        { name: "My Workshops" }
    ];
    range: Array<number> | number;
    articles: Array<Article> = [];
    userid: string = "178";
    count: boolean = false;
    loading: boolean = true;
    currentUser: User;
    ngOnInit() {
        this.UserService.getCurrentUser().subscribe((data: User) => {
            this.currentUser = data;
        });
        this.TagsService.getTags().subscribe(data => {
            this.tags = data;
            this.loading = false;
        });

        this.route.queryParamMap.subscribe(params => {
            this.onParamsChange(params);
        });
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
        this.setQueryParams(paramsTags, paramsCtgs);
    }

    ngOnDestroy() {}
    onParamsChange(params: Params) {
        let paramsTags: Array<number> | null = params.get("tags");
        let paramsCtgs: string | null = params.get("categories");
        if (paramsTags) {
            paramsTags = JSON.parse(`[${paramsTags}]`);
        }
        if (paramsCtgs) {
            if (paramsCtgs === "0") {
                this.WorkshopsService.getPosts(1).subscribe(data => {
                    this.articles = data;
                    this.range = this.articles.length;
                    this.count = this.articles.length !== 0;
                });
            }
            if (paramsCtgs === "1") {
                this.WorkshopsService.getFavorite(1, paramsTags).subscribe(
                    data => {
                        console.log(data);
                        this.articles = data;
                        this.range = this.articles.length;
                        this.count = this.articles.length !== 0;
                    }
                );
            }
            if (paramsCtgs === "2") {
                this.WorkshopsService.getUserPosts(
                    1,
                    paramsTags,
                    this.currentUser._id
                ).subscribe(data => {
                    this.articles = data;
                    this.range = this.articles.length;
                    this.count = this.articles.length !== 0;
                });
            }
        } else {
            if (paramsTags) {
                this.WorkshopsService.getPosts(1, paramsTags).subscribe(
                    data => {
                        this.articles = data;
                        this.range = this.articles.length;
                        this.count = this.articles.length !== 0;
                    }
                );
            } else {
                this.onCategorySelect(0);
            }
        }
    }
}
