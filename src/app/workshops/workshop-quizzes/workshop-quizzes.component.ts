import { Component, OnInit, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/reducers";
import { Subscription } from "rxjs";
import { selectArticle } from "../store/workshops.selectors";
import { Article } from "src/app/interfaces";
import { QuizzesRequest } from "src/app/quizzes/store/quizzes.actions";
import { selectQuizzes } from "src/app/quizzes/store/quizzes.selectors";

@Component({
    selector: "acp-workshop-quizzes",
    templateUrl: "./workshop-quizzes.component.pug",
    styleUrls: ["./workshop-quizzes.component.scss"]
})
export class WorkshopQuizzesComponent implements OnInit, OnDestroy {
    constructor(private store: Store<AppState>) {}
    articleSub: Subscription;
    quizzesSub: Subscription;
    quizzes: Array<any>;
    currentPost: Article;
    ngOnInit() {
        this.articleSub = this.store
            .select(selectArticle)
            .subscribe((data: Article) => {
                this.currentPost = data;
                this.store.dispatch(
                    new QuizzesRequest({ postId: this.currentPost.id })
                );
            });
        this.quizzesSub = this.store
            .select(selectQuizzes)
            .subscribe((data: any) => {
                this.quizzes = data;
            });
    }
    ngOnDestroy() {
        this.articleSub.unsubscribe();
        this.quizzesSub.unsubscribe();
    }
}
