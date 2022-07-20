import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';

import {
  INIT_SPHERE_SIZE,
  MAIN_SPHERE_COMPRESSED_SCALE,
  MAIN_SPHERE_EXPANDED_SCALE,
  DEFAULT_MAIN_SPHERE_ANIM_DURATION,
  ViewLayersEnum,
} from 'features/TestAnim/consts';
import {
  useSqueezeAnim,
  useScaleAnim,
  useOpacityAnim,
} from 'features/TestAnim/hooks';
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

  const expandMainSphere = (
    duration: number = DEFAULT_MAIN_SPHERE_ANIM_DURATION,
  ) => {
    animateMainSphereScale([MAIN_SPHERE_EXPANDED_SCALE, { duration }]);

    runMainSphereSqueezeAnim();
  };
  const compressMainSphere = (
    duration: number = DEFAULT_MAIN_SPHERE_ANIM_DURATION,
  ) => {
    animateMainSphereScale([MAIN_SPHERE_COMPRESSED_SCALE, { duration }]);

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
