import { getRandomNumber } from '@/utils/get-random-number';
import { Cards } from '../constants';

const isInteger = (number: number) => (
  Math.floor(number) === number
);

export type GamerInitData = {
  id: number,
};

export class Gamer {
  public id: number;
  public cards: Cards[];
  public liveCount: number;
  static availableCards: Cards[] = Object.keys(Cards) as Cards[];

  constructor({ id }: GamerInitData) {
    this.id = id;
    this.cards = [];
    this.liveCount = Gamer.availableCardsCount;
  }

  static get availableCardsCount(): number {
    return Gamer.availableCards.length;
  }

  public getCards(count: number, isEqually: boolean) {
    if (!isEqually) {
      this.cards = new Array(count)
        .fill(null)
        .map(this.getRandomCard);
    } else {
      const oneTypeCardCount = count / Gamer.availableCardsCount;

      if (!isInteger(oneTypeCardCount)) {
        throw new Error('Количество ходов должно быть кратно количеству типов карт');
      }

      this.cards = new Array(count)
        .fill(null)
        .map((_, index) => {
          const indexOfCardType = Math.floor(index / oneTypeCardCount);
          return Gamer.availableCards[indexOfCardType];
        });
    }
  }

  private getRandomCard(): Cards {
    const index = getRandomNumber(0, Gamer.availableCardsCount);
    return Gamer.availableCards[index];
  }
}
