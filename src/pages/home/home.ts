import { Component } from '@angular/core';
import { NavController,AlertController, ToastController,NavParams, LoadingController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { GlobalProvider } from "../../providers/global/global";
import { Http } from '@angular/http';
import { CompanyProfilePage } from '../company-profile/company-profile';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	jobs=[];
	baseURL:string;
	constructor(public http:Http, public alertCtrl:AlertController ,public global:GlobalProvider ,public loadingCtrl:LoadingController , public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad HomePage');
		if(this.global.accessLevel=='Student'){
			this.initJobs();
		}else{
			if(this.global.session.company.flduser_id){

			}else{
				this.navCtrl.push(CompanyProfilePage);
			}
		}
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
		console.log(this.global.session);
		this.baseURL=this.global.serverAddress+"api/jobs.php"
		this.http.get(this.baseURL)
		.subscribe(data => {
			console.log(data);
			this.jobs=JSON.parse(data["_body"]);
		}, error => {
			console.log("failed");
		}
		);
	}

	edit(){
		this.navCtrl.push(CompanyProfilePage);
	}

	returnHome(){
		this.navCtrl.setRoot(HomePage);
	}

	processApplication(job,mydata){
		let url=this.global.serverAddress+"api/apply.php";
		let testData={'job_id':job.fldjob_id,'user_id':this.global.session.flduser_id,'why':mydata.why,'bid':mydata.bid};
		this.http.post(url,JSON.stringify(testData))
		.subscribe(data => {
			let response=JSON.parse(data["_body"]);
			if(response.response=="success"){
				let alert = this.alertCtrl.create({
					title: 'Home',
					subTitle: 'Application was successfully!',
					buttons: ['OK']
				});
				alert.present();
			}else{
				let toast = this.toastCtrl.create({
					message: 'Application could not be processed!',
					duration: 3000,
					position: 'bottom',
					cssClass: 'dark-trans',
					closeButtonText: 'OK',
					showCloseButton: true
				});
				toast.present();
			}
		}, error => {
			console.log("failed");
		}
		);
	}

	application(job){
		const prompt = this.alertCtrl.create({
			title: 'Home',
			message: "Application Details",
			inputs:
			[
			{
				name: 'why',
				placeholder: 'Reason Why?',
			},
			{
				name: 'bid',
				placeholder: 'Bid',
			},
			],
			buttons: [
			{
				text: 'Cancel',
				handler: data => {
					console.log('Cancel clicked');
				}
			},
			{
				text: 'Apply',
				handler: data => {
					this.processApplication(job,data);
				}
			}
			]
		});
		prompt.present();

	}
}
