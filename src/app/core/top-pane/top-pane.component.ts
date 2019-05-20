import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
interface User {
    img: string;
    initials: string;
    name: string;
}
@Component({
    selector: "acp-top-pane",
    templateUrl: "./top-pane.component.pug",
    styleUrls: ["./top-pane.component.scss"]
})
export class TopPaneComponent implements OnInit {
    constructor() {}

    @Input() user: User;
    @Input() isMenu: boolean;
    @Output() toggleMenu = new EventEmitter<boolean>();

    logoSrc: string = "../assets/images/logo.svg";
    isSearch: boolean = false;

    toggleSearch(): void {
        this.isSearch = !this.isSearch;
    }

    toggleSideMenu(): void {
        this.toggleMenu.emit();
    }
    account(): void {}
    ngOnInit() {}
}
