import React, { useCallback, useEffect, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  WithTimingConfig,
} from 'react-native-reanimated';

import {
  COLLIDING_SPHERES_CHUNK_ANIM_DURATION,
  COLLIDING_SPHERES_EASING,
  INIT_SPHERE_SIZE,
  viewLayers,
} from 'features/sphereAnim/consts';
import { TViewCenter } from 'features/sphereAnim/CenterableSpheres/types';
import SphereImage from 'features/sphereAnim/SphereImage';

interface ICenterableSphereProps {
  position: {
    top?: number;
    left?: number;
  };
  wrapCenter: TViewCenter;
  shouldFlyToCenter: boolean;
}

const CenterableSphere: React.FC<ICenterableSphereProps> = ({
  position,
  wrapCenter,
  shouldFlyToCenter,
}) => {
  const centeredPosition = useMemo(
    () => ({
      top: wrapCenter.top - INIT_SPHERE_SIZE / 2,
      left: wrapCenter.left - INIT_SPHERE_SIZE / 2,
    }),
    [wrapCenter.top, wrapCenter.left],
  );

  const animatedTop = useSharedValue(position.top);
  const animatedLeft = useSharedValue(position.left);

  // doesn't take a param but uses a prop since only being called in useEffect
  const animatePosition = useCallback(() => {
    const userConfig: WithTimingConfig = {
      duration: COLLIDING_SPHERES_CHUNK_ANIM_DURATION,
      easing: COLLIDING_SPHERES_EASING,
    };

    const top = shouldFlyToCenter ? centeredPosition.top : position.top;
    const left = shouldFlyToCenter ? centeredPosition.left : position.left;
    if (top) {
      animatedTop.value = withTiming(top, userConfig);
    }
    if (left) {
      animatedLeft.value = withTiming(left, userConfig);
    }
  }, [
    animatedLeft,
    animatedTop,
    centeredPosition.left,
    centeredPosition.top,
    position.left,
    position.top,
    shouldFlyToCenter,
  ]);

  useEffect(() => {
    animatePosition();
  }, [animatePosition, shouldFlyToCenter]);

  const positionAnimatedStyle = useAnimatedStyle(() => {
    return {
      top: animatedTop.value,
      left: animatedLeft.value,
    };
  });

  return (
    <SphereImage
      style={[styles.sphere, positionAnimatedStyle]}
      size={INIT_SPHERE_SIZE}
    />
  );
  return shouldFlyToCenter ? (
    <SphereImage
      style={[styles.sphere, positionAnimatedStyle]}
      size={INIT_SPHERE_SIZE}
    />
  ) : null;
};

const styles = StyleSheet.create({
  sphere: { position: 'absolute', ...viewLayers.second },
});

export default CenterableSphere;
