import React from 'react';
import { ImageProps, ImageStyle, StyleProp } from 'react-native';
import Animated from 'react-native-reanimated';

import sphereImg from './assets/sphere.png';

interface ISphereImageProps extends Omit<ImageProps, 'source' | 'style'> {
  style: StyleProp<Omit<ImageStyle, 'width' | 'height'>>;
  width: number;
  height: number;
}

const SphereImage: React.FC<ISphereImageProps> = ({
  style,
  width,
  height,
  ...props
}) => {
  return (
    <Animated.Image
      source={sphereImg}
      style={[style, { width, height }]}
      {...props}
    />
  );
};

export default SphereImage;
