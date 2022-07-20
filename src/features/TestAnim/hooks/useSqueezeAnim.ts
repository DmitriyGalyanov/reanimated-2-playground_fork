import { useCallback } from 'react';
import {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { DEFAULT_SINGLE_SQUEEZE_ANIM_DURATION } from 'features/TestAnim/consts';
import {
  getAxisAnimsAmount,
  getRandomIntInclusive,
} from 'features/TestAnim/helpers';

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
          withTiming(getRandomIntInclusive(90, 97) / 100, {
            duration: DEFAULT_SINGLE_SQUEEZE_ANIM_DURATION,
          }),
        );
        sequence.push(
          withTiming(1, { duration: DEFAULT_SINGLE_SQUEEZE_ANIM_DURATION }),
        );
        return sequence;
      };
      scaleX.value = withSequence(...createSequence());
      scaleY.value = withSequence(...createSequence());
    },
    [scaleX, scaleY],
  );

  return { animatedStyle, runSqueezeAnim };
};

export default useSqueezeAnim;
