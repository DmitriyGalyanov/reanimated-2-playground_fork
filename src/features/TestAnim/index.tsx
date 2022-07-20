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
import SparksImage from 'features/TestAnim/SparksImage';

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

  const {
    animatedStyle: sparksOpacityAnimatedStyle,
    hide: hideSparks,
    show: showSparks,
  } = useOpacityAnim({ initOpacity: 0 });

  const {
    animatedStyle: splashOpacityAnimatedStyle,
    hide: hideSplash,
    show: showSplash,
  } = useOpacityAnim({ initOpacity: 0 });

  const expandMainSphere = (
    duration: number = DEFAULT_MAIN_SPHERE_ANIM_DURATION,
  ) => {
    animateMainSphereScale([MAIN_SPHERE_EXPANDED_SCALE, { duration }]);
    showSparks({ duration });
    showSplash({ duration });
    runMainSphereSqueezeAnim();
  };
  const compressMainSphere = (
    duration: number = DEFAULT_MAIN_SPHERE_ANIM_DURATION,
  ) => {
    animateMainSphereScale([MAIN_SPHERE_COMPRESSED_SCALE, { duration }]);
    hideSparks({ duration });
    hideSplash({ duration });
    runMainSphereSqueezeAnim();
  };

  return (
    <>
      <View style={styles.buttonsBlock}>
        <Button
          title={'runMainSphereSqueezeAnim'}
          onPress={() => runMainSphereSqueezeAnim()}
        />
        <Button title={'expandMainSphere'} onPress={() => expandMainSphere()} />
        <Button
          title={'compressMainSphere'}
          onPress={() => compressMainSphere()}
        />
      </View>
      <View style={styles.animatedItemsContainer}>
        <Animated.View
          style={[styles.mainSphere, mainSphereScaleAnimatedStyle]}
        >
          <SphereImage
            style={mainSphereSqueezeAnimatedStyle}
            width={INIT_SPHERE_SIZE}
            height={INIT_SPHERE_SIZE}
          />
        </Animated.View>
        <SparksImage style={[styles.sparks, sparksOpacityAnimatedStyle]} />
        <Animated.View style={[styles.splash, splashOpacityAnimatedStyle]} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  buttonsBlock: { zIndex: ViewLayersEnum.topMost },

  animatedItemsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  mainSphere: {
    position: 'absolute',
    zIndex: ViewLayersEnum.second,
  },

  sparks: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    zIndex: ViewLayersEnum.third,
  },

  splash: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    zIndex: ViewLayersEnum.first,
  },
});

export default TestAnim;
