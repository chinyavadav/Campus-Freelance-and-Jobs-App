import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { ApplicantsPage } from '../pages/applicants/applicants';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { EmployerLoginPage } from '../pages/employer-login/employer-login';
import { MySkillsPage } from '../pages/my-skills/my-skills';
import { MyApplicationsPage } from '../pages/my-applications/my-applications';
import { ChatPage } from '../pages/chat/chat';
import { ChatsPage } from '../pages/chats/chats';
import { CompanyProfilePage } from '../pages/company-profile/company-profile';
import { JobOpeningsPage } from '../pages/job-openings/job-openings';
import { JobDetailsPage } from '../pages/job-details/job-details';
import { SignupPage } from '../pages/signup/signup';
import { SettingsPage } from '../pages/settings/settings';

import { IonicStorageModule } from '@ionic/storage';
import { HttpModule} from '@angular/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GlobalProvider } from '../providers/global/global';
import { Camera } from '@ionic-native/camera';
import { CallNumber } from '@ionic-native/call-number';
import { ChatServiceProvider } from '../providers/chat-service/chat-service';

@NgModule({
  declarations: [
    MyApp,
    ApplicantsPage,
    HomePage,
    LoginPage,
    EmployerLoginPage,
    MySkillsPage,
    MyApplicationsPage,
    ChatPage,
    ChatsPage,
    CompanyProfilePage,
    JobOpeningsPage,
    JobDetailsPage,
    SignupPage,
    SettingsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot(),

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ApplicantsPage,
    HomePage,
    LoginPage,
    EmployerLoginPage,
    MySkillsPage,
    MyApplicationsPage,
    ChatPage,
    ChatsPage,
    CompanyProfilePage,
    JobOpeningsPage,
    JobDetailsPage,
    SignupPage,
    SettingsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GlobalProvider,
    Camera,
    ChatServiceProvider,
    CallNumber
  ]
})
export class AppModule {}
