import { Component, OnInit } from "@angular/core";
import { Comment } from "../../interfaces";

@Component({
    selector: "acp-workshop-comments",
    templateUrl: "./workshop-comments.component.pug",
    styleUrls: ["./workshop-comments.component.scss"]
})
export class WorkshopCommentsComponent implements OnInit {
    constructor() {}

    comments: Array<Comment> = [
        {
            id: "12",
            username: "Some user name",
            text: "Lorem ipsum dolore",
            date: new Date()
        },
        {
            id: "14",
            username: "Some user name",
            text: "Lorem ipsum dolore",
            date: new Date()
        },
        {
            id: "15",
            username: "Some user name",
            text: "Lorem ipsum dolore",
            date: new Date()
        }
    ];
    comment: Comment = {
        id: "",
        username: "",
        text: "",
        date: new Date()
    };
    submit(comment: Comment) {
        console.log(comment);
        this.comments.unshift(comment);
        console.log("comment created");
    }
    onDelete(id: string) {
        console.log("deelte");

        this.comments = this.comments.filter(c => c.id !== id);
    }
    ngOnInit() {}
}
