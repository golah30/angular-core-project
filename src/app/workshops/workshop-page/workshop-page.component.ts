import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Article } from "../../interfaces";
import { TagsService } from "src/app/service/tags/tags.service";

@Component({
    selector: "acp-workshop-page",
    templateUrl: "./workshop-page.component.pug",
    styleUrls: ["./workshop-page.component.scss"]
})
export class WorkshopPageComponent implements OnInit {
    article: Article;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private TagsService: TagsService
    ) {}
    tags: Array<string> = [];
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
        this.TagsService.getTags().subscribe(data => {
            this.tags = this.article.tags.map(t => {
                let name: string = "";
                data.forEach(e => {
                    if (e.seq === t) {
                        name = e.name;
                    }
                });
                return name;
            });
        });
    }
    ngOnInit() {
        this.route.data.subscribe(data => {
            if (!data.article.error) {
                this.article = data.article;
                this.getTags();
            } else {
                this.router.navigate(["/404"]);
            }
        });
    }
}
