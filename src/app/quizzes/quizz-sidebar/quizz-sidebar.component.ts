import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: "acp-quizz-sidebar",
    templateUrl: "./quizz-sidebar.component.pug",
    styleUrls: ["./quizz-sidebar.component.scss"]
})
export class QuizzSidebarComponent implements OnInit {
    constructor(private route: ActivatedRoute) {}
    isSideContent: boolean = false;
    link: string | null = "construct";
    toggleSideContent(): void {
        this.isSideContent = !this.isSideContent;
        if (this.link) {
            this.link = null;
        } else {
            this.link = "construct";
        }
    }
    ngOnInit() {
        if (
            this.route.snapshot.firstChild &&
            this.route.firstChild.children[0] &&
            this.route.firstChild.children[0].routeConfig.path
        ) {
            this.link = null;
            this.isSideContent = true;
        } else {
            this.link = "construct";
        }
    }
}
