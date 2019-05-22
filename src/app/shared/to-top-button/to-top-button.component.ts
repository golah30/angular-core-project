import { Component, OnInit, Input } from "@angular/core";

@Component({
    selector: "acp-to-top-button",
    templateUrl: "./to-top-button.component.pug",
    styleUrls: ["./to-top-button.component.scss"]
})
export class ToTopButtonComponent implements OnInit {
    @Input() active: boolean;
    constructor() {}

    ngOnInit() {}
}
