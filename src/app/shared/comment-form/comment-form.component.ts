import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Comment } from "../../interfaces";

@Component({
    selector: "acp-comment-form",
    templateUrl: "./comment-form.component.pug",
    styleUrls: ["./comment-form.component.scss"]
})
export class CommentFormComponent implements OnInit {
    constructor() {}

    @Input() comment: Comment;
    @Output() submit = new EventEmitter<any>();
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
    autosize(e) {
        setTimeout(function() {
            e.target.style.cssText = "height:auto; padding:0";
            e.target.style.cssText = "height:" + e.target.scrollHeight + "px";
        }, 0);
    }
    onSubmit(): void {
        if (this.comment.id) {
            this.submit.emit({
                id: this.comment.id,
                text: this.inputControl.value
            });
            this.inputControl.reset();
        } else {
            if (this.inputControl.value) {
                this.submit.emit({
                    text: this.inputControl.value
                });
                this.inputControl.reset();
            } else {
                this.errmsg = "enter some data";
            }
        }
    }
}
