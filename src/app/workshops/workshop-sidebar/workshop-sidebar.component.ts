import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
interface Tab {
    title: string;
    link: any;
}
@Component({
    selector: "acp-workshop-sidebar",
    templateUrl: "./workshop-sidebar.component.pug",
    styleUrls: ["./workshop-sidebar.component.scss"]
})
export class WorkshopSidebarComponent implements OnInit {
    constructor(private route: ActivatedRoute) {}
    isSideContent: boolean = false;
    toggleSideContent(): void {
        this.isSideContent = !this.isSideContent;
        if (this.link) {
            this.link = null;
        } else {
            this.link = this.route.firstChild.children[0].routeConfig.path;
        }
    }
    link: string | null = "comments";
    ngOnInit() {
        if (
            this.route.snapshot.firstChild &&
            this.route.firstChild.children[0] &&
            this.route.firstChild.children[0].routeConfig.path
        ) {
            this.link = null;
            this.isSideContent = true;
        } else {
            this.link = "comments";
        }
    }
    tabs: Array<Tab> = [
        {
            title: "Comments",
            link: [{ outlets: { aside: ["comments"] } }]
        },
        {
            title: "Quizzes",
            link: [{ outlets: { aside: ["quizzes"] } }]
        },
        {
            title: "Resources",
            link: [{ outlets: { aside: ["resources"] } }]
        }
    ];
}
