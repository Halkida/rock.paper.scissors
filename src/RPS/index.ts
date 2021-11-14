import Gamer from './Gamer';
// import { Cards } from './constants';

const defaultStepsCount = 12;

// const winCombinations = {
//   [Cards.rock]: Cards.scissors,
//   [Cards.paper]: Cards.rock,
//   [Cards.scissors]: Cards.paper,
// };

type GameSettings = {
  stepsCountTotal?: number;
  gamers: Gamer[];
  isAllCardsEqually?: boolean,
};

class RPS {
  readonly stepsCountTotal: number;
  private stepsCount: number;
  private gamers: Gamer[];
  private isAllCardsEqually: boolean;

  constructor({
    stepsCountTotal = defaultStepsCount,
    gamers,
    isAllCardsEqually = true,
  } : GameSettings) {

    this.stepsCountTotal = stepsCountTotal;
    this.gamers = gamers;
    this.isAllCardsEqually = isAllCardsEqually;

    console.log(this.isFinish);
  }

  private get isFinish() {
    const hasSteps = this.stepsCount < this.stepsCountTotal;
    const hasGamerWithotLives = this.gamers.some(({ liveCount }) => !liveCount);

    return !hasSteps && hasGamerWithotLives;
  }

  public start() {
    this.dealСardsForGamers();
    this.stepsCount = 0;
  }

  public finish() {
    // происходит когда количество жизней у одного из игроков равно 0 или количетсво ходов достигнуто N (надо вынести в переменную по умолчанию равно 10)
  }

  // public makeAStep(cardType: string) {
  //   // увеличение stepsCount на 1
  //   // вычисление победителя в ходу
  //   // вычисление окончания игры
  // }

  // private calculateWinner() {
  //   // на основе winCombinations вычислиет победителей
  // }

  private dealСardsForGamers() {
    this.gamers.forEach((item) => {
      item.getCards(this.stepsCount, this.isAllCardsEqually);
    });
  }

}

export default RPS;