import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { GlobalProvider } from "../../providers/global/global";
import { Http } from '@angular/http';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomePage } from '../home/home';


/**
 * Generated class for the JobDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
 	selector: 'page-job-details',
 	templateUrl: 'job-details.html',
 })
 export class JobDetailsPage {
 	job:any;
 	jobTypes=["Permanent", "Attatchement", "Part-time", "Freelance"];
 	jobStatus=["Open","Closed"];
 	defaultPhotoPath:string="assets/imgs/placeholder.jpg";
 	imgPath=this.defaultPhotoPath;
 	public formJobDetails: FormGroup;

 	constructor(public camera:Camera, public http:Http, public alertCtrl:AlertController ,public global:GlobalProvider ,public loadingCtrl:LoadingController , public toastCtrl: ToastController, public formBuilder:FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
 		let tempJob=navParams.get('job');
 		if(tempJob){
 			this.job=tempJob;
 			this.imgPath=this.job.fldpicture;
 		}else{
 			this.job=null;
 		}
 		this.formJobDetails=this.formBuilder.group({
 			title: ['',Validators.required],
 			job_type: ['',Validators.required],
 			job_status: ['',Validators.required],
 			due_timestamp: ['',Validators.required],     
 			description: ['',Validators.required],
 			offer: ['',Validators.required],
 		});
 	}

 	ionViewDidLoad() {
 		console.log('ionViewDidLoad JobDetailsPage');
 	}

 	returnHome(){
 		this.navCtrl.setRoot(HomePage);
 	}

 	update() {
 		if(this.formJobDetails.valid && this.imgPath!=this.defaultPhotoPath){
 			let loader = this.loadingCtrl.create({
 				content: "Processing...",
 				spinner:"bubbles"
 			});
 			loader.present();
 			let postData:any;
 			postData=this.formJobDetails.value;
 			postData["picture"]=this.imgPath;
 			postData["user_id"]=this.global.session.flduser_id;
 			let mybaseURL:string;
 			if(this.job){
 				mybaseURL=this.global.serverAddress+"api/edit-job.php?job_id="+this.job.fldjob_id;
 			}else{
 				mybaseURL=this.global.serverAddress+"api/add-job.php";
 			}
 			this.http.post(mybaseURL, JSON.stringify(postData))
 			.subscribe(data => {
 				console.log(data["_body"]);
 				let response = JSON.parse(data["_body"]);
 				if(response.response=="success"){
 					loader.dismiss();
 					let alert = this.alertCtrl.create({
 						title: 'Company Profile',
 						subTitle: "Company successfully saved!",
 						buttons: ['OK']
 					});
 					alert.present();
 				}else{
 					loader.dismiss();
 					let alert = this.alertCtrl.create({
 						title: 'Company Profile',
 						subTitle: 'Company could not be saved!',
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
 				toast.present();
 			}
 			);
 		}else{
 			let toast = this.toastCtrl.create({
 				message: 'Properly fill in all details!',
 				duration: 3000,
 				position: 'bottom',
 				cssClass: 'dark-trans',
 				closeButtonText: 'OK',
 				showCloseButton: true
 			});
 			toast.present();
 		}
 	}

 	takePhoto(){
 		const options: CameraOptions = {
 			quality: 70,
 			destinationType: this.camera.DestinationType.DATA_URL,
 			//sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
 			encodingType: this.camera.EncodingType.JPEG,
 			mediaType: this.camera.MediaType.PICTURE,
 			saveToPhotoAlbum: false,
 			allowEdit: false,
 			targetWidth:  500,
 			targetHeight: 500
 		}

 		this.camera.getPicture(options).then((imageData) => {
 			this.imgPath = 'data:image/jpeg;base64,' + imageData;
 		}, (err) => {
 			this.imgPath=this.defaultPhotoPath;
 			let toast = this.toastCtrl.create({
 				message: 'Could not access camera!',
 				duration: 3000,
 				position: 'bottom',
 				cssClass: 'dark-trans',
 				closeButtonText: 'OK',
 				showCloseButton: true
 			});
 			toast.present();
 		});
 	}

 	getPhoto(){
 		const options: CameraOptions = {
 			quality: 70,
 			destinationType: this.camera.DestinationType.DATA_URL,
 			sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
 			saveToPhotoAlbum: false,
 			allowEdit: true,
 			targetWidth: 500,
 			targetHeight: 500
 		}

 		this.camera.getPicture(options).then((imageData) => {
 			this.imgPath = 'data:image/jpeg;base64,' + imageData;
 		}, (err) => {
 			this.imgPath=this.defaultPhotoPath;
 			let toast = this.toastCtrl.create({
 				message: 'Could not open Gallery!',
 				duration: 3000,
 				position: 'bottom',
 				cssClass: 'dark-trans',
 				closeButtonText: 'OK',
 				showCloseButton: true
 			});
 			toast.present();
 		});
 	}
 }
