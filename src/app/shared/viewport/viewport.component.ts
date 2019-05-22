import { Component, OnInit } from "@angular/core";

@Component({
    selector: "acp-viewport",
    templateUrl: "./viewport.component.pug",
    styleUrls: ["./viewport.component.scss"]
})
export class ViewportComponent implements OnInit {
    constructor() {}
    isSideContent: boolean = true;
    toggleSideContent(): void {
        this.isSideContent = !this.isSideContent;
    }
    ngOnInit() {}
}
