import { Component } from '@angular/core';
import { ThemesService } from './services/themes.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {


  constructor(
    private themeSvc: ThemesService
  ) {
    this.themeSvc.setInitialTheme();
  }
}
