import { Component, OnInit } from "@angular/core";

interface User {
    img: string;
    initials: string;
    name: string;
}
interface MenuItem {
    icon: string;
    href: string;
    title: string;
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
    menuItems: Array<MenuItem> = [
        {
            icon: "icon-view_compact",
            href: "",
            title: "Dashboard"
        },
        {
            icon: "icon-school",
            href: "",
            title: "Workshops"
        },
        {
            icon: "icon-question_answer",
            href: "",
            title: "Quizzes"
        }
    ];
    isSearch: boolean = false;
    isMenu: boolean = false;
    isSideContent: boolean = true;

    ngOnInit(): void {}
    toggleSearch(): void {
        this.isSearch = !this.isSearch;
    }
    toggleMenu(): void {
        this.isMenu = !this.isMenu;
    }
    toggleSideContent(): void {
        this.isSideContent = !this.isSideContent;
    }
    account(): void {}
    closeMenu(): void {
        this.isMenu = false;
    }
}
