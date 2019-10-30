import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatPage } from './chat';
import { ChatServiceProvider } from "../../providers/chat-service/chat-service";


@NgModule({
  declarations: [
    ChatPage,
  ],
  imports: [
    IonicPageModule.forChild(ChatPage),
  ],
  exports: [
    ChatPage
  ],
  providers: [
    ChatServiceProvider,
  ]
})
export class ChatPageModule {}
