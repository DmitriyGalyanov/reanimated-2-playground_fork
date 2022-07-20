import React, { useCallback, useState, useEffect } from 'react';
import {
  StyleSheet,
  ViewStyle,
  LayoutChangeEvent,
  ViewProps,
  StyleProp,
} from 'react-native';

import Reanimated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated';

interface ISlidingViewProps {
  wrapStyle?: StyleProp<ViewStyle>;
  shouldShow: boolean;
  slideFrom: 'top' | 'right' | 'bottom' | 'left';
  slideOffset?: number;
  slideAnimDuration?: number;
  children: React.ReactNode;
  pointerEvents?: ViewProps['pointerEvents'];
}

const FALLBACK_SLIDE_OFFSET = -200;

const SlidingView: React.FC<ISlidingViewProps> = ({
  wrapStyle,
  shouldShow,
  slideFrom,
  slideOffset = 32,
  slideAnimDuration = 500,
  pointerEvents,
  children,
}) => {
  const [initSlideOffset, setInitSlideOffset] = useState<number>(
    FALLBACK_SLIDE_OFFSET,
  );
  const handleLayout = useCallback(
    (event: LayoutChangeEvent): void => {
      if (initSlideOffset !== FALLBACK_SLIDE_OFFSET) {
        return;
      }
      const { width, height } = event.nativeEvent.layout;
      switch (slideFrom) {
        case 'bottom':
        case 'top':
          setInitSlideOffset(-height);
          break;
        case 'right':
        case 'left':
          setInitSlideOffset(-width);
          break;
      }
    },
    [initSlideOffset, slideFrom],
  );

  const slideOffsetAnimated = useSharedValue(initSlideOffset);

  useEffect(() => {
    if (shouldShow) {
      slideOffsetAnimated.value = withTiming(slideOffset, {
        duration: slideAnimDuration,
      });
    } else {
      slideOffsetAnimated.value = withTiming(initSlideOffset, {
        duration: slideAnimDuration,
      });
    }
  }, [
    initSlideOffset,
    shouldShow,
    slideAnimDuration,
    slideOffset,
    slideOffsetAnimated,
  ]);

  const offsetAnimatedStyle = useAnimatedStyle(() => {
    // triggers an error, so u have to use switch
    // return {
    //   // [slideFrom]: slideOffsetAnimated.value,
    // };
    switch (slideFrom) {
      case 'bottom':
        return {
          bottom: slideOffsetAnimated.value,
        };
      case 'right':
        return {
          right: slideOffsetAnimated.value,
        };
      case 'top':
        return {
          top: slideOffsetAnimated.value,
        };
      case 'left':
        return {
          left: slideOffsetAnimated.value,
        };
    }
  }, [slideFrom]);

  return (
    <Reanimated.View
      style={[styles.wrap, wrapStyle, offsetAnimatedStyle]}
      onLayout={handleLayout}
      pointerEvents={pointerEvents}
    >
      {children}
    </Reanimated.View>
  );
};

const styles = StyleSheet.create({
  wrap: { position: 'absolute' },
});

export default SlidingView;
