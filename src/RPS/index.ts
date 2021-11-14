import { Gamer, GamerInitData } from './Gamer';
// import { Cards } from './constants';

const defaultStepsCount = 12;

// const winCombinations = {
//   [Cards.rock]: Cards.scissors,
//   [Cards.paper]: Cards.rock,
//   [Cards.scissors]: Cards.paper,
// };

type GameSettings = {
  stepsCountTotal?: number;
  gamers: GamerInitData[];
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
    this.gamers = gamers.map((item) => new Gamer(item));
    this.isAllCardsEqually = isAllCardsEqually;
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

  // private calculateOfFinish() {
  //   // количество жизней у одного из игроков равно 0 или количетсво ходов достигнуто N (надо вынести в переменную по умолчанию равно 10)
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