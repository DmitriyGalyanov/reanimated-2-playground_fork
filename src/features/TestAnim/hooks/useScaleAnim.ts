import { useCallback } from 'react';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import {
  DEFAULT_MAIN_SPHERE_ANIM_DURATION,
  MAIN_SPHERE_ANIM_EASING,
} from 'features/TestAnim/consts';

const useScaleAnim = () => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const animateScale = useCallback(
    ([
      toValue,
      {
        duration = DEFAULT_MAIN_SPHERE_ANIM_DURATION,
        easing = MAIN_SPHERE_ANIM_EASING,
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
