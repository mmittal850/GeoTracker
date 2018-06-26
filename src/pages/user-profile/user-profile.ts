import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { AuthService } from '../../services/auth';
import { UserprofileService } from '../../services/userservice';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';
import { UserProfile } from '../../models/userProfile';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { HomePage } from '../home/home';

/**
 * Generated class for the UserProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {

  user: UserProfile [];
  

  constructor(private loadCtrl:LoadingController,private http:Http,public navCtrl: NavController, public navParams: NavParams, private authService:AuthService, private userserv:UserprofileService) {
    
  }

  onCreateProfile(form:NgForm)
  { const loading= this.loadCtrl.create({
    content: "Creating your profile"
  });
     this.userserv.addItem(form.value.name,form.value.university,form.value.email,form.value.location,form.value.gender,form.value.occupation);
     this.user = this.userserv.getItems();
     
     this.authService.getActiveUser().getToken()
     .then(
       (token: string) => {
         this.Store(token)
           .subscribe(
             () => {loading.dismiss();
             console.log('Success..');
             this.navCtrl.setRoot(HomePage);
            },
             error => {
               loading.dismiss();
               console.log('Fail..');
             }
           );
       }
     );

  }

    


  Store(token:string){
    const userid = this.authService.getActiveUser().uid;
    return this.http.put('https://geotracker-1512940919304.firebaseio.com/' + userid +'/UserProfile.json?auth='+token,this.user
    ).map((response:Response)=>{
      return response.json();
    });
  }

}
