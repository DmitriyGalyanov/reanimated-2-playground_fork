import { useCallback } from 'react';
import {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import {
  SINGLE_SQUEEZE_ANIM_DURATION,
  DEFAULT_ANIM_EASING,
} from 'features/sphereAnim/consts';
import {
  getAxisAnimsAmount,
  getRandomIntInclusive,
} from 'features/sphereAnim/helpers';

const useSqueezeAnim = () => {
  const scaleX = useSharedValue(1);
  const scaleY = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scaleX: scaleX.value }, { scaleY: scaleY.value }],
  }));

  const runSqueezeAnim = useCallback(
    (squeezesAmount: number = getAxisAnimsAmount()) => {
      // todo how to call withRepeat with random values on every animation?
      const createSequence = () => {
        const sequence = [...Array(squeezesAmount)].map(() =>
          withTiming(getRandomIntInclusive(85, 97) / 100, {
            duration: SINGLE_SQUEEZE_ANIM_DURATION,
            easing: DEFAULT_ANIM_EASING,
          }),
        );
        sequence.push(
          withTiming(1, { duration: SINGLE_SQUEEZE_ANIM_DURATION }),
        );
        return sequence;
      };
      // @ts-ignore | it works as expected
      scaleX.value = withSequence(...createSequence());
      // @ts-ignore | it works as expected
      scaleY.value = withSequence(...createSequence());
    },
    [scaleX, scaleY],
  );

  return { animatedStyle, runSqueezeAnim };
};

export default useSqueezeAnim;
