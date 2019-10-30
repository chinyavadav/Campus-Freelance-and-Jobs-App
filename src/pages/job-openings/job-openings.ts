import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { GlobalProvider } from "../../providers/global/global";
import { Http } from '@angular/http';
import { ApplicantsPage } from '../applicants/applicants';
import { JobDetailsPage } from '../job-details/job-details';

/**
 * Generated class for the JobOpeningsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
 	selector: 'page-job-openings',
 	templateUrl: 'job-openings.html',
 })
 export class JobOpeningsPage {
 	jobs=[];
 	baseURL:string;
 	constructor(public toastCtrl: ToastController, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public global:GlobalProvider, public http:Http,public navCtrl: NavController, public navParams: NavParams) {
 	}
 	ionViewDidEnter() {
 		this.initJobs();
 		console.log('ionViewDidLoad HomePage');
 	}

 	filterJobs(ev: any) {
 		this.http.get(this.baseURL)
 		.subscribe(data => {
 			console.log(data["_body"]);
 			this.jobs=JSON.parse(data["_body"]);
 			let val = ev.target.value;
 			if (val && val.trim() !== '') {
 				this.jobs = this.jobs.filter((job) => {
 					return ((job.fldtitle.toLowerCase().indexOf(val.toLowerCase()) > -1));
 				})
 			}
 		}, error => {
 			console.log("failed");
 		}
 		);
 	}

 	initJobs() {
 		this.baseURL=this.global.serverAddress+"api/job-openings.php?user_id="+this.global.session.flduser_id;
 		this.http.get(this.baseURL)
 		.subscribe(data => {
 			this.jobs=JSON.parse(data["_body"]);
 			console.log(this.jobs);
 		}, error => {
 			console.log("failed");
 		}
 		);
 	}

 	add(){
 		this.navCtrl.push(JobDetailsPage);
 	}

 	edit(job){
 		this.navCtrl.push(JobDetailsPage,{'job':job});
 	}

 	applicants(job){
 		this.navCtrl.push(ApplicantsPage,{'job':job});
 	}

 	changeStatus(job_id,oldStatus){
 		let loader = this.loadingCtrl.create({
 			content: "Processing...",
 			spinner:"bubbles"
 		});
 		if(oldStatus=='Open'){
 			status='Closed';
 		}else{
 			status='Open';
 		}
 		this.http.get(this.global.serverAddress+"api/change-status.php?status="+status+"&job_id="+job_id)
 		.subscribe(data => {
 			loader.present();
 			console.log(data["_body"]);
 			let response = JSON.parse(data["_body"]);
 			if(response.response=="success"){
 				loader.dismiss();
 				let alert = this.alertCtrl.create({
 					title: 'Job',
 					subTitle: "Status Successfully changed!",
 					buttons: ['OK']
 				});
 				alert.present();
 				this.initJobs();
 			}else{
 				loader.dismiss();
 				let alert = this.alertCtrl.create({
 					title: 'Job',
 					subTitle: 'Status Could not be changed!',
 					buttons: ['OK']
 				});
 				alert.present();
 			}
 		}, error => {
 			loader.dismiss();
 			let toast = this.toastCtrl.create({
 				message: 'Resolve Connectivity Issue!',
 				duration: 3000,
 				position: 'bottom',
 				cssClass: 'dark-trans',
 				closeButtonText: 'OK',
 				showCloseButton: true
 			});
 		}
 		);
 	}
 }
