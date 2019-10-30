import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GlobalProvider } from "../providers/global/global";
import { Storage } from '@ionic/storage';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { EmployerLoginPage } from '../pages/employer-login/employer-login';
import { MySkillsPage } from '../pages/my-skills/my-skills';
import { MyApplicationsPage } from '../pages/my-applications/my-applications';
import { ChatsPage } from '../pages/chats/chats';
import { CompanyProfilePage } from '../pages/company-profile/company-profile';
import { JobOpeningsPage } from '../pages/job-openings/job-openings';
import { SettingsPage } from '../pages/settings/settings';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  constructor(public storage: Storage, public global: GlobalProvider, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();
  }

  initializeApp(){   
    this.platform.ready().then(() => {          
      this.storage.ready().then(()=> {
        this.storage.get('serverAddress').then((val) =>{
          this.setServerAddress(val);
        });
        this.storage.get('session').then((val) =>{
          this.setAccount(val);
        });
      });
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  setAccount(val){
    this.global.session=val;
    if(this.global.session==null){
      this.rootPage = LoginPage;
      this.global.session=null;
    }else{
      if(this.global.session.fldreg_no){
        this.global.accessLevel="Student";
      }else{
        this.global.accessLevel="Employer";
      }
      this.rootPage = HomePage;
    }
  }

  setServerAddress(val){
    if(val!=null){
      this.global.serverAddress=val;
    }else{
      this.global.serverAddress="http://msu22.000webhostapp.com/jobshop/";
    }
  }

  openPage(index){
    let myPages=[MySkillsPage, MyApplicationsPage, ChatsPage, JobOpeningsPage, SettingsPage];
    this.nav.push(myPages[index]);
  }

  logout(){
    this.storage.remove("session"); 
    this.global.session=null;
    this.global.accessLevel=null;
    this.nav.setRoot(LoginPage);
  }
}
