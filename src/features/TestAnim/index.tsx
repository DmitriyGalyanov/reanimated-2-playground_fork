import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { INIT_SPHERE_SIZE, WINDOW_HEIGHT } from 'features/TestAnim/consts';
import { useSqueezeAnim, useScaleAnim } from 'features/TestAnim/hooks';
import SphereImage from 'features/TestAnim/SphereImage';

interface ITestAnimProps {}

const TestAnim: React.FC<ITestAnimProps> = () => {
  const {
    animatedStyle: mainSphereScaleAnimatedStyle,
    animateScale: animateMainSphereScale,
  } = useScaleAnim();

  const {
    animatedStyle: mainSphereSqueezeAnimatedStyle,
    runSqueezeAnim: runMainSphereSqueezeAnim,
  } = useSqueezeAnim();

  const runMainSphereAnimation = (toScale: number) => {
    animateMainSphereScale({ toScale });
    runMainSphereSqueezeAnim();
  };

  return (
    <View>
      <Animated.View style={[mainSphereScaleAnimatedStyle, styles.mainSphere]}>
        <SphereImage
          style={[mainSphereSqueezeAnimatedStyle]}
          width={INIT_SPHERE_SIZE}
          height={INIT_SPHERE_SIZE}
        />
      </Animated.View>
      <Button
        title={'runMainSphereSqueezeAnim'}
        onPress={() => runMainSphereSqueezeAnim()}
      />
      <Button
        title={'setMainSphereScaleTo 5'}
        onPress={() => runMainSphereAnimation(5)}
      />
      <Button
        title={'setMainSphereScaleTo 1'}
        onPress={() => runMainSphereAnimation(1)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainSphere: {
    position: 'absolute',
    top: WINDOW_HEIGHT / 2,
    alignSelf: 'center',
  },
});

export default TestAnim;
