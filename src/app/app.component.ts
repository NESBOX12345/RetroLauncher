import { Component, OnInit } from '@angular/core';
import { trigger } from '@angular/animations';
import { Store } from '@ngxs/store';

import { environment } from 'environments/environment';
import { LoadAppSettings } from '@store/settings/settings.actions';
import { ElectronService } from '@services/electron/electron.service';
import { Menu } from './shared/types/menu';
import { FadeOut } from '@animations/fade';

@Component({
  selector: 'retro-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('finishSplash', FadeOut('show', 'hide', '300ms 1s  linear'))
  ]
})
export class AppComponent {
  retroLauncherLogo = 'assets/retro-launcher.png';
  splashScreenEnd: boolean;
  animationEnd: boolean;
  menus: Menu[];
  constructor(private store: Store, private electronService: ElectronService) {
    if (this.electronService.isElectronApp) {
      this.store.dispatch(new LoadAppSettings());
      // this.createMenus();
    }
  }

  createMenus(): void {
    const menu = this.electronService.remote.Menu.buildFromTemplate(this.menus);
    this.electronService.remote.Menu.setApplicationMenu(menu);
    window.addEventListener(
      'contextmenu',
      e => {
        console.log('ctx: ', e);
        e.preventDefault();

        menu.popup({ window: this.electronService.remote.getCurrentWindow() });
      },
      false
    );
  }
}
