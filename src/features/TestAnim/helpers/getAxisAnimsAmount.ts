import {
  MAIN_SPHERE_ANIM_DURATION,
  SINGLE_SQUEEZE_ANIM_DURATION,
} from 'features/TestAnim/consts';

const getAxisAnimsAmount = ({
  wholeAnimDuration = MAIN_SPHERE_ANIM_DURATION,
  axisAnimDuration = SINGLE_SQUEEZE_ANIM_DURATION,
}: {
  wholeAnimDuration?: number;
  axisAnimDuration?: number;
} = {}) => {
  return Math.floor(wholeAnimDuration / axisAnimDuration);
};

export default getAxisAnimsAmount;
