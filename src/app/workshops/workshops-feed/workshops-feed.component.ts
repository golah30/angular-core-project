import { Component, OnInit } from "@angular/core";
import { Tag, Article } from "../../interfaces";
import { TAGS, ARTICLES } from "../../../data";

@Component({
    selector: "acp-workshops-feed",
    templateUrl: "./workshops-feed.component.pug",
    styleUrls: ["./workshops-feed.component.scss"]
})
export class WorkshopsFeedComponent implements OnInit {
    constructor() {}
    tags: Array<Tag> = TAGS;
    articles: Array<Article> = ARTICLES;
    onTagSelect(tag: string): void {
        this.tags.forEach(t => {
            if (t.name === tag) {
                t.isActive = !t.isActive;
            }
        });
    }
    ngOnInit() {}
}
