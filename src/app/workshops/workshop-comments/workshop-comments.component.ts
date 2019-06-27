import { Component, OnInit, OnDestroy } from "@angular/core";
import { Comment, Article, User } from "../../interfaces";
import { UserService } from "src/app/service/user/user.service";
import { CommentsService } from "src/app/service/comments/comments.service";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/reducers";
import { Subscription } from "rxjs";
import { selectAuthUser } from "src/app/auth/store/auth.selectors";
import { selectArticle, selectComments } from "../store/workshops.selectors";
import { ArticleCommentsRequest } from "../store/workshops.actions";

@Component({
    selector: "acp-workshop-comments",
    templateUrl: "./workshop-comments.component.pug",
    styleUrls: ["./workshop-comments.component.scss"]
})
export class WorkshopCommentsComponent implements OnInit, OnDestroy {
    constructor(
        private UserService: UserService,
        private CommentService: CommentsService,
        private store: Store<AppState>
    ) {}
    currentPost: Article;
    currentUser: User;
    comments: Array<Comment> = [];
    comment = {
        id: "",
        username: "",
        text: "",
        author: "U312",
        date: new Date()
    };
    userSub: Subscription;
    commentSub: Subscription;
    articleSub: Subscription;
    submit(comment: Comment) {
        this.CommentService.createComment(
            this.currentPost.id,
            comment
        ).subscribe((data: any) => {
            let comment = data.comment;
            comment.user = this.currentUser;
            this.comments.push(comment);
        });
    }
    onEdit(comment: Comment) {
        this.CommentService.updateComment(this.currentPost.id, comment.id, {
            text: comment.text
        }).subscribe((data: any) => {
            let comment = data.comment;
            comment.user = this.currentUser;

            this.comments = this.comments.map(c => {
                if (c.id === comment.id) {
                    return comment;
                } else {
                    return c;
                }
            });
        });
    }
    onDelete(id: string) {
        this.CommentService.deleteComment(this.currentPost.id, id).subscribe(
            data => {
                this.comments = this.comments.filter(c => c.id !== id);
            }
        );
    }
    getAuthors() {
        this.comments.forEach((e, i) => {
            this.UserService.getUserById(e._author).subscribe((data: User) => {
                this.comments[i].user = data;
            });
        });
    }
    ngOnInit() {
        this.userSub = this.store
            .select(selectAuthUser)
            .subscribe((data: User) => {
                this.currentUser = data;
            });
        this.articleSub = this.store
            .select(selectArticle)
            .subscribe((data: Article) => {
                this.currentPost = data;

                this.store.dispatch(
                    new ArticleCommentsRequest({ id: this.currentPost.id })
                );
            });
        this.commentSub = this.store
            .select(selectComments)
            .subscribe((data: Array<Comment>) => {
                if (data.length > 0) {
                    this.comments = data;
                    this.getAuthors();
                }
            });
    }
    ngOnDestroy() {
        this.articleSub.unsubscribe();
        this.userSub.unsubscribe();
        this.commentSub.unsubscribe();
    }
}
