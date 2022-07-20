import React from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { View, Button } from 'react-native';

export default function PlaygroundExample() {
  const randomWidth = useSharedValue(10);

  console.log('render');
  const config = {
    duration: 500,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };

  const style = useAnimatedStyle(() => {
    return {
      width: withTiming(randomWidth.value, config),
    };
  });

  return (
    <View
      style={{
        // flex: 1,
        flexDirection: 'column',
        backgroundColor: 'yellow',
      }}
    >
      <Animated.View
        style={[{ width: 100, height: 80, backgroundColor: 'black' }, style]}
      />
      <Button
        title="toggle"
        onPress={() => {
          console.log('press');
          randomWidth.value = Math.random() * 350;
        }}
      />
    </View>
  );
}
