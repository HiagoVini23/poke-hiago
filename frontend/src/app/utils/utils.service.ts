import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private toastController: ToastController) { }

  async presentToast(message: string, icon: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 4000,
      icon: icon,
      color: color
    });
    toast.present();
  }

}
