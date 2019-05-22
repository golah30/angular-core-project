import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormControl } from "@angular/forms";
interface Comment {
    id: string;
    username: string;
    text: string;
}
@Component({
    selector: "acp-comment-form",
    templateUrl: "./comment-form.component.pug",
    styleUrls: ["./comment-form.component.scss"]
})
export class CommentFormComponent implements OnInit {
    constructor() {}

    @Input() comment: Comment;
    @Output() submit = new EventEmitter<Comment>();
    inputControl: FormControl;
    errmsg: string = "";
    ngOnInit() {
        this.inputControl = new FormControl(
            this.comment.id ? this.comment.text : ""
        );
    }
    focus(): void {
        this.errmsg = "";
    }
    onSubmit(): void {
        if (this.comment.id) {
            this.submit.emit({
                id: this.comment.id,
                text: this.inputControl.value,
                username: this.comment.username
            });
        } else {
            if (this.inputControl.value) {
                this.submit.emit({
                    id: "",
                    text: this.inputControl.value,
                    username: "user abuser"
                });
            } else {
                this.errmsg = "enter some data";
            }
        }
    }
}
