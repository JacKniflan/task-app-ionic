import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { FirebaseService } from '../services/firebase.service';
import { UtilsService } from '../services/utils.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(//Inyectamos los servicios que vamos a utilizar en el guard 
    private firebaseSvc: FirebaseService,
    private utilsSvc: UtilsService


  ) { }
  canActivate( //Función para verificar si existe un usuario logueado en el sistema 
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.firebaseSvc.getAuthState().pipe(map(auth => { //Obtenemos el estado de la autenticación de firebase 

      //Existe un usuario logueado en el sistema 
      if (auth) {
        return true
      } else {
        //No existe un usuario logueado en el sistema
        this.utilsSvc.routerLink('/auth')
        return false
      }
    }))
  }

}
