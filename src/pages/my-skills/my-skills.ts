import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController} from 'ionic-angular';
import { Http } from '@angular/http';
import { GlobalProvider } from "../../providers/global/global";

/**
 * Generated class for the MySkillsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
 	selector: 'page-my-skills',
 	templateUrl: 'my-skills.html',
 })
 export class MySkillsPage {
 	skills=[];
 	baseURL:string;
 	user_id:string;
 	constructor(public alertCtrl: AlertController, public toastCtrl:ToastController, public http:Http, public global:GlobalProvider, public navCtrl: NavController, public navParams: NavParams) {
 		let tempUserId=navParams.get('user_id');
 		if(tempUserId){
 			this.user_id=tempUserId;
 		}else{
 			this.user_id=this.global.session.flduser_id;
 		}
 	}

 	ionViewDidLoad() {
 		console.log('ionViewDidLoad SkillsPage');
 		this.initSkills();
 	}

 	filterSkills(ev: any) {
 		this.http.get(this.baseURL)
 		.subscribe(data => {
 			console.log(data["_body"]);
 			this.skills=JSON.parse(data["_body"]);
 			let val = ev.target.value;
 			if (val && val.trim() !== '') {
 				this.skills = this.skills.filter((skill) => {
 					return ((skill.fldforename.toLowerCase().indexOf(val.toLowerCase()) > -1));
 				})
 			}
 		}, error => {
 			console.log("failed");
 		}
 		);
 	}

 	initSkills() {
 		console.log(this.global.session);
 		this.baseURL=this.global.serverAddress+"api/skills.php?user_id="+this.user_id;
 		this.http.get(this.baseURL)
 		.subscribe(data => {
 			console.log(data);
 			this.skills=JSON.parse(data["_body"]);
 		}, error => {
 			console.log("failed");
 		}
 		);
 	}

 	delete(skill){
 		let url=this.global.serverAddress+"api/delete-skill.php?user_id="+this.global.session.flduser_id+"&skill="+skill;
 		this.http.get(url)
 		.subscribe(data => {
 			console.log(data);
 			let response=JSON.parse(data["_body"]);
 			if(response.response=="success"){
 				let alert = this.alertCtrl.create({
 					title: 'Skills',
 					subTitle: 'Skill successfully deleted!',
 					buttons: ['OK']
 				});
 				alert.present();
 				this.initSkills()
 			}else{
 				let toast = this.toastCtrl.create({
 					message: 'Skill could not be deleted!',
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
 		});
 	}

 	add(){
 		let min=(this.global.session.fldlower_theshold/100).toFixed(2);
 		const prompt = this.alertCtrl.create({
 			title: 'Add Skill',
 			message: "Skill Name",
 			inputs: [
 			{
 				name: 'skill',
 				placeholder: 'Skill Name',
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
 				text: 'Save',
 				handler: data => {
 					this.processsAdd(data.skill);
 				}
 			}
 			]
 		});
 		prompt.present();
 	}

 	processsAdd(skill){
 		let url=this.global.serverAddress+"api/add-skill.php?user_id="+this.global.session.flduser_id+"&skill="+skill;
 		this.http.get(url)
 		.subscribe(data => {
 			console.log(data);
 			let response=JSON.parse(data["_body"]);
 			if(response.response=="success"){
 				let alert = this.alertCtrl.create({
 					title: 'Skills',
 					subTitle: 'Skill successfully added!',
 					buttons: ['OK']
 				});
 				alert.present();
 				this.initSkills()
 			}else{
 				let toast = this.toastCtrl.create({
 					message: 'Skill could not be added!',
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
 		});
 	}
 }
