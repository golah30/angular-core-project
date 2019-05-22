import { Component, OnInit, Input } from "@angular/core";

@Component({
    selector: "acp-tab",
    templateUrl: "./tab.component.pug",
    styleUrls: ["./tab.component.scss"]
})
export class TabComponent implements OnInit {
    constructor() {}
    @Input("title") title: string;
    @Input() active: boolean = false;
    ngOnInit() {}
}
