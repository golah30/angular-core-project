import { Component, OnInit } from "@angular/core";
import { User } from "./interfaces";

@Component({
    selector: "acp-root",
    templateUrl: "./app.component.pug",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
    title: string = "acp-project";
    user: User = {
        img: "../assets/images/avatar.png",
        initials: "DK",
        name: "Khristofer Khristorozhdestvenskii"
    };

    isMenu: boolean = false;

    ngOnInit(): void {}

    toggleMenu(): void {
        this.isMenu = !this.isMenu;
    }

    closeMenu(): void {
        if (this.isMenu) {
            this.isMenu = false;
        }
    }
}
