import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "./service/user/user.service";
import { User } from "./interfaces";

@Component({
    selector: "acp-root",
    templateUrl: "./app.component.pug",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
    title: string = "acp-project";
    isMenu: boolean = false;
    user: User;
    constructor(private router: Router, private UserService: UserService) {}
    ngOnInit(): void {
        this.UserService.getCurrentUser().subscribe(data => {
            this.user = data;
        });
        this.router.events.subscribe((event: any) => {
            if (event.url) {
                this.updateUser();
            }
        });
    }

    toggleMenu(): void {
        this.isMenu = !this.isMenu;
    }
    updateUser(): void {
        if (this.UserService.isAuth()) {
            this.UserService.getCurrentUser().subscribe(data => {
                this.user = data;
            });
        }
    }

    closeMenu(): void {
        if (this.isMenu) {
            this.isMenu = false;
        }
    }
}
