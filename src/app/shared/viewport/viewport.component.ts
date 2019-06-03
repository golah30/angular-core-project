import { Component, ViewChild, ElementRef } from "@angular/core";

@Component({
    selector: "acp-viewport",
    templateUrl: "./viewport.component.pug",
    styleUrls: ["./viewport.component.scss"]
})
export class ViewportComponent {
    constructor() {}
    @ViewChild("scroll") _scrollEl: ElementRef;
}
