import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Button, LayoutChangeEvent, View } from 'react-native';

import { commonStyles } from 'shared';
import {
  COLLIDING_SPHERES_AMOUNT,
  COLLIDING_SPHERES_CHUNK_ANIM_DURATION,
  COLLIDING_SPHERES_IN_RANGE_AMOUNT,
  viewLayers,
} from 'features/sphereAnim/consts';
import { TViewCenter } from 'features/sphereAnim/CenterableSpheres/types';
import CenterableSphere from 'features/sphereAnim/CenterableSpheres/CenterableSphere';
import createSpheresPositions from 'features/sphereAnim/CenterableSpheres/createSpheresPositions';
import { buttonTextColor } from 'shared/commonStyles';

export type TCenterableSpheresRef = {
  centerSpheres: () => void;
  decenterSpheres: () => void;
};

interface ICenterableSpheresProps {}

const CenterableSpheres = React.forwardRef<
  TCenterableSpheresRef,
  ICenterableSpheresProps
>((_, ref) => {
  const [initialSpheresPositions, setInitialSpheresPositions] = useState<
    TViewCenter[]
  >([]);

  const [wrapCenter, setWrapCenter] = useState<TViewCenter | undefined>();

  const [spheresHeadedToCenter, setSpheresHeadedToCenter] = useState<number[]>(
    [],
  );

  const centeringSpheresIntervalId = useRef<number>();
  const centerSpheres = () => {
    const addSpheres = (
      amount: number = Math.floor(COLLIDING_SPHERES_IN_RANGE_AMOUNT / 2),
    ) => {
      setSpheresHeadedToCenter((value) => {
        const alreadyHeadedToCenterSpheresAmount = value.length;

        if (alreadyHeadedToCenterSpheresAmount >= COLLIDING_SPHERES_AMOUNT) {
          clearInterval(centeringSpheresIntervalId?.current);
          centeringSpheresIntervalId.current = undefined;
          return value;
        }
        const newValue = [...value];
        const nextChunkIndices = [...Array(amount)].map(
          (_, index) => alreadyHeadedToCenterSpheresAmount + index,
        );

        newValue.push(...nextChunkIndices);

        return newValue;
      });
    };
    addSpheres(COLLIDING_SPHERES_AMOUNT / 10);
    centeringSpheresIntervalId.current = setInterval(
      addSpheres,
      COLLIDING_SPHERES_CHUNK_ANIM_DURATION / 2,
    );
  };
  const decenterSpheres = () => {
    setSpheresHeadedToCenter([]);
    clearInterval(centeringSpheresIntervalId?.current);
    centeringSpheresIntervalId.current = undefined;
  };
  useEffect(
    () => () => {
      if (centeringSpheresIntervalId?.current) {
        clearInterval(centeringSpheresIntervalId?.current);
      }
    },
    [],
  );

  useImperativeHandle(ref, () => ({
    centerSpheres,
    decenterSpheres,
  }));

  const renderSpheres = () => {
    if (!wrapCenter) {
      return null;
    }

    return initialSpheresPositions.map((spherePosition, index) => {
      return (
        <CenterableSphere
          // they will not be re-ordered
          key={index}
          position={spherePosition}
          wrapCenter={wrapCenter}
          shouldFlyToCenter={!!spheresHeadedToCenter?.[index]}
        />
      );
    });
  };

  const recreateSpheres = () => {
    wrapCenter &&
      setInitialSpheresPositions(
        createSpheresPositions({ center: wrapCenter }),
      );
  };

  const handleLayout = ({
    nativeEvent: {
      layout: { width, height },
    },
  }: LayoutChangeEvent) => {
    const center = { top: height / 2, left: width / 2 };
    setWrapCenter(center);
    setInitialSpheresPositions(
      createSpheresPositions({
        center,
      }),
    );
  };

  return (
    <View
      style={[viewLayers.second, commonStyles.fillParent]}
      onLayout={handleLayout}
    >
      <Button
        color={buttonTextColor}
        title={'recreateSpheres'}
        onPress={recreateSpheres}
      />
      <Button
        color={buttonTextColor}
        title={'centerSpheres'}
        onPress={centerSpheres}
      />
      <Button
        color={buttonTextColor}
        title={'decenterSpheres'}
        onPress={decenterSpheres}
      />
      {renderSpheres()}
    </View>
  );
});

export default CenterableSpheres;
