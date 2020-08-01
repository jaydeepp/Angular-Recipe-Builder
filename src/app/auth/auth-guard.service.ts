import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuardService implements CanActivate{

    constructor(private authService:AuthService){}

    canActivate(activateRoute:ActivatedRouteSnapshot,router:RouterStateSnapshot){

        return this.authService.isAuthenticated();
    }

}