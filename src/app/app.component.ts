import { Component, OnInit } from "@angular/core";

interface User {
    img: string;
    initials: string;
    name: string;
}

@Component({
    selector: "app-root",
    templateUrl: "./app.component.pug",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
    title: string = "acp-project";
    logoSrc: string = "../assets/images/logo.svg";
    user: User = {
        img: "../assets/images/avatar.png",
        initials: "DK",
        name: "Khristofer Khristorozhdestvenskii"
    };
    isSearch: boolean = false;
    isMenu: boolean = false;

    ngOnInit(): void {}
    toggleSearch(): void {
        this.isSearch = !this.isSearch;
    }
    toggleMenu(): void {
        this.isMenu = !this.isMenu;
    }
    account(): void {}
}
