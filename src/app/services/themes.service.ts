import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemesService {

  darkMode = new BehaviorSubject(false);
  constructor() { }

  setInitialTheme() {
    let darkMode = localStorage.getItem('darkMode');

    if (darkMode) {
      document.body.setAttribute('color-theme', 'dark');
    } else {
      document.body.setAttribute('color-theme', 'light');
    }
  }


  setTheme(darkMode: boolean) {

    if (darkMode) {
      this.setTheme(darkMode)
    } else {
      this.setTheme(darkMode)
    }
    this.darkMode.next(darkMode);
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }


}
