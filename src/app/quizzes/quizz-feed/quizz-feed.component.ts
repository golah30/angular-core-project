import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: "acp-quizz-feed",
    templateUrl: "./quizz-feed.component.pug",
    styleUrls: ["./quizz-feed.component.scss"]
})
export class QuizzFeedComponent implements OnInit {
    constructor(private route: ActivatedRoute, private router: Router) {}
    quizzes: any = [];
    ngOnInit() {
        this.route.data.subscribe(data => {
            this.quizzes = data.quizzes;
        });
    }
}
