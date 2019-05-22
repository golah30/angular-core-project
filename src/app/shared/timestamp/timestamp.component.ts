import { Component, OnInit, Input } from "@angular/core";

@Component({
    selector: "acp-timestamp",
    templateUrl: "./timestamp.component.pug",
    styleUrls: ["./timestamp.component.scss"]
})
export class TimestampComponent implements OnInit {
    @Input() date: Date;
    transformedDate: string;

    constructor() {}

    ngOnInit() {
        let day: string =
            this.date.getDate() < 10
                ? "0" + this.date.getDate().toString()
                : this.date.getDate().toString();
        let mounth: string | number =
            this.date.getMonth() < 10
                ? "0" + (this.date.getMonth() + 1)
                : this.date.getMonth() + 1;
        this.transformedDate = `${day}.${mounth}.${this.date.getFullYear()}`;
    }
}
