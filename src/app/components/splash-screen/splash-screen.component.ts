import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { trigger } from '@angular/animations';

import { FadeIn, FadeOut } from 'src/app/shared/animations/fade';
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
    ),
    trigger('finishSplash', FadeOut('show', 'hide', '300ms 1s  linear'))
  ]
})
export class SplashScreenComponent implements OnInit {
  @Output() splashEnd: EventEmitter<any> = new EventEmitter();
  splashFinish: boolean;
  constructor() {}

  ngOnInit(): void {}

  splashScreenEnd(): void {
    this.splashEnd.emit(true);
  }
}
