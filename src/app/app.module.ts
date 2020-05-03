import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

import { environment } from 'environments/environment';
import { AppComponent } from './app.component';
import { SplashScreenComponent } from './components/splash-screen/splash-screen.component';
import { SettingsState } from './shared/store/settings/settings.store';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { LangState } from '@store/lang/lang.store';
import { AppRoutingModule } from './app.routing.module';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    NgxsModule.forRoot([SettingsState, LangState], {
      developmentMode: !environment.production
    }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    AppRoutingModule
  ],
  declarations: [AppComponent, SplashScreenComponent, SidenavComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
