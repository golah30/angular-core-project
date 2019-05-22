import { Component, OnInit, Input } from "@angular/core";

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
    @Input() tags: Array<string>;
    @Input() routeId: string;
    @Input() date: string;
    routePath: string;
    constructor() {}
    likeToggle() {
        this.isFavorite = !this.isFavorite;
    }
    ngOnInit() {
        this.routePath = `/workshops/${this.routeId}`;
    }
}
