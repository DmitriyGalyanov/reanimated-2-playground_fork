import React from 'react';
import { ImageProps, ImageStyle, StyleProp } from 'react-native';
import Animated from 'react-native-reanimated';

import sphereImg from './assets/sphere.png';

interface ISphereImageProps extends Omit<ImageProps, 'source' | 'style'> {
  style: StyleProp<Omit<ImageStyle, 'width' | 'height'>>;
  size: number;
}

const SphereImage: React.FC<ISphereImageProps> = ({
  style,
  size,
  ...props
}) => {
  return (
    <Animated.Image
      source={sphereImg}
      style={[style, { width: size, height: size }]}
      {...props}
    />
  );
};

export default SphereImage;
