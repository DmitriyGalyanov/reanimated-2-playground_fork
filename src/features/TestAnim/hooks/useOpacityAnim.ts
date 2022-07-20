import { useCallback } from 'react';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type TUseOpactiyAnimArgs = { initOpacity?: number };

const useOpacityAnim = ({ initOpacity = 1 }: TUseOpactiyAnimArgs = {}) => {
  const opacity = useSharedValue(initOpacity);

  const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  const _animateOpacity = useCallback(
    ({ toValue, duration }: { toValue: number; duration?: number }) => {
      if (toValue === undefined || duration === undefined) {
        return;
      }

      opacity.value = withTiming(toValue, { duration });
    },
    [opacity],
  );

  const hide = useCallback(
    (duration: number) => {
      _animateOpacity({ toValue: 0, duration });
    },
    [_animateOpacity],
  );
  const show = useCallback(
    (duration: number) => {
      _animateOpacity({ toValue: 1, duration });
    },
    [_animateOpacity],
  );

  return { animatedStyle, hide, show };
};

export default useOpacityAnim;
