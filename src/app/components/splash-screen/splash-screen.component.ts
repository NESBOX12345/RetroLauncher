import { Component, OnInit, OnDestroy } from '@angular/core';
import { Select } from '@ngxs/store';
import { SettingsState } from 'src/app/shared/store/settings/settings.store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Lang } from 'src/app/shared/store/settings/types';

@Component({
  selector: 'retro-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss']
})
export class SplashScreenComponent implements OnInit, OnDestroy {
  @Select(SettingsState.lang) lang$: Observable<Lang>;
  welcome: string;
  title: string;
  destroy$ = new Subject<void>();
  constructor() {}

  ngOnInit(): void {
    this.lang$
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ title, welcome }) => {
        this.title = title;
        this.welcome = welcome;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
