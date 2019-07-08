import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AppState } from "src/app/reducers";
import { Store } from "@ngrx/store";
import { QuizzPageRequest } from "../store/quizzes.actions";
import { selectQuiz } from "../store/quizzes.selectors";
import { Subscription } from "rxjs";
import { UserService } from "src/app/service/user/user.service";
import { User } from "src/app/interfaces";
import { QuizzesService } from "src/app/service/quizzes/quizzes.service";
import { ModalMessageService } from "src/app/core/modal-message/modal-message.service";

@Component({
    selector: "acp-quizz-page",
    templateUrl: "./quizz-page.component.pug",
    styleUrls: ["./quizz-page.component.scss"]
})
export class QuizzPageComponent implements OnInit, OnDestroy {
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private store: Store<AppState>,
        private UserService: UserService,
        private QuizzesService: QuizzesService,
        private modalService: ModalMessageService
    ) {}

    quiz: any;
    config: any;
    loading: boolean = true;
    quizSub: Subscription;
    userName: string = "";
    ngOnInit() {
        this.store.dispatch(
            new QuizzPageRequest({ id: this.route.snapshot.params.id })
        );

        this.quizSub = this.store.select(selectQuiz).subscribe((data: any) => {
            if (data) {
                this.quiz = data;
                this.getAuthor(this.quiz.author);
                this.config = this.quiz.questions.map((c, i) => {
                    if (c.questionType === "input") {
                        return {
                            type: c.questionType,
                            name: `${i}`,
                            title: `${i + 1}. ` + c.question
                        };
                    } else {
                        return {
                            name: `${i}`,
                            type: c.questionType,
                            variants: c.answerVariants,
                            title: `${i + 1}. ` + c.question
                        };
                    }
                });
                this.loading = false;
            }
        });
    }
    getAuthor(id) {
        this.UserService.getUserById(id).subscribe((data: User) => {
            this.userName =
                data.firstName && data.lastName
                    ? `${data.firstName} ${data.lastName}`
                    : data.username;
        });
    }
    ngOnDestroy() {
        this.quizSub && this.quizSub.unsubscribe();
    }
    onSubmit(value: any) {
        this.QuizzesService.validateResult(this.quiz.id, value).subscribe(
            data => {
                let result = true;
                data.results.forEach(element => {
                    if (!element) {
                        result = false;
                    }
                });
                this.modalService.modal({
                    type: result ? "correct" : "error",
                    message: data.message
                });
            }
        );
    }
}
