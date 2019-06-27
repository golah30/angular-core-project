import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { UserService } from "../../service/user/user.service";
import { User, Tag } from "../../interfaces";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/reducers";
import { selectTags } from "../store/workshops.selectors";

@Component({
    selector: "acp-article",
    templateUrl: "./article.component.pug",
    styleUrls: ["./article.component.scss"]
})
export class ArticleComponent implements OnInit, OnDestroy {
    @Input() title: string;
    @Input() image: string;
    @Input() description: string;
    @Input() isFavorite: boolean;
    @Input() isLike: boolean;
    @Input() tags: Array<number | string>;
    @Input() routeId: string;
    @Input() date: string;
    @Input() likes: number;
    @Input() stars: number;
    @Input() author: string;
    routePath: string;
    userName: string = "";
    tagsSub: Subscription;
    constructor(
        private UserService: UserService,
        private store: Store<AppState>
    ) {}
    favoriteToggle() {
        this.isFavorite = !this.isFavorite;

        if (this.isFavorite) {
            this.stars++;
        } else {
            this.stars--;
        }
    }
    likeToggle() {
        this.isLike = !this.isLike;

        if (this.isLike) {
            this.likes++;
        } else {
            this.likes--;
        }
    }
    ngOnInit() {
        this.UserService.getUserById(this.author).subscribe((data: User) => {
            this.userName =
                data.firstName && data.lastName
                    ? `${data.firstName} ${data.lastName}`
                    : data.username;
        });
        this.tagsSub = this.store
            .select(selectTags)
            .subscribe((data: Array<Tag>) => {
                this.tags = this.tags.map(t => {
                    let name: string = "";
                    data.forEach(e => {
                        if (e.seq === t) {
                            name = e.name;
                        }
                    });
                    return name;
                });
            });
        this.routePath = `/workshops/${this.routeId}`;
    }
    ngOnDestroy() {
        this.tagsSub.unsubscribe();
    }
}
