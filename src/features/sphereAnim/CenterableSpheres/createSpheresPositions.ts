import {
  COLLIDING_SPHERES_AMOUNT,
  COLLIDING_SPHERES_MIN_OFFSET,
  COLLIDING_SPHERES_OFFSET_RANGE,
} from 'features/sphereAnim/consts';
import { getRandomIntInclusive } from 'features/sphereAnim/helpers';
import { TViewCenter } from 'features/sphereAnim/CenterableSpheres/types';

export default ({
  amount = COLLIDING_SPHERES_AMOUNT,
  center = { top: 0, left: 0 },
}: {
  amount?: number;
  center?: TViewCenter;
} = {}) => {
  return [...Array(amount)].map((_, _index) => {
    const isAtTop = !!getRandomIntInclusive(0, 1);

    const isAtLeft = !!getRandomIntInclusive(0, 1);

    const verticalOffset = getRandomIntInclusive(
      COLLIDING_SPHERES_MIN_OFFSET,
      COLLIDING_SPHERES_OFFSET_RANGE,
      // COLLIDING_SPHERES_MIN_OFFSET *
      //   ((_index + 1) / COLLIDING_SPHERES_IN_RANGE_AMOUNT),
      // COLLIDING_SPHERES_OFFSET_RANGE *
      //   ((_index + 1) / COLLIDING_SPHERES_IN_RANGE_AMOUNT),
    );
    const horizontalOffset = getRandomIntInclusive(
      COLLIDING_SPHERES_MIN_OFFSET,
      COLLIDING_SPHERES_OFFSET_RANGE,
      // COLLIDING_SPHERES_MIN_OFFSET *
      //   (_index / COLLIDING_SPHERES_IN_RANGE_AMOUNT) +
      //   1,
      // COLLIDING_SPHERES_OFFSET_RANGE *
      //   (_index / COLLIDING_SPHERES_IN_RANGE_AMOUNT) +
      //   1,
    );

    return {
      top: center.top + (isAtTop ? verticalOffset : -verticalOffset),
      left: center.left + (isAtLeft ? horizontalOffset : -horizontalOffset),
    };
  });
};
