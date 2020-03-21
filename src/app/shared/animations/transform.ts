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
 * @param styles - Any valid CSS tranfosrm property
 * @param time - Animation timing: 'duration delay easing'
 * @param childrens -- `Optional:` Specify a childrens animation triggers to run in parallel with the main animation.
 * - Child trigger name must have `@` prefix.
 * @example Usage Example:
 *
 * ```ts
 * animations: [
 *    trigger(
 *      'triggerName',
 *      Translate('void', '*', '0px', '150px', '500ms 500ms ease-in-out', ['childTriggerName']))
 * ]
 * ```
 *
 * @returns AnimationMetadata[]
 *
 */
export const Transform = (
  start: string,
  end: string,
  styles: string,
  time: string,
  childrens: string[] = []
): AnimationMetadata[] => {
  return [
    state(start, style({})),
    state(
      end,
      style({
        transform: styles
      })
    ),
    transition(
      `${start} => ${end}`,
      group([
        ...childrens.map(child =>
          query(child, animateChild(), { optional: true })
        ),
        animate(time, style({ transform: styles }))
      ])
    )
  ];
};
