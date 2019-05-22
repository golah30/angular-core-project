import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ARTICLES } from "../../../data";
import { Article } from "../../interfaces";
@Component({
    selector: "acp-workshop-page",
    templateUrl: "./workshop-page.component.pug",
    styleUrls: ["./workshop-page.component.scss"]
})
export class WorkshopPageComponent implements OnInit {
    article: Article;
    constructor(private route: ActivatedRoute) {
        this.route.params.subscribe(params => {
            this.article = ARTICLES.filter(
                article => article.id === params.id
            )[0];
        });
    }
    likeToggle() {
        this.article.isFavorite = !this.article.isFavorite;
    }
    ngOnInit() {}
}
