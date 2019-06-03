import { Component, OnInit, Input } from "@angular/core";

@Component({
    selector: "acp-svglogo",
    templateUrl: "./svglogo.component.pug",
    styleUrls: ["./svglogo.component.scss"]
})
export class SvglogoComponent implements OnInit {
    @Input() isDark: boolean;
    constructor() {}

    ngOnInit() {}
}
