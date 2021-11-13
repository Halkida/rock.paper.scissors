import { getRandomNumber } from '@/utils/get-random-number';

enum Cards {
  rock = 'rock',
  paper = 'paper',
  scissors = 'scissors',
}

const winCombinations = {
  [Cards.rock]: Cards.scissors,
  [Cards.paper]: Cards.rock,
  [Cards.scissors]: Cards.paper,
};

type Gamer = {
  id: number,
  cards: []
};

type GameSettings = {
  stepsCount: number;
  gamers: Gamer[];
};

class RPS {
  readonly stepsCountTotal: number;

  private stepsCount: number;
  private gamers: Gamer[];

  constructor({ stepsCount, gamers  } : GameSettings) {
    this.stepsCount = stepsCount;
    this.gamers = gamers;
  }

  public start() {
    // раздавание карт
    // инициализация жизней
    // Присвание stepsCount значения 0
  }

  public finish() {
    // происходит когда количество жизней у одного из игроков равно 0 или количетсво ходов достигнуто N (надо вынести в переменную по умолчанию равно 10)
  }

  public makeAStep(cardType: string) {
    // увеличение stepsCount на 1
    // вычисление победителя в ходу
    // вычисление окончания игры
  }

  private calculateOfFinish() {
    // количество жизней у одного из игроков равно 0 или количетсво ходов достигнуто N (надо вынести в переменную по умолчанию равно 10)
  }

  private calculateWinner() {
    // на основе winCombinations вычислиет победителей
  }

  private dealСardsForGamer() {
    //
  }
}

export default RPS;