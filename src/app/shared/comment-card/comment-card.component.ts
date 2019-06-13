import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Comment } from "../../interfaces";
@Component({
    selector: "acp-comment-card",
    templateUrl: "./comment-card.component.pug",
    styleUrls: ["./comment-card.component.scss"]
})
export class CommentCardComponent implements OnInit {
    @Input() comment: Comment;
    @Output() onDelete = new EventEmitter<string>();
    @Output() onEdit = new EventEmitter<Comment>();
    @Input() currentUserId: string;
    constructor() {}
    userCompare: boolean = false;
    isEdit: boolean = false;

    delete() {
        this.onDelete.emit(this.comment.id);
    }
    edit() {
        this.isEdit = !this.isEdit;
    }
    onCommentEdit(comment: Comment) {
        this.onEdit.emit(comment);
    }
    fullname() {
        let user = this.comment.user;
        return user.firstName && user.lastName
            ? user.firstName + " " + user.lastName
            : user.username;
    }
    ngOnInit() {
        this.userCompare = this.currentUserId === this.comment._author;
    }
}
