import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyApplicationsPage } from './my-applications';

@NgModule({
  declarations: [
    MyApplicationsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyApplicationsPage),
  ],
})
export class MyApplicationsPageModule {}
