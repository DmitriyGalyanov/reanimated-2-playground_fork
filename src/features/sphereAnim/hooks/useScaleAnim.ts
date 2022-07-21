import { useCallback } from 'react';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import {
  MAIN_SPHERE_ANIM_DURATION,
  DEFAULT_ANIM_EASING,
} from 'features/sphereAnim/consts';

const useScaleAnim = () => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const animateScale = useCallback(
    ([
      toValue,
      {
        duration = MAIN_SPHERE_ANIM_DURATION,
        easing = DEFAULT_ANIM_EASING,
      } = {},
      callback,
    ]: Parameters<typeof withTiming>) => {
      scale.value = withTiming(toValue, { duration, easing }, callback);
    },
    [scale],
  );

  return { animatedStyle, animateScale };
};

export default useScaleAnim;
