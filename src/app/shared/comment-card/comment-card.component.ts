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
    constructor() {}
    delete() {
        console.log("pre");

        this.onDelete.emit(this.comment.id);
    }
    ngOnInit() {}
}
