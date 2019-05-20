import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    HostBinding
} from "@angular/core";

interface MenuItem {
    icon: string;
    href: string;
    title: string;
}
@Component({
    selector: "acp-side-menu",
    templateUrl: "./side-menu.component.pug",
    styleUrls: ["./side-menu.component.scss"]
})
export class SideMenuComponent implements OnInit {
    @Input() isMenu: boolean;
    @Output() closeMenu = new EventEmitter<boolean>();
    constructor() {}

    @HostBinding("class.active") get isMenuOpen(): boolean {
        return this.isMenu;
    }
    menuItems: Array<MenuItem> = [
        {
            icon: "icon-view_compact",
            href: "/dashboard",
            title: "Dashboard"
        },
        {
            icon: "icon-school",
            href: "/workshops",
            title: "Workshops"
        },
        {
            icon: "icon-question_answer",
            href: "/quizzes",
            title: "Quizzes"
        }
    ];
    ngOnInit() {}
    closeSideMenu(): void {
        this.closeMenu.emit();
    }
}
