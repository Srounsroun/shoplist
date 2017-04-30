import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Geolocation } from '@ionic-native/geolocation';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ProfilePage } from '../pages/profile/profile';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { MapPage } from '../pages/map/map';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
import { AuthService } from '../providers/auth-service';
import { ShopService } from '../providers/shoplist-service';

export const firebaseConfig = {
    apiKey: "AIzaSyCLrIabqG8x7v9DV37khF09z3hTzZC9aFs",
    authDomain: "restapi-7aac7.firebaseapp.com",
    databaseURL: "https://restapi-7aac7.firebaseio.com",
    projectId: "restapi-7aac7",
    storageBucket: "restapi-7aac7.appspot.com",
    messagingSenderId: "533622725390"
};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ProfilePage,
    HomePage,
    TabsPage,
    MapPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ProfilePage,
    HomePage,
    MapPage,
    TabsPage,
  ],
  providers: [
    Geolocation,
    AuthService,
    ShopService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
