import { Component, OnDestroy } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';

import { Preferences } from '@store/settings/types';
import { SettingsState } from '@store/settings/settings.store';
import { takeUntil, switchMap } from 'rxjs/operators';
import { LangState } from '@store/lang/lang.store';
import { Preferences as LangPreferences } from '@store/lang/types';

@Component({
  selector: 'retro-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent implements OnDestroy {
  @Select(LangState.preferences) lang$: Observable<LangPreferences>;
  @Select(SettingsState.preferences) preferences$: Observable<Preferences>;
  keys: Array<string>;
  lang: LangPreferences;
  destroy$ = new Subject();
  constructor(private store: Store) {
    this.subscriptions();
  }

  ngOnDestroy() {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  subscriptions(): void {
    this.lang$
      .pipe(
        switchMap(lang => {
          if (lang) {
            this.keys = Object.keys(lang);
          }

          return this.preferences$;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(preferences => {
        if (preferences) {
          console.log(preferences);
        }
      });
  }
}
