import React from 'react';
import { ImageProps } from 'react-native';
import Animated from 'react-native-reanimated';

import sparksImg from 'features/sphereAnim/assets/sparks.png';

interface ISparksImageProps extends Omit<ImageProps, 'source'> {}

const SparksImage: React.FC<ISparksImageProps> = (props) => {
  return <Animated.Image {...props} source={sparksImg} />;
};

export default SparksImage;
