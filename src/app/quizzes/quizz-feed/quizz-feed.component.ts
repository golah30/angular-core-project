import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AppState } from "src/app/reducers";
import { Store } from "@ngrx/store";
import { QuizzesRequest } from "../store/quizzes.actions";
import { selectQuizzes } from "../store/quizzes.selectors";
import { selectAuthUser } from "src/app/auth/store/auth.selectors";
import { User } from "src/app/interfaces";
import { QuizzesService } from "src/app/service/quizzes/quizzes.service";
import { ConfirmPopupService } from "src/app/core/confirm-popup/confirm-popup.service";

@Component({
    selector: "acp-quizz-feed",
    templateUrl: "./quizz-feed.component.pug",
    styleUrls: ["./quizz-feed.component.scss"]
})
export class QuizzFeedComponent implements OnInit, OnDestroy {
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private store: Store<AppState>,
        private QuizzesService: QuizzesService,
        private confirmPopupService: ConfirmPopupService
    ) {}

    quizzes: any = [];
    loading: boolean = true;
    quizSub: Subscription;
    currentUser: User;
    user$;
    ngOnInit() {
        this.store.dispatch(new QuizzesRequest({}));
        this.quizSub = this.store
            .select(selectQuizzes)
            .subscribe((data: Array<any>) => {
                if (data.length) {
                    this.quizzes = data;
                    this.loading = false;
                }
            });
        this.user$ = this.store.select(selectAuthUser);
    }

    ngOnDestroy() {
        this.quizSub.unsubscribe();
    }
    onQuizDelete(id: string) {
        this.confirmPopupService
            .confirm({
                title: "Delete quiz",
                message: "Do you want to delete this quiz?"
            })
            .subscribe((confirmed: boolean) => {
                this.deleteQuiz(id);
            });
    }
    private deleteQuiz(id) {
        this.QuizzesService.deleteQuizz(id).subscribe(data => {
            this.store.dispatch(new QuizzesRequest({}));
        });
    }
    onQuizEdit(id: string) {}
}
