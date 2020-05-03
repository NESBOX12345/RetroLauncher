import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { PreferencesComponent } from './preferences.component';

const routes: Routes = [
  {
    path: '',
    component: PreferencesComponent
  }
];

@NgModule({
  imports: [FlexLayoutModule, RouterModule.forChild(routes)],
  declarations: [PreferencesComponent]
})
export class PreferencesModule {}
