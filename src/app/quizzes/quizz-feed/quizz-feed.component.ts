import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AppState } from "src/app/reducers";
import { Store } from "@ngrx/store";
import { QuizzesRequest } from "../store/quizzes.actions";
import { selectQuizzes } from "../store/quizzes.selectors";
@Component({
    selector: "acp-quizz-feed",
    templateUrl: "./quizz-feed.component.pug",
    styleUrls: ["./quizz-feed.component.scss"]
})
export class QuizzFeedComponent implements OnInit, OnDestroy {
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private store: Store<AppState>
    ) {}
    quizzes: any = [];
    loading: boolean = true;
    quizSub: Subscription;

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
    }
    ngOnDestroy() {
        this.quizSub.unsubscribe();
    }
}
