import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Article, User } from "../../interfaces";
import { TagsService } from "src/app/service/tags/tags.service";
import { UserService } from "src/app/service/user/user.service";

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
        private TagsService: TagsService,
        private UserService: UserService
    ) {}
    tags: Array<string> = [];
    userName: string = "";
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
    getUser() {
        this.UserService.getUserById(this.article._author).subscribe(
            (data: User) => {
                this.userName = data.username;
            }
        );
    }
    ngOnInit() {
        this.route.data.subscribe(data => {
            if (!data.article.error) {
                this.article = data.article;
                this.getTags();
                this.getUser();
            } else {
                this.router.navigate(["/404"]);
            }
        });
    }
}
