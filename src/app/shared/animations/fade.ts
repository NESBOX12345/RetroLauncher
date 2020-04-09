import {
  style,
  animate,
  AnimationMetadata,
  state,
  transition,
  group,
  query,
  animateChild
} from '@angular/animations';

/**
 * @param start - Transition Start Name
 * @param end - Transition End Name
 * @param time - Animation timing: `duration delay easing`
 * @param childrens -- `Optional:` Specify a childrens animation triggers to run in parallel with the main animation.
 * - Child trigger name must have `@` prefix.
 * @example Usage Example:
 *
 * ```ts
 * animations: [
 *    trigger(
 *      'triggerName',
 *      FadeIn('void', '*', '1s 100ms ease-in-out', ['childTriggerName']))
 * ]
 * ```
 *
 * @returns AnimationMetadata[]
 *
 */
export const FadeIn = (
  start: string,
  end: string,
  time: string,
  childrens: string[] = []
): AnimationMetadata[] => {
  return [
    state(
      start,
      style({
        opacity: 0.5
      })
    ),
    state(
      end,
      style({
        opacity: 1
      })
    ),
    transition(`${start} => ${end}`, [
      group([
        ...childrens.map(child =>
          query(child, animateChild(), { optional: true })
        ),
        animate(time, style({ opacity: 1 }))
      ])
    ])
  ];
};

/**
 * @param start - Transition Start Name
 * @param end - Transition End Name
 * @param time - Animation timing: 'duration delay easing'
 * @param childrens -- `Optional:` Specify a childrens animation triggers to run in parallel with the main animation.
 * - Child trigger name must have `@` prefix.
 * @example Usage Example:
 *
 * ```ts
 * animations: [
 *    trigger(
 *      'triggerName',
 *      FadeOut('void', '*', '1s 100ms ease-in-out', ['childTriggerName']))
 * ]
 * ```
 *
 * @returns AnimationMetadata[]
 *
 */
export const FadeOut = (
  start: string,
  end: string,
  time: string,
  childrens: string[] = []
): AnimationMetadata[] => {
  return [
    state(
      start,
      style({
        opacity: 1
      })
    ),
    state(
      end,
      style({
        opacity: 0
      })
    ),
    transition(`${start} => ${end}`, [
      group([
        ...childrens.map(child =>
          query(child, animateChild(), { optional: true })
        ),
        animate(time, style({ opacity: 0 }))
      ])
    ])
  ];
};
