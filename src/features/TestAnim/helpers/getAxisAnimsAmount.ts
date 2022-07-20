import {
  DEFAULT_MAIN_SPHERE_ANIM_DURATION,
  DEFAULT_SINGLE_SQUEEZE_ANIM_DURATION,
} from 'features/TestAnim/consts';

const getAxisAnimsAmount = ({
  wholeAnimDuration = DEFAULT_MAIN_SPHERE_ANIM_DURATION,
  axisAnimDuration = DEFAULT_SINGLE_SQUEEZE_ANIM_DURATION,
}: {
  wholeAnimDuration?: number;
  axisAnimDuration?: number;
} = {}) => {
  return Math.floor(wholeAnimDuration / axisAnimDuration);
};

export default getAxisAnimsAmount;
