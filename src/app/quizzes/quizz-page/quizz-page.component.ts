import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: "acp-quizz-page",
    templateUrl: "./quizz-page.component.pug",
    styleUrls: ["./quizz-page.component.scss"]
})
export class QuizzPageComponent implements OnInit {
    constructor(private route: ActivatedRoute, private router: Router) {}

    quiz: any;
    config: any;
    ngOnInit() {
        this.route.data.subscribe(data => {
            if (!data.quiz.error) {
                this.quiz = data.quiz;
            } else {
                this.router.navigate(["/404"]);
            }
        });

        this.config = this.quiz.config.questions.map((c, i) => {
            return {
                type: c.questionType,
                name: `${i}`,
                title: `${i + 1}. ` + c.question
            };
        });
    }

    onSubmit(value: any) {
        console.log("submit", value);
    }
}
