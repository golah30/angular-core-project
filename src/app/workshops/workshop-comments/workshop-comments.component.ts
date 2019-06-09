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
            username: "Some user",
            text: "Lorem ipsum dolore",
            date: new Date(),
            author: "U312"
        },
        {
            id: "14",
            username: "asdsssads wwss",
            text: "Lorem ipsum dolore",
            date: new Date(),
            author: "U312"
        },
        {
            id: "15",
            username: "Riko Mandella",
            text: "Lorem ipsum dolore",
            date: new Date(),
            author: "U32222"
        }
    ];
    comment: Comment = {
        id: "",
        username: "",
        text: "",
        author: "U312",
        date: new Date()
    };
    submit(comment: Comment) {
        console.log(comment);
        this.comments.unshift(comment);
        console.log("comment created");
    }
    onEdit(comment: Comment) {
        console.log(comment);

        this.comments = this.comments.map(c => {
            if (c.id === comment.id) {
                return comment;
            } else {
                return c;
            }
        });
    }
    onDelete(id: string) {
        console.log("deelte");

        this.comments = this.comments.filter(c => c.id !== id);
    }
    ngOnInit() {}
}
