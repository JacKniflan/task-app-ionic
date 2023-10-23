import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ThemesService } from 'src/app/services/themes.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() title: string;//Para indicar el titulo
  @Input() backButton: string;//Para indicar si se muestra el boton de atras
  @Input() isModal: boolean;//Para indicar si es un modal (modal es una ventana emergente)
  @Input() color: string;//Para indicar el color del header
  @Input() centerTitle: boolean; //Para indicar si el titulo se centra o no


  darkMode: BehaviorSubject<boolean>;




  constructor(
    private themesSvc: ThemesService,
    private utilsSvc: UtilsService,
  ) { }

  ngOnInit() {
    this.darkMode = this.themesSvc.darkMode;
  }


  dismissModal() {
    this.utilsSvc.dismissModal();
  }
  setTheme(darkMode: boolean) {
    this.themesSvc.setTheme(darkMode);
  }

}
