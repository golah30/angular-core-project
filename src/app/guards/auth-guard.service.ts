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

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        if (this._userService.isAuth()) {
            return true;
        }

        this._router.navigate(["/login"]);

        return false;
    }
}
