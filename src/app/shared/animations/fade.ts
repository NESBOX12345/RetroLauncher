import { animation, style, animate } from '@angular/animations';

export const FadeIn = animation([
  style({
    opacity: 0
  }),
  animate('{{time}}', style({ opacity: 1 }))
]);

export const FadeOut = animation([
  style({
    opacity: 1
  }),
  animate('{{time}}', style({ opacity: 0 }))
]);
