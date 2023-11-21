import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemesService {

  darkMode = new BehaviorSubject(false);

  constructor() {
    this.setInitialTheme();
  }

  setInitialTheme() {
    const darkModeValue = localStorage.getItem('darkMode');

    // Si el valor de darkMode almacenado en localStorage es true, establece el tema oscuro
    if (darkModeValue && JSON.parse(darkModeValue)) {
      this.setTheme(true);
    } else {
      this.setTheme(false);
    }
  }

  setTheme(darkMode: boolean) {
    // Configura el atributo 'color-theme' del cuerpo del documento según el modo elegido
    document.body.setAttribute('color-theme', darkMode ? 'dark' : 'light');

    // Establece el valor del BehaviorSubject para notificar a los suscriptores sobre el cambio de tema
    this.darkMode.next(darkMode);

    // Guarda el estado del modo oscuro en localStorage
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }
}
