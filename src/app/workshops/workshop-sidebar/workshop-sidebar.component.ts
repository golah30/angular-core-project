import { Component, OnInit } from "@angular/core";

@Component({
    selector: "acp-workshop-sidebar",
    templateUrl: "./workshop-sidebar.component.pug",
    styleUrls: ["./workshop-sidebar.component.scss"]
})
export class WorkshopSidebarComponent implements OnInit {
    constructor() {}
    isSideContent: boolean = false;
    toggleSideContent(): void {
        this.isSideContent = !this.isSideContent;
        if (this.link === "comments") {
            this.link = null;
        } else {
            this.link = "comments";
        }
    }
    link: string | null = "comments";
    ngOnInit() {}
}
