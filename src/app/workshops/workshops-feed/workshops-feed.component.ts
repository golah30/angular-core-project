import { Component, OnInit } from "@angular/core";
import { Tag, Article } from "../../interfaces";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
    selector: "acp-workshops-feed",
    templateUrl: "./workshops-feed.component.pug",
    styleUrls: ["./workshops-feed.component.scss"]
})
export class WorkshopsFeedComponent implements OnInit {
    constructor(private route: ActivatedRoute) {}
    tags: Array<Tag>;
    articles: Array<Article>;
    onTagSelect(tag: string): void {
        this.tags.forEach(t => {
            if (t.name === tag) {
                t.isActive = !t.isActive;
            }
        });
    }
    ngOnInit() {
        this.route.data.subscribe(data => {
            this.articles = data.workshops.articles;
            this.tags = data.workshops.tags;
        });
    }
}
