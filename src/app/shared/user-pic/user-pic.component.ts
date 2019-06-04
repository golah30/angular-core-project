import { Component, OnInit, Input } from "@angular/core";

@Component({
    selector: "acp-user-pic",
    templateUrl: "./user-pic.component.pug",
    styleUrls: ["./user-pic.component.scss"]
})
export class UserPicComponent implements OnInit {
    @Input() src: string;
    @Input() name: string;
    constructor() {}
    initials: string = "UU";
    isSrc: boolean;
    colormap: Array<string> = ["#fdd000"];
    ngOnInit() {
        this.isSrc = this.src !== "";
        let initials: string = "";
        this.name.split(" ").forEach(word => {
            initials += word[0].toUpperCase();
        });
        this.initials = initials;
    }
}
