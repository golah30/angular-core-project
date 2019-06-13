import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { UserService } from "src/app/service/user/user.service";
import { User } from "src/app/interfaces";

@Component({
    selector: "acp-login",
    templateUrl: "./login.component.pug",
    styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
    constructor(private UserService: UserService) {}
    title: string = "Login";
    control1Title: string = "Login";
    control2Title: string = "Sign up";
    loginControl: FormControl;
    passwordControl: FormControl;
    newPasswordControl: FormControl;
    isFetching = false;
    isLogin = true;
    isAuth = false;
    errormsg: string = "";
    user: User;
    onLogin() {
        if (!this.validate()) {
            this.errormsg = "Enter data in all fields";
        } else if (this.isFetching) {
            this.errormsg = "Wait. Data currently loading";
        } else {
            this.isFetching = true;
            this.UserService.login(
                this.loginControl.value,
                this.passwordControl.value
            ).subscribe((data: User) => {
                this.user = data;
                this.isFetching = false;
                this.isAuth = true;
            });
        }
    }
    onSignUp() {
        if (!this.validate()) {
            this.errormsg = "Enter data in all fields";
        } else {
            this.isFetching = true;
            this.UserService.signUp(
                this.loginControl.value,
                this.passwordControl.value
            ).subscribe(data => {
                this.isFetching = false;
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
    ngOnInit() {
        this.loginControl = new FormControl("");
        this.passwordControl = new FormControl("");
        this.newPasswordControl = new FormControl("");
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
