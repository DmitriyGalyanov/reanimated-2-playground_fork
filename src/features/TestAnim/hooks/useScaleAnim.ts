import { useCallback } from 'react';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { DEFAULT_MAIN_SPHERE_ANIM_DURATION } from 'features/TestAnim/consts';

const useScaleAnim = () => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const animateScale = useCallback(
    ({
      toScale,
      duration = DEFAULT_MAIN_SPHERE_ANIM_DURATION,
    }: {
      toScale: number;
      duration?: number;
    }) => {
      scale.value = withTiming(toScale, { duration });
    },
    [scale],
  );

  return { animatedStyle, animateScale };
};

export default useScaleAnim;
