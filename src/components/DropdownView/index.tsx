import React, { useCallback, useState } from 'react';
import {
  LayoutChangeEvent,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import CaretUp from './assets/caretUp.svg';

export enum ContainerStateIdEnum {
  close = 0,
  open = 1,
}

interface IDropdownViewProps {
  wrapStyle?: StyleProp<ViewStyle>;
  titleWrapStyle?: StyleProp<ViewStyle>;
  titleTextProps?: StyleProp<TextStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  minContentWidthInPercents?: number;
  initialContainerState?: ContainerStateIdEnum;
  title: string;
  shouldRenderTitleWhenEmpty?: boolean;
  children: React.ReactNode;
}

enum PositionTypeEnum {
  relative = 'relative',
  absolute = 'absolute',
}

// affects width otherwise
const MIN_CONTAINER_HEIGHT = 0.01;

const DropdownView: React.FC<IDropdownViewProps> = ({
  wrapStyle,
  titleWrapStyle,
  titleTextProps,
  contentContainerStyle,
  minContentWidthInPercents = 100,
  initialContainerState = ContainerStateIdEnum.close,
  title,
  shouldRenderTitleWhenEmpty = true,
  children,
}) => {
  const [openedContainerHeight, setOpenedContainerHeight] = useState(
    MIN_CONTAINER_HEIGHT,
  );

  const isEmpty = !children || openedContainerHeight <= MIN_CONTAINER_HEIGHT;

  const [containerStateId, setContainerStateId] = useState<
    ContainerStateIdEnum
  >(ContainerStateIdEnum.close);

  const animatedContainerStateId = useSharedValue<ContainerStateIdEnum>(
    ContainerStateIdEnum.close,
  );

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(
        animatedContainerStateId.value,
        [ContainerStateIdEnum.close, ContainerStateIdEnum.open],
        [MIN_CONTAINER_HEIGHT, openedContainerHeight],
      ),
    };
  });

  const animateContainerState = useCallback(
    ({ toValue }: { toValue: ContainerStateIdEnum }) => {
      animatedContainerStateId.value = withTiming(toValue);
    },
    [animatedContainerStateId],
  );
  const openContainer = useCallback(() => {
    setContainerStateId(ContainerStateIdEnum.open);
    animateContainerState({
      toValue: ContainerStateIdEnum.open,
    });
  }, [animateContainerState]);
  const closeContainer = useCallback(() => {
    setContainerStateId(ContainerStateIdEnum.close);
    animateContainerState({ toValue: ContainerStateIdEnum.close });
  }, [animateContainerState]);

  const handleTitlePress = () => {
    if (containerStateId === ContainerStateIdEnum.open) {
      closeContainer();
    } else {
      openContainer();
    }
  };

  // caret animation
  const animatedCaretStyle = useAnimatedStyle(() => {
    const rotateDegree = interpolate(
      animatedContainerStateId.value,
      [ContainerStateIdEnum.close, ContainerStateIdEnum.open],
      [90, 180],
    );
    return {
      transform: [{ rotate: `${rotateDegree} deg` }],
    };
  });

  const handleContainerLayout = (event: LayoutChangeEvent) => {
    console.log('layout', event.nativeEvent.layout);
    console.log('dimensions', openedContainerHeight);

    if (event.nativeEvent.layout.height > openedContainerHeight) {
      setOpenedContainerHeight(event.nativeEvent.layout.height);
    } else {
      return;
    }

    setOpenedContainerHeight(event.nativeEvent.layout.height);

    initialContainerState && openContainer();
  };

  // styles
  const finalWrapStyle = StyleSheet.flatten([
    styles.wrap,
    wrapStyle,
    { minWidth: `${minContentWidthInPercents}%` },
  ]);
  const finalTitleWrapStyle: StyleProp<ViewStyle> = [
    styles.defaultTitleWrap,
    !shouldRenderTitleWhenEmpty && isEmpty && styles.hidden,
    titleWrapStyle,
  ];
  const finalTitleTextStyle: StyleProp<TextStyle> = [
    styles.defaultTitleText,
    titleTextProps,
  ];
  const finalCaretStyle = [styles.caretWrap, animatedCaretStyle];

  const finalContentContainerStyle = [
    styles.defaultContentContainerStyle,
    contentContainerStyle,
    {
      position:
        containerStateId === ContainerStateIdEnum.open
          ? PositionTypeEnum.relative
          : PositionTypeEnum.absolute,
    },
  ];

  return (
    <View style={finalWrapStyle}>
      <TouchableOpacity onPress={handleTitlePress} style={finalTitleWrapStyle}>
        <View style={styles.row}>
          <Text style={finalTitleTextStyle}>{title}</Text>
          <Animated.View style={finalCaretStyle}>
            <CaretUp />
          </Animated.View>
        </View>
      </TouchableOpacity>
      <Animated.View
        style={[
          animatedContainerStyle,
          { minWidth: `${minContentWidthInPercents}%` },
        ]}
      >
        <View
          onLayout={handleContainerLayout}
          style={finalContentContainerStyle}
        >
          {children}
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: { flexDirection: 'row' },
  hidden: { position: 'absolute', opacity: 0 },

  wrap: { overflow: 'hidden' },
  defaultContentContainerStyle: { overflow: 'hidden' },

  caretWrap: { marginLeft: 8 },
  defaultTitleWrap: { marginBottom: 16 },
  defaultTitleText: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default DropdownView;
