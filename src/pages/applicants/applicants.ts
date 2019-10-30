import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController} from 'ionic-angular';
import { Http } from '@angular/http';
import { GlobalProvider } from "../../providers/global/global";
import { ChatPage } from '../chat/chat';
import { MySkillsPage } from '../my-skills/my-skills';

/**
 * Generated class for the ApplicantsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
 	selector: 'page-applicants',
 	templateUrl: 'applicants.html',
 })
 export class ApplicantsPage {
 	applicants=[];
 	baseURL:string;
 	job:any;
 	constructor(public alertCtrl: AlertController, public toastCtrl:ToastController, public http:Http, public global:GlobalProvider, public navCtrl: NavController, public navParams: NavParams) {
 		let tempJob=navParams.get('job');
 		if(tempJob){
 			this.job=tempJob;
 		}else{
 			this.navCtrl.pop();
 		}
 	}

 	ionViewDidLoad() {
 		console.log('ionViewDidLoad ApplicantsPage');
 		this.initApplicants();
 	}

 	skills(user_id){
 		this.navCtrl.push(MySkillsPage,{'user_id':user_id});
 	}

 	filterApplicants(ev: any) {
 		this.http.get(this.baseURL)
 		.subscribe(data => {
 			console.log(data["_body"]);
 			this.applicants=JSON.parse(data["_body"]);
 			let val = ev.target.value;
 			if (val && val.trim() !== '') {
 				this.applicants = this.applicants.filter((user) => {
 					return ((user.fldforename.toLowerCase().indexOf(val.toLowerCase()) > -1));
 				})
 			}
 		}, error => {
 			console.log("failed");
 		}
 		);
 	}

 	chat(applicant){
 		this.navCtrl.push(ChatPage, {'userid':applicant.flduser_id, 'fullname': applicant.fldforename+' '+applicant.fldsurname, 'phoneno': applicant.fldphone_no});
 	}

 	initApplicants() {
 		console.log(this.global.session);
 		this.baseURL=this.global.serverAddress+"api/applicants.php?user_id="+this.global.session.flduser_id;
 		this.http.get(this.baseURL)
 		.subscribe(data => {
 			console.log(data);
 			this.applicants=JSON.parse(data["_body"]);
 		}, error => {
 			console.log("failed");
 		}
 		);
 	}
 }
