import { Component, OnInit } from "@angular/core";

interface User {
    img: string;
    initials: string;
    name: string;
}

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

    isMenu: boolean = true;
    isSideContent: boolean = true;

    ngOnInit(): void {}

    toggleMenu(): void {
        this.isMenu = !this.isMenu;
    }
    toggleSideContent(): void {
        this.isSideContent = !this.isSideContent;
    }
    closeMenu(): void {
        this.isMenu = false;
    }
}
