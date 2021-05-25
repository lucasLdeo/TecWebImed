import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from "@angular/router";
import { Globals } from "../globals/globals";
@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild{
    constructor(private router: Router, private globals: Globals){ }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{

        if (this.globals.loginData.token == null){
            this.router.navigate(['/auth']);
            return false;
        }
        return true;
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{

        return this.canActivate(route,state)
    }
}