import { Component } from '@angular/core';
import { Store } from '@ngxs/store';

import { GetSettings } from './shared/store/settings/settings.actions';

@Component({
  selector: 'retro-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showSplashScreen = true;
  constructor(private store: Store) {
    this.store.dispatch(new GetSettings());
  }
}
