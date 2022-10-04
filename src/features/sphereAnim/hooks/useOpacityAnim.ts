import { useCallback } from 'react';
import {
  AnimationCallback,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  WithTimingConfig,
} from 'react-native-reanimated';

import { MAIN_SPHERE_ANIM_DURATION } from 'features/sphereAnim/consts';

type TUseOpactiyAnimArgs = { initOpacity?: number };

const useOpacityAnim = ({ initOpacity = 1 }: TUseOpactiyAnimArgs = {}) => {
  const opacity = useSharedValue(initOpacity);

  const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  const _animateOpacity = useCallback(
    ([
      toValue,
      { duration = MAIN_SPHERE_ANIM_DURATION, easing = Easing.quad } = {},
      callback,
    ]: Parameters<typeof withTiming>) => {
      opacity.value = withTiming(toValue, { duration, easing }, callback);
    },
    [opacity],
  );

  const hide = useCallback(
    ({
      duration,
      easing,
      callback,
    }: {
      duration: WithTimingConfig['duration'];
      easing?: WithTimingConfig['easing'];
      callback?: AnimationCallback;
    }) => {
      _animateOpacity([0, { duration, easing }, callback]);
    },
    [_animateOpacity],
  );
  const show = useCallback(
    ({
      duration,
      easing,
      callback,
    }: {
      duration: WithTimingConfig['duration'];
      easing?: WithTimingConfig['easing'];
      callback?: AnimationCallback;
    }) => {
      _animateOpacity([1, { duration, easing }, callback]);
    },
    [_animateOpacity],
  );

  return { animatedStyle, hide, show };
};

export default useOpacityAnim;
