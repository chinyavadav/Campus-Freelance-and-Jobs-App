import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JobOpeningsPage } from './job-openings';

@NgModule({
  declarations: [
    JobOpeningsPage,
  ],
  imports: [
    IonicPageModule.forChild(JobOpeningsPage),
  ],
})
export class JobOpeningsPageModule {}
