import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApplicantsPage } from './applicants';

@NgModule({
  declarations: [
    ApplicantsPage,
  ],
  imports: [
    IonicPageModule.forChild(ApplicantsPage),
  ],
})
export class ApplicantsPageModule {}
