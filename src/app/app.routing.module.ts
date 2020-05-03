import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreferencesComponent } from '@components/windows/preferences/preferences.component';
import { FlexLayoutModule } from '@angular/flex-layout';

const routes: Routes = [
  {
    path: 'preferences',
    loadChildren: () =>
      import('@components/windows/preferences/preferences.module').then(
        m => m.PreferencesModule
      )
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      useHash: true
    }),
    FlexLayoutModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
