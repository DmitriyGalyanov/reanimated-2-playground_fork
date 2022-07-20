/**
 * @returns random Int lesser or equal to MAX and greater or equal to MIN
 */
const getRandomIntInclusive = (min: number, max: number) => {
  'worklet';
  const localMin = Math.ceil(min);
  const localMax = Math.floor(max);
  const x = Math.floor(Math.random() * (localMax - localMin + 1)) + localMin;
  console.log({ x });
  return x;
};

export default getRandomIntInclusive;
