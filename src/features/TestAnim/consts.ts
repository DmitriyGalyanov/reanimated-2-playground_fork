import { Easing } from 'react-native-reanimated';

export const INIT_SPHERE_SIZE = 40;
export const MAIN_SPHERE_COMPRESSED_SCALE = 1;
export const MAIN_SPHERE_EXPANDED_SCALE = 5;

export const DEFAULT_SINGLE_SQUEEZE_ANIM_DURATION = 100;
export const DEFAULT_MAIN_SPHERE_ANIM_DURATION = 5000;
export const MAIN_SPHERE_ANIM_EASING = Easing.quad;

/**
 * { zIndex: ViewLayersEnum.second } overlaps { zIndex: ViewLayersEnum.fourth }
 */
export enum ViewLayersEnum {
  'topMost' = 1000,
  'first' = 50,
  'second' = 40,
  'third' = 30,
  'fourth' = 20,
  'fifth' = 10,
}
