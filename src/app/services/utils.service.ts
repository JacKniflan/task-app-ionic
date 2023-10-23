import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { AlertController, AlertOptions, LoadingController, LoadingOptions, ModalController, ModalOptions, ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor(
    private loadingController: LoadingController,
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController,
    private modalController: ModalController
  ) { }

  //==========Cargando ================
  //PRESENTE
  async presentLoading(opts: LoadingOptions) {
    const loading = await this.loadingController.create(opts);
    await loading.present();
  }
  //DISMISS
  async dismissLoading() {
    await this.loadingController.dismiss();
  }

  //==========LOCAL STORAGE ================
  //SET
  setElementInLocalStorage(key: string, element: any) {
    return localStorage.setItem(key, JSON.stringify(element));
  }
  //GET
  getElementFromLocalStorage(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }


  async presentToast(opts: ToastOptions) {
    const toast = await this.toastController.create(opts);
    toast.present();
  }


  routerLink(url: string) {
    return this.router.navigateByUrl(url);
  }

  //Alert sirve para mostrar un mensaje de alerta en la pantalla
  async presentAlert(opts: AlertOptions) {
    const alert = await this.alertController.create(opts);

    await alert.present();
  }


  ///Modal nos sirve para mostrar un componente en la pantalla 
  async presentModal(opts: ModalOptions) {
    const modal = await this.modalController.create(opts);
    await modal.present();


    const { data } = await modal.onWillDismiss();


    if (data) {
      return data;
    }

  }

  dismissModal(data?: any) {
    this.modalController.dismiss(data);
  }

  getPercentage(task: Task) {
    let completedItem = task.items.filter(item => item.completed).length;
    let totalItems = task.items.length;
    let percentage = (100 / totalItems) * completedItem;


    return parseInt(percentage.toString());
  }



}
