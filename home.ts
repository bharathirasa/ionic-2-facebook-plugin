import { Component } from '@angular/core';

import { NavController , Platform} from 'ionic-angular';

import { Facebook } from 'ionic-native';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	platform:any;

	email:any;
	name:any;
	id:any;
   constructor(platform:Platform ) {
        this.platform = platform;
       
        this.email = '';
        this.name = '';
        this.id = '';
    }

    logout()
    {
       Facebook.logout().then( (data)=>{ alert("logged out successfully"); this.id=''; }); 
    }

    login() {


              if(this.platform.is('cordova')) {
            Facebook.login([ 'email']).then( (success) => {
                    alert(JSON.stringify(success));
                    this.id=JSON.stringify(success);

                    this.getCurrentUserProfile();
                },(err) => {
                    alert(JSON.stringify(err));
                    
                });
            
            } else {
                alert("Please run me on a device");
                //alert('Please run me on a device');
            }

        
    }



   
    getCurrentUserProfile() {
        let p = new Promise((resolve, reject) => {
            Facebook.api('me?fields=email,name', null).then(
            (profileData) => {
                alert(JSON.stringify(profileData));
                resolve(profileData);
            },(err) => {
                alert(JSON.stringify(err));
                reject(err);
            });
        });
        return p;
    }




}


