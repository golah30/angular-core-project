import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { TagsService } from "../../service/tags/tags.service";
import { UserService } from "../../service/user/user.service";
import { User } from "../../interfaces";

@Component({
    selector: "acp-article",
    templateUrl: "./article.component.pug",
    styleUrls: ["./article.component.scss"]
})
export class ArticleComponent implements OnInit {
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
    constructor(
        private router: Router,
        private TagsService: TagsService,
        private UserService: UserService
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
            this.userName = data.username;
        });
        this.TagsService.getTags().subscribe(data => {
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
}
