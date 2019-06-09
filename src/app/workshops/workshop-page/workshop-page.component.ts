import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Article } from "../../interfaces";

@Component({
    selector: "acp-workshop-page",
    templateUrl: "./workshop-page.component.pug",
    styleUrls: ["./workshop-page.component.scss"]
})
export class WorkshopPageComponent implements OnInit {
    article: Article;
    constructor(private route: ActivatedRoute, private router: Router) {}
    likeToggle() {
        this.article.isLike = !this.article.isLike;
        if (this.article.isLike) {
            this.article.likes++;
        } else {
            this.article.likes--;
        }
    }
    favoriteToggle() {
        this.article.isFavorite = !this.article.isFavorite;
        if (this.article.isFavorite) {
            this.article.stars++;
        } else {
            this.article.stars--;
        }
    }

    ngOnInit() {
        this.route.data.subscribe(data => {
            if (!data.article.error) {
                this.article = data.article;
            } else {
                this.router.navigate(["/404"]);
            }
        });
    }
}
