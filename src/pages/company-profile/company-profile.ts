import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { GlobalProvider } from "../../providers/global/global";
import { Http } from '@angular/http';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomePage } from '../home/home';

/**
 * Generated class for the CompanyProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-company-profile',
  templateUrl: 'company-profile.html',
})
export class CompanyProfilePage {
 	company:any;
 	companyTypes=["Coorperate","Private Limited","Individual"];
 	defaultPhotoPath:string="assets/imgs/placeholder.jpg";
 	imgPath=this.defaultPhotoPath;
 	public formCompanyProfile: FormGroup;

 	constructor(public camera:Camera, public http:Http, public alertCtrl:AlertController ,public global:GlobalProvider ,public loadingCtrl:LoadingController , public toastCtrl: ToastController, public formBuilder:FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
 		this.formCompanyProfile=this.formBuilder.group({
 			company_name: ['',Validators.required],
 			company_type: ['',Validators.required],      
 			description: ['',Validators.required],
 			email: ['',Validators.required],
 			website: [''],

 		});
 	}

 	ionViewDidLoad() {
 		if(this.global.session.company.flduser_id){
 			this.company=this.global.session.company;
 			this.imgPath=this.global.session.company.fldpicture;
 		}else{
 			this.company=null;
 		}
 		console.log('ionViewDidLoad CompanyProfilePage');
 	}

 	returnHome(){
 		this.navCtrl.setRoot(HomePage);
 	}

 	update() {
 		if(this.formCompanyProfile.valid && this.imgPath!=this.defaultPhotoPath){
 			let loader = this.loadingCtrl.create({
 				content: "Processing...",
 				spinner:"bubbles"
 			});
 			loader.present();
 			let postData:any;
 			postData=this.formCompanyProfile.value;
 			postData["picture"]=this.imgPath;
 			postData["user_id"]=this.global.session.flduser_id;
 			let mybaseURL:string;
 			if(this.company){
 				mybaseURL=this.global.serverAddress+"api/edit-company.php";
 			}else{
 				mybaseURL=this.global.serverAddress+"api/add-company.php";
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
 					this.navCtrl.popToRoot();
 					//this.returnHome();
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
