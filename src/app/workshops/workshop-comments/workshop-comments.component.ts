import { Component, OnInit } from "@angular/core";
import { Comment, Article, User } from "../../interfaces";
import { UserService } from "src/app/service/user/user.service";
import { CommentsService } from "src/app/service/comments/comments.service";
import { WorkshopsService } from "src/app/service/workshops/workshops.service";

@Component({
    selector: "acp-workshop-comments",
    templateUrl: "./workshop-comments.component.pug",
    styleUrls: ["./workshop-comments.component.scss"]
})
export class WorkshopCommentsComponent implements OnInit {
    constructor(
        private UserService: UserService,
        private CommentService: CommentsService,
        private WorkshopsService: WorkshopsService
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
        this.UserService.getCurrentUser().subscribe((data: User) => {
            this.currentUser = data;
        });
        this.currentPost = this.WorkshopsService.getCurrentPost();
        this.CommentService.getCommentsByPostId(this.currentPost.id).subscribe(
            (data: Array<Comment>) => {
                this.comments = data;
                this.getAuthors();
            }
        );
    }
}
