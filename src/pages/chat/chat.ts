import { Component, ElementRef, ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Events, Content } from 'ionic-angular';
//import { ProfilePage } from '../profile/profile';
import { CallNumber } from '@ionic-native/call-number';
import { ChatServiceProvider, ChatMessage, UserInfo } from "../../providers/chat-service/chat-service";
import { GlobalProvider } from "../../providers/global/global";

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
   selector: 'page-chat',
   templateUrl: 'chat.html',
 })
 export class ChatPage {
   @ViewChild(Content) content: Content;
   @ViewChild('chat_input') messageInput: ElementRef;
   //msgList: ChatMessage[] = [];
   externalAccount: UserInfo;
   editorMsg = '';
   showEmojiPicker = false;
   chat:any;
   constructor(public callNumber: CallNumber, public global:GlobalProvider, public navCtrl: NavController, public navParams: NavParams,private chatService: ChatServiceProvider ,private events: Events) {
     if(navParams.get('userid')==null){
       this.externalAccount={
         userid: '',
         phoneno: '',
         fullname: '',
       }
       this.navCtrl.pop();
     }else{
       this.externalAccount={
         userid: navParams.get('userid'),
         phoneno: navParams.get('phoneno'),
         fullname: navParams.get('fullname'),
       }
     }
   }

   call(){
     let number=this.externalAccount.phoneno;
     this.callNumber.callNumber(number, true)
     .then(res => console.log('Launched dialer!', res))
     .catch(err => console.log('Error launching dialer', err));
   }

/*  viewProfile(userid:string){
    this.navCtrl.push(ProfilePage,{"userid":userid});
  }*/

  ionViewWillLeave() {
    this.events.unsubscribe('chat:received');
  }

  ionViewDidEnter() {
    this.events.subscribe('chat:received', msg => {
      this.pushNewMsg(msg);
    });
    this.getMessages();
  }

  getMessages(){
    this.chatService.getMsg();
    this.chat=this.chatService.msgList.filter((message)=> (message.toUserId==this.global.session.flduser_id && message.fromUserId==this.externalAccount.userid) || (message.fromUserId==this.global.session.flduser_id && message.toUserId==this.externalAccount.userid));
    this.onFocus();
  }

  onFocus() {
    this.showEmojiPicker = false;
    this.content.resize();
    this.scrollToBottom();
  }

  switchEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
    if (!this.showEmojiPicker) {
      this.focus();
    } else {
      this.setTextareaScroll();}

      this.content.resize();
      this.scrollToBottom();
    }

  /**
   * @name sendMsg
   */
   sendMsg(msgtype) {
     if (!this.editorMsg.trim()) return;
     let newMsg: ChatMessage = {
       messageId: Date.now().toString(),
       fromUserId: this.global.session.flduser_id,
       fromUserName: this.global.session.fldforename+' '+this.global.session.fldsurname,
       toUserName: this.externalAccount.fullname,
       toUserId: this.externalAccount.userid,
       time: Date.now(),
       message: this.editorMsg,
       type: msgtype,
       status: 'success'
     };

     this.pushNewMsg(newMsg);
     this.editorMsg = '';

     if (!this.showEmojiPicker) {
       this.focus();
     }
     this.chatService.sendMsg(newMsg);
   }

  /**
   * @name pushNewMsg
   * @param msg
   */
   pushNewMsg(msg: ChatMessage) {
     const userid = this.externalAccount.userid;
     const toUserId = this.global.session.flduser_id;
     if (msg.fromUserId === userid && msg.toUserId === toUserId) {
       this.chat.push(msg);
     } else if (msg.toUserId === userid && msg.fromUserId === toUserId) {
       this.chat.push(msg);
     }
     this.scrollToBottom();
   }

   getMsgIndexById(id: string) {
     return this.chatService.msgList.findIndex(e => e.messageId === id)
   }

   scrollToBottom() {
     setTimeout(() => {
       if (this.content.scrollToBottom) {
         try{
           this.content.scrollToBottom();
         }catch{

         }        
       }
     }, 400)
   }

   private focus() {
     if (this.messageInput && this.messageInput.nativeElement) {
       this.messageInput.nativeElement.focus();
     }
   }

   private setTextareaScroll() {
     const textarea =this.messageInput.nativeElement;
     textarea.scrollTop = textarea.scrollHeight;
   }

 }
