import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { Tab1Page } from './tab1.page';
import { Tab1PageRoutingModule } from './tab1-routing.module';

import { CanadaUpdatesComponent } from '../canada-summary/components/canada-updates/canada-updates.component';

@NgModule({
  declarations: [
    Tab1Page,
    CanadaUpdatesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab1PageRoutingModule
  ]
})
export class Tab1PageModule {}
