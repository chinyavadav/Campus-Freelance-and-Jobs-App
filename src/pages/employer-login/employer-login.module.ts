import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmployerLoginPage } from './employer-login';

@NgModule({
  declarations: [
    EmployerLoginPage,
  ],
  imports: [
    IonicPageModule.forChild(EmployerLoginPage),
  ],
})
export class EmployerLoginPageModule {}
