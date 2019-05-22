import { Component, OnInit, Input } from "@angular/core";
interface Comment {
    username: string;
    text: string;
}
@Component({
    selector: "acp-comment-card",
    templateUrl: "./comment-card.component.pug",
    styleUrls: ["./comment-card.component.scss"]
})
export class CommentCardComponent implements OnInit {
    @Input() comment: Comment;
    constructor() {}

    ngOnInit() {}
}
