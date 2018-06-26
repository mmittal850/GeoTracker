import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { SetLocationPage } from '../set-location/set-location';
import { Location } from '../../models/location';
import { Geolocation, Geoposition } from '@ionic-native/geolocation'
import { Injectable, NgZone } from '@angular/core';
import 'rxjs/add/operator/filter';
import { AuthService } from '../../services/auth';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { NgForm } from '@angular/forms';

@Injectable()

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  

  location: Location = {
    lat: 40.758896,
    lng: -73.985130
  };

  selectOptions = ['Walk','Run','Bike', 'Car', 'Bus','Train'];

  mode: string;

  Startlocation: Location = {
    lat: 40.758896,
    lng: -73.985130
  };
  watch: any;
  distance:any;
  speed:any;
  locationIsset= false;
  time: any;
  startingTime:any;
  count : number = 0;
  constructor(private http: Http ,private authService: AuthService,private modlCtrl:ModalController,public geolocation: Geolocation, public zone:NgZone, private loadingCtrl: LoadingController) {
  }

  onStart(form:NgForm)
  {
    this.mode= form.value.mode;
    const load= this.loadingCtrl.create({
      content: "Starting your tracking.."
    });
    load.present();
  let options = {
    frequency: 1000,
    enableHighAccuracy: true
  };
   
  this.watch = this.geolocation.watchPosition(options).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {
   
    console.log(position);
   
    this.zone.run(() => {
      load.dismiss();
      this.location.lat = position.coords.latitude;
      this.location.lng = position.coords.longitude;
      this.speed= position.coords.speed;
      var theDate = new Date(position.timestamp);
      this.time = theDate.toLocaleString(); 
      this.count= this.count+1;
      if(this.count% 5 == 0){
        this.authService.getActiveUser().getToken()
        .then(
          (token:string) =>{
           this.Store(token).subscribe(
             ()=> console.log('Success..'),
             error=>{
               console.log('Storing....'+error);
             }
           );
   
          });
      }
    });
   
  });  
   
  }


  Store(token:string){
    const userid = this.authService.getActiveUser().uid;
    return this.http.post('https://geotracker-1512940919304.firebaseio.com/' + userid +'/GPS_Data'+this.time+'.json?auth='+token,{
       lat: this.location.lat,
       lng: this.location.lng,
       time:this.time,
       mode: this.mode
     
    }).map((response:Response)=>{
      return response.json();
    });
  }


  onStop(){
      console.log('stopTracking');
     this.watch.unsubscribe();
  }

  onLocate(){
    const load= this.loadingCtrl.create({
      content: "Getting your location.."
    });
    load.present();
    this.geolocation.getCurrentPosition().then((resp) => {
      load.dismiss();
      this.location.lat = resp.coords.latitude;
      this.location.lng = resp.coords.longitude;
      this.Startlocation.lat= resp.coords.latitude;
      this.Startlocation.lng= resp.coords.longitude;
      var theDate = new Date(resp.timestamp);
      this.startingTime = theDate.toLocaleString();  
      this.locationIsset = true;
     }).catch((error) => {
       console.log('Error getting location', error);
     });

     
  }

  onOpenMap(){
    const modal = this.modlCtrl.create(SetLocationPage,{location: this.location, isSet: this.locationIsset});
    modal.present();
    modal.onDidDismiss(
      data => {
        if(data){
          this.location= data.location;
          this.locationIsset= true;
        }
      }
    );
  }

}
