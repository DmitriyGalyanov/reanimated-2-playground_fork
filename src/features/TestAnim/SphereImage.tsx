import React from 'react';
import { ImageStyle, StyleProp } from 'react-native';
import Animated from 'react-native-reanimated';

import sphereImg from './assets/sphere.png';

interface ISphereImageProps {
  style: StyleProp<Omit<ImageStyle, 'width' | 'height'>>;
  width: number;
  height: number;
}

const SphereImage: React.FC<ISphereImageProps> = ({ style, width, height }) => {
  return (
    <Animated.Image source={sphereImg} style={[style, { width, height }]} />
  );
};

export default SphereImage;
