import { Component, OnInit, Input } from "@angular/core";

@Component({
    selector: "acp-timestamp",
    templateUrl: "./timestamp.component.pug",
    styleUrls: ["./timestamp.component.scss"]
})
export class TimestampComponent implements OnInit {
    @Input("date") inputDate: Date;
    transformedDate: string;
    constructor() {}

    ngOnInit() {}
}
