import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";

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
    @Input() tags: Array<string>;
    @Input() routeId: string;
    @Input() date: string;
    @Input() likes: number;
    @Input() stars: number;
    @Input() author: string;
    routePath: string;
    constructor(private router: Router) {}
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
        this.routePath = `/workshops/${this.routeId}`;
    }
}
