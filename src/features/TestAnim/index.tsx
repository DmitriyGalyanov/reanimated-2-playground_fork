import React, { useRef } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';

import {
  INIT_SPHERE_SIZE,
  MAIN_SPHERE_COMPRESSED_SCALE,
  MAIN_SPHERE_EXPANDED_SCALE,
  MAIN_SPHERE_ANIM_DURATION,
  viewLayers,
} from 'features/TestAnim/consts';
import {
  useSqueezeAnim,
  useScaleAnim,
  useOpacityAnim,
} from 'features/TestAnim/hooks';
import SphereImage from 'features/TestAnim/SphereImage';
import SparksImage from 'features/TestAnim/SparksImage';
import CenterableSpheres, {
  TCenterableSpheresRef,
} from 'features/TestAnim/CenterableSpheres';
import { buttonTextColor } from 'shared/commonStyles';

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

  const flyingSpheresRef = useRef<TCenterableSpheresRef>(null);

  const expandMainSphere = (duration: number = MAIN_SPHERE_ANIM_DURATION) => {
    animateMainSphereScale([MAIN_SPHERE_EXPANDED_SCALE, { duration }]);
    setTimeout(() => {
      showSparks({ duration: MAIN_SPHERE_ANIM_DURATION / 2 });
    }, MAIN_SPHERE_ANIM_DURATION / 2);
    flyingSpheresRef.current?.centerSpheres();
    runMainSphereSqueezeAnim();
  };
  const compressMainSphere = (duration: number = MAIN_SPHERE_ANIM_DURATION) => {
    animateMainSphereScale([MAIN_SPHERE_COMPRESSED_SCALE, { duration }]);
    hideSparks({ duration: 0 });
    flyingSpheresRef.current?.decenterSpheres();
    runMainSphereSqueezeAnim();
  };

  return (
    <>
      <View style={viewLayers.topMost}>
        <Button
          color={buttonTextColor}
          title={'expandMainSphere'}
          onPress={() => expandMainSphere()}
        />
        <Button
          color={buttonTextColor}
          title={'compressMainSphere'}
          onPress={() => compressMainSphere()}
        />
      </View>
      <View style={styles.animatedItemsContainer}>
        <CenterableSpheres ref={flyingSpheresRef} />
        <Animated.View
          style={[styles.mainSphere, mainSphereScaleAnimatedStyle]}
        >
          <SphereImage
            style={mainSphereSqueezeAnimatedStyle}
            size={INIT_SPHERE_SIZE}
          />
        </Animated.View>
        <SparksImage style={[styles.sparks, sparksOpacityAnimatedStyle]} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  animatedItemsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  mainSphere: {
    position: 'absolute',
    ...viewLayers.second,
  },

  sparks: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    ...viewLayers.third,
  },
});

export default TestAnim;
