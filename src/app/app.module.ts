import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SetLocationPage } from '../pages/set-location/set-location';
import {AgmCoreModule} from '@agm/core';
import { Geolocation } from '@ionic-native/geolocation';
import { LocationTrackerProvider } from '../providers/location-tracker/location-tracker';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { AuthService } from '../services/auth';
import {HttpModule} from '@angular/http';
import { UserProfilePage } from '../pages/user-profile/user-profile';
import { UserprofileService } from '../services/userservice';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SetLocationPage,
    SigninPage,
    SignupPage,
    UserProfilePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCMvF4-60E89MuliFlWl44y5AG8Vc0N1_c'
    }),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SetLocationPage,
    SigninPage,
    SignupPage,
    UserProfilePage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation,
    LocationTrackerProvider,
    AuthService,
    UserprofileService
  ]
})
export class AppModule {}
