import { UserService } from "../service/user/user.service";
import { Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router
} from "@angular/router";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuardService {
    constructor(private _userService: UserService, private _router: Router) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this._userService.isAuth()) {
            return true;
        }

        return this._router.parseUrl("/login");
    }
}
