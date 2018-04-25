import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FCM } from '@ionic-native/fcm';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              private fcm: FCM) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.fcm.getToken().then(token => {
        console.log('token',token);
      });

      this.fcm.onNotification().subscribe(data => {
        if(data.wasTapped){
          console.log('Received in background',data);
        } else {
          console.log('Received in foreground',data);
        };
      });

      this.fcm.onTokenRefresh().subscribe(token => {
        console.log(token);
      });
    });
  }
}

