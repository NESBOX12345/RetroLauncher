import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  trigger,
  transition,
  useAnimation,
  group,
  query,
  animateChild
} from '@angular/animations';
import { Select } from '@ngxs/store';
import { SettingsState } from 'src/app/shared/store/settings/settings.store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Lang } from 'src/app/shared/store/settings/types';
import { FadeIn } from 'src/app/shared/animations/fade';
import { Transform } from 'src/app/shared/animations/transform';

@Component({
  selector: 'retro-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss'],
  animations: [
    trigger(
      'showOnScreen',
      FadeIn('void', '*', '500ms 100ms ease-in-out', [
        '@translateLine1',
        '@translateLine2',
        '@translateLine3',
        '@scaleTriangle',
        '@displayLogo'
      ])
    ),
    trigger(
      'translateLine1',
      Transform(
        'void',
        '*',
        'translate(50px, 130px)',
        '500ms 200ms ease-in-out'
      )
    ),
    trigger(
      'translateLine2',
      Transform(
        'void',
        '*',
        'rotate(60deg) translate(-6px, -76px)',
        '500ms 200ms ease-in-out'
      )
    ),
    trigger(
      'translateLine3',
      Transform(
        'void',
        '*',
        'rotate(-60deg) translate(-62px, -73px)',
        '500ms 200ms ease-in-out'
      )
    ),
    trigger(
      'scaleTriangle',
      Transform(
        'void',
        '*',
        'translate(0, 0) scale(0.6) rotate(180deg)',
        '500ms 200ms ease-in-out'
      )
    ),
    trigger(
      'scaleViewport',
      Transform(
        'void',
        '*',
        'scale(0.8) translateX(80px)',
        '500ms 200ms ease-in-out'
      )
    ),
    trigger(
      'displayLogo',
      Transform(
        'void',
        '*',
        'translateX(30px) skewX(30deg)',
        '800ms 700ms ease-in-out'
      )
    )
  ]
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
