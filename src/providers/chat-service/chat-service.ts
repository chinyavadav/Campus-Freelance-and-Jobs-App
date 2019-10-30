import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators/map';
import { Http } from "@angular/http";
import { Observable } from "rxjs/observable";
import { GlobalProvider } from '../../providers/global/global';

export class ChatMessage {
  messageId: string;
  fromUserId: string;
  fromUserName: string;
  toUserId: string;
  toUserName: string;
  time: number | string;
  message: string;
  type?: string;
  status: string;
}

export class UserInfo {
  userid: string;
  phoneno?: string;
  fullname?: string;
}

@Injectable()
export class ChatServiceProvider {
  msgList: ChatMessage[] = [];
  constructor(public global: GlobalProvider, private http: Http) {
  }

  getMsg() {
    // Get mock message list
    return this.getMsgList().subscribe(res => {
      console.log(res);
        this.msgList=res;//filter(item => (item.userid.indexOf(this.localAccount.phoneno) !== -1 && item.toUserId.indexOf(this.externalAccount.phoneno) !== -1) || (item.userid.indexOf(this.externalAccount.phoneno) !== -1 && item.toUserId.indexOf(this.localAccount.phoneno) !== -1)) ;
    });
  }

  getMsgList(): Observable<ChatMessage[]> {
    const msgListUrl = this.global.serverAddress+'api/messages.php?userid='+this.global.session.flduser_id; //msg-list.json
    return this.http.get(msgListUrl).pipe(map(response =>JSON.parse(response["_body"]).array));
  }

  sendMsg(msg: ChatMessage) {
    console.log(msg);
    this.http.get(this.global.serverAddress+'api/message.php?from='+msg.fromUserId+"&to="+msg.toUserId+"&message="+msg.message+"&type="+msg.type)
      .subscribe(data => {
        console.log(data['_body']);
        let response=JSON.parse(data["_body"]);
        if(response.response=="success"){
          this.getMsg();
        }
      }, error => {
        console.log("failed to send");
      }
    );
  }

  getUserInfo(): Promise<UserInfo> {
    const userInfo: UserInfo = {
      userid: this.global.session.flduser_id,
      phoneno: this.global.session.fldphone_no,
      fullname: this.global.session.fldforename+' '+this.global.session.fldsurname,
    };
    return new Promise(resolve => resolve(userInfo));
  }

}