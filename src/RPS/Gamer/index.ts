import { getRandomNumber } from '@/utils/get-random-number';
import { IUser } from '@/types';
import { Cards } from '../constants';

export type GamerInitData = {
  id: number;
  type?: 'computer' | 'person';
  info?: IUser;
};

export default class Gamer {
  public id: number;
  public cards: Record<Cards, number>;
  public liveCount: number;
  static availableCards: Cards[] = Object.values(Cards);
  public stepsCount: number;
  public curCard: Cards | null;
  public type: 'computer' | 'person';
  public info?: IUser;

  constructor({
    id,
    type = 'person',
    info,
  }: GamerInitData) {
    this.cards = {
      rock: 0,
      paper: 0,
      scissors: 0,
    };
    this.id = id;

    this.liveCount = 3;
    this.stepsCount = 0;
    this.curCard = null;
    this.type = type;
    this.info = info;
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

  public makeARandomStep() {
    const availableCards: Cards[] = Object.keys(this.cards)
      .filter((card: Cards) => this.cards[card] > 0) as Cards[];

    const index = getRandomNumber(0, availableCards.length);

    this.makeAStep(availableCards[index]);
  }
}
