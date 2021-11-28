export const getRandomNumber = (min = 0, max = 10) => {
  return Math.floor(min + Math.random() * (max - min));
};
