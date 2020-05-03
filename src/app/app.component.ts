import { Component, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { trigger } from '@angular/animations';
import { Store, Select } from '@ngxs/store';
import { Subject, Observable } from 'rxjs';
import { takeUntil, filter, take } from 'rxjs/operators';

import { ElectronService } from '@services/electron/electron.service';
import { LanguageService } from '@services/language/language.service';
import { FadeOut } from '@animations/fade';
import { LoadAppSettings, SetTheme } from '@store/settings/settings.actions';
import { SettingsState } from '@store/settings/settings.store';
import { Theme } from '@store/settings/types';
import { SetLanguageData } from '@store/lang/lang.actions';
import { LangState } from '@store/lang/lang.store';
import { Menu } from '@store/lang/types';

@Component({
  selector: 'retro-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('finishSplash', FadeOut('show', 'hide', '300ms 1s  linear'))
  ]
})
export class AppComponent implements OnDestroy {
  @Select(SettingsState.language) language$: Observable<string>;
  @Select(SettingsState.theme) theme$: Observable<Theme>;
  @Select(LangState.menus) menus$: Observable<Menu[]>;
  isMainProcess: boolean;
  splashScreenEnd: boolean;
  animationStart: boolean;
  animationEnd: boolean;
  loading = true;
  destroy$ = new Subject();

  constructor(
    private store: Store,
    private router: Router,
    private title: Title,
    private electronService: ElectronService,
    private languageService: LanguageService
  ) {
    if (this.electronService.isElectronApp) {
      this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe((end: NavigationEnd) => {
          if (end.url === '/') {
            this.isMainProcess = true;
          } else {
            this.isMainProcess = false;
            // Connect to menust store
            // this.title.setTitle(end.url.replace('/', ''));
          }
          // Load app settings
          this.subscriptions();
          this.store.dispatch(new LoadAppSettings());
        });
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  subscriptions(): void {
    this.language$.pipe(takeUntil(this.destroy$)).subscribe(language => {
      // Load app language
      const langData = this.languageService.language(language);
      this.store.dispatch(new SetLanguageData(langData));
    });
    this.theme$.pipe(takeUntil(this.destroy$)).subscribe(theme => {
      if (theme) {
        const { value } = theme;
        const scheme = theme.colorSchemes[value];
        this.store.dispatch(new SetTheme(scheme));
        this.electronService.backgroundColor$.next(scheme[0].value);
        this.loading = false;
      }
    });
    this.menus$.pipe(take(1)).subscribe(menus => {
      if (this.isMainProcess) {
        this.electronService.setAppMenus(menus);
      }
    });
  }

  // setAppMenusEvent(menus: Menu[]): Menu[] {}
}
