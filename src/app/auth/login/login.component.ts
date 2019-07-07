import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormControl } from "@angular/forms";
import { UserService } from "src/app/service/user/user.service";
import { User } from "src/app/interfaces";
import { AppState } from "src/app/reducers";
import { Store, select } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import {
    LogInRequest,
    SignUpRequest,
    SignUpSuccess
} from "../store/auth.actions";

import {
    selectAuthLoading,
    selectIsAuth,
    selectAuthError,
    selectAuthState
} from "../store/auth.selectors";
import { AuthState } from "../store/auth.reducer";

@Component({
    selector: "acp-login",
    templateUrl: "./login.component.pug",
    styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit, OnDestroy {
    constructor(
        private UserService: UserService,
        private store: Store<AppState>
    ) {}
    title: string = "Login";
    control1Title: string = "Login";
    control2Title: string = "Sign up";
    loginControl: FormControl;
    passwordControl: FormControl;
    newPasswordControl: FormControl;
    isLogin = true;

    errormsg: string = "";
    user: User;
    isLoading: boolean;
    isAuth: boolean;
    AuthSub: Subscription;
    ngOnInit() {
        this.loginControl = new FormControl("dimakur");
        this.passwordControl = new FormControl("12345");
        this.newPasswordControl = new FormControl("");
        this.toggleNames();

        this.AuthSub = this.store
            .select(selectAuthState)
            .subscribe((data: AuthState) => {
                this.user = data.user;
                this.isLoading = data.loading;
                this.isAuth = data.isAuth;
            });
    }
    ngOnDestroy() {
        this.AuthSub.unsubscribe();
    }
    onLogin() {
        if (!this.validate()) {
            this.errormsg = "Enter data in all fields";
        } else {
            this.store.dispatch(
                new LogInRequest({
                    login: this.loginControl.value,
                    password: this.passwordControl.value
                })
            );
        }
    }
    onSignUp() {
        if (!this.validate()) {
            this.errormsg = "Enter data in all fields";
        } else {
            this.store.dispatch(new SignUpRequest());
            this.UserService.signUp(
                this.loginControl.value,
                this.passwordControl.value
            ).subscribe(data => {
                this.store.dispatch(new SignUpSuccess());
                this.onLogin();
            });
        }
    }
    validate(): boolean {
        return (
            this.loginControl.value.length !== 0 &&
            this.passwordControl.value.length !== 0
        );
    }
    focus(): void {
        this.errormsg = "";
    }
    onReset() {
        if (this.newPasswordControl.value.length) {
            this.UserService.updateUserById(this.user._id, {
                newPassword: this.newPasswordControl.value
            }).subscribe(data => {
                console.log("updated");
            });
        }
    }
    toggleForm() {
        this.isLogin = !this.isLogin;
        this.toggleNames();
    }

    onClick() {
        if (this.isLogin) {
            this.onLogin();
        } else {
            this.onSignUp();
        }
    }
    toggleNames() {
        this.title = this.isLogin ? "Login" : "Sign up";
        this.control1Title = this.isLogin ? "Login" : "Sign up";
        this.control2Title = this.isLogin ? "Sign up" : "Login";
    }
}
