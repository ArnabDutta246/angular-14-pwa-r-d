import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private http: HttpClient,
    public toastController: ToastController,) { }
  /**================  [ Toaster controller]  ======================**/
  async presentToast(
    message: string,
    mode: 'success' | 'error',
    duration: number = 3500
  ) {
    const toast = await this.toastController.create({
      message: `${message}`,
      duration: duration,
      color: mode == 'error' ? 'danger' : 'success',
      position: 'bottom',
      keyboardClose: false,
      cssClass: 'toaster-class',
      mode: 'md',
      buttons: [
        {
          side: 'start',
          icon: 'close',
        }
      ]
    });
    toast.present();
  }
}
