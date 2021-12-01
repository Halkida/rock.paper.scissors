export enum Cards {
  rock = 'rock',
  paper = 'paper',
  scissors = 'scissors',
}

export const cardsTitles: Record<Cards, string> = {
  [Cards.rock]: 'камень',
  [Cards.paper]: 'бумага',
  [Cards.scissors]: 'ножницы'
};
