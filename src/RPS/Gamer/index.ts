// import { getRandomNumber } from '@/utils/get-random-number';
import { Cards } from '../constants';

// const isInteger = (number: number) => (
//   Math.floor(number) === number
// );

export type GamerInitData = {
  id: number,
};

export default class Gamer {
  public id: number;
  public cards: Record<Cards, number>;
  public liveCount: number;
  static availableCards: Cards[] = Object.values(Cards);
  public stepsCount: number;
  public curCard: Cards | null;

  constructor({ id }: GamerInitData) {
    this.cards = {
      rock: 0,
      paper: 0,
      scissors: 0,
    };
    this.id = id;

    this.liveCount = 3;
    this.stepsCount = 0;
    this.curCard = null;
  }

  static get availableCardsCount(): number {
    return Gamer.availableCards.length;
  }

  public getCards(count: number, isEqually: boolean) {
    count;
    isEqually;
    this.cards = {
      rock: 4,
      paper: 4,
      scissors: 4,
    };
  }

  public makeAStep(card: Cards) {
    this.stepsCount += 1;
    this.cards[card] -= 1;
    this.curCard = card;
  }

  public winRound() {
    this.liveCount += 1;
  }

  public loseRound() {
    this.liveCount -= 1;
  }

  public gameOver() {
    this.liveCount = 0;
  }

  // private getRandomCard(): Cards {
  //   const index = getRandomNumber(0, Gamer.availableCardsCount);
  //   return Gamer.availableCards[index];
  // }
}
