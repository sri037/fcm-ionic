import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FCM } from '@ionic-native/fcm';
import { ToastController } from 'ionic-angular';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              private toastCtrl: ToastController,
              private fcm: FCM) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.fcm.getToken().then(token => {
        console.log('token',token);
      });

      this.fcm.onNotification().subscribe(notification => {
        console.log(JSON.stringify(notification));
        if(notification.wasTapped){
          console.log('Received in background',notification);
        } else {
          this.presentToast(notification.body);
          console.log('Received in foreground',notification);
        };
      });

      this.fcm.onTokenRefresh().subscribe(token => {
        console.log(token);
      });
    });
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
}

