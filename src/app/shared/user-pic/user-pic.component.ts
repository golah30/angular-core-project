import { Component, OnInit, Input, OnChanges } from "@angular/core";

@Component({
    selector: "acp-user-pic",
    templateUrl: "./user-pic.component.pug",
    styleUrls: ["./user-pic.component.scss"]
})
export class UserPicComponent implements OnInit, OnChanges {
    @Input() src: string;
    @Input() name: string;
    constructor() {}
    initials: string = "UU";
    isSrc: boolean;
    colormap: Array<string> = ["#fdd000"];
    ngOnInit() {
        this.isSrc = this.src !== "";
        let initials: string = "";
        let splited = this.name.split(" ");

        if (splited.length === 1) {
            this.initials = splited[0][0].toUpperCase();
        } else {
            splited.forEach(word => {
                initials += word[0].toUpperCase();
            });
            this.initials = initials;
        }
    }
    ngOnChanges() {
        this.isSrc = this.src !== "";
        let initials: string = "";
        let splited = this.name.split(" ");

        if (splited.length === 1) {
            this.initials = splited[0][0].toUpperCase();
        } else {
            splited.forEach(word => {
                initials += word[0].toUpperCase();
            });
            this.initials = initials;
        }
    }
}
