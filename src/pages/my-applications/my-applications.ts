import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController} from 'ionic-angular';
import { Http } from '@angular/http';
import { GlobalProvider } from "../../providers/global/global";
import { ChatPage } from '../chat/chat';

/**
 * Generated class for the MyApplicationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
 	selector: 'page-my-applications',
 	templateUrl: 'my-applications.html',
 })
 export class MyApplicationsPage {
 	applications=[];
 	baseURL:string;
 	job:any;
 	constructor(public alertCtrl: AlertController, public toastCtrl:ToastController, public http:Http, public global:GlobalProvider, public navCtrl: NavController, public navParams: NavParams) {

 	}

 	ionViewDidLoad() {
 		console.log('ionViewDidLoad MyApplicationsPage');
 		this.initApplications();
 	}

 	filterApplications(ev: any) {
 		this.http.get(this.baseURL)
 		.subscribe(data => {
 			console.log(data["_body"]);
 			this.applications=JSON.parse(data["_body"]);
 			let val = ev.target.value;
 			if (val && val.trim() !== '') {
 				this.applications = this.applications.filter((application) => {
 					return ((application.fldtitle.toLowerCase().indexOf(val.toLowerCase()) > -1));
 				})
 			}
 		}, error => {
 			console.log("failed");
 		}
 		);
 	}

 	initApplications() {
 		console.log(this.global.session);
 		this.baseURL=this.global.serverAddress+"api/applications.php?user_id="+this.global.session.flduser_id;
 		this.http.get(this.baseURL)
 		.subscribe(data => {
 			this.applications=JSON.parse(data["_body"]);
 		}, error => {
 			console.log("failed");
 		}
 		);
 	}
 }
