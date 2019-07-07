import { UserService } from "../service/user/user.service";
import { Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router
} from "@angular/router";
import { Observable } from "rxjs";
import { AppState } from "../reducers";
import { Store } from "@ngrx/store";
import { LogInByToken, LogInSuccess } from "../auth/store/auth.actions";

@Injectable()
export class AuthGuardService {
    constructor(
        private _userService: UserService,
        private _router: Router,
        private store: Store<AppState>
    ) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this._userService.isAuth()) {
            return true;
        }
        const token = localStorage.getItem("token");
        if (token) {
            this.store.dispatch(new LogInByToken({ token: token }));
            this._userService.getUserByToken(token).subscribe(data => {
                this.store.dispatch(
                    new LogInSuccess({ user: data, token: token })
                );
            });
            return true;
        }
        return this._router.parseUrl("/login");
    }
}
