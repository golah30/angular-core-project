import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    ViewChild,
    ElementRef,
    Renderer2
} from "@angular/core";
import { User } from "../../interfaces";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/reducers";
import { Logout } from "src/app/auth/store/auth.actions";
import { Router } from "@angular/router";

@Component({
    selector: "acp-top-pane",
    templateUrl: "./top-pane.component.pug",
    styleUrls: ["./top-pane.component.scss"]
})
export class TopPaneComponent implements OnInit {
    constructor(
        private _renderer: Renderer2,
        private store: Store<AppState>,
        private router: Router
    ) {}
    @ViewChild("search") searchInput: ElementRef;
    @Input() user: User;
    @Input() isMenu: boolean;
    @Output() toggleMenu = new EventEmitter<boolean>();

    logoSrc: string = "../assets/images/logo.svg";
    isSearch: boolean = false;
    closedByBlur: boolean = false;
    username: string = "";
    toggleSearch(): void {
        if (!this.closedByBlur) {
            this.searchInput.nativeElement.value = "";
            this.isSearch = !this.isSearch;
            if (this.isSearch) {
                this.searchInput.nativeElement.focus();
            }
        }
    }

    toggleSideMenu(): void {
        this.toggleMenu.emit();
    }
    account(): void {
        this.store.dispatch(new Logout());
        this.router.navigate(["/login"]);
    }
    ngOnInit() {
        this.username =
            this.user.firstName && this.user.lastName
                ? this.user.firstName + " " + this.user.lastName
                : this.user.username;
        this._renderer.listen(this.searchInput.nativeElement, "blur", e => {
            if (e.target.value === "") {
                this.isSearch = false;
                this.closedByBlur = true;
            }
            setTimeout(() => {
                this.closedByBlur = false;
            }, 200);
        });
    }
}
