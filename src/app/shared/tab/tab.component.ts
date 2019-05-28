import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "acp-tab",
    templateUrl: "./tab.component.pug",
    styleUrls: ["./tab.component.scss"]
})
export class TabComponent implements OnInit {
    constructor(private router: Router) {}
    @Input("title") title: string;
    @Input() active: boolean = false;
    @Input() link: string;
    ngOnInit() {}
}
