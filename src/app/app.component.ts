import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "./service/user/user.service";
import { User } from "./interfaces";
import { Store } from "@ngrx/store";
import { AppState } from "./reducers";
import { selectAuthUser, selectAuthLoading } from "./auth/store/auth.selectors";

@Component({
    selector: "acp-root",
    templateUrl: "./app.component.pug",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
    title: string = "acp-project";
    isMenu: boolean = false;
    user: User;
    isAuth: boolean = false;
    loading: boolean = false;
    constructor(
        private router: Router,
        private UserService: UserService,
        private store: Store<AppState>
    ) {}
    ngOnInit(): void {
        this.store.select(selectAuthUser).subscribe((data: User) => {
            this.user = data;

            if (this.user._id && this.user._id !== "") {
                this.isAuth = true;
            }
        });
        this.store.select(selectAuthLoading).subscribe((data: boolean) => {
            this.loading = data;
        });
    }

    toggleMenu(): void {
        this.isMenu = !this.isMenu;
    }

    closeMenu(): void {
        if (this.isMenu) {
            this.isMenu = false;
        }
    }
}
