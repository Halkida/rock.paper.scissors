import { Cards } from './constants';
import Gamer from './Gamer';
import EventBus from './event-bus';

const defaultStepsCount = 12;

const winCombinations = {
  [Cards.rock]: Cards.scissors,
  [Cards.paper]: Cards.rock,
  [Cards.scissors]: Cards.paper,
};

type GameSettings = {
  stepsCountTotal?: number;
  gamers: Gamer[];
  isAllCardsEqually?: boolean,
};

class RPS {
  static readonly events = {
    init: 'init',
    madeAStep: 'flow:made-a-step',
    roundIsOver: 'flow:round-is-over',
    gameFinished: 'flow:game-finished',
  };

  readonly stepsCountTotal: number;
  private stepsCount: number;
  private gamers: Gamer[];
  private isAllCardsEqually: boolean;
  private eventBus: EventBus;

  constructor({
    stepsCountTotal = defaultStepsCount,
    gamers,
    isAllCardsEqually = true,
  } : GameSettings) {
    this.stepsCountTotal = stepsCountTotal;
    this.gamers = gamers;
    this.isAllCardsEqually = isAllCardsEqually;
    this.eventBus = new EventBus();
    this.registerEvents();
    this.eventBus.emit(RPS.events.init);
  }

  private registerEvents(): void {
    this.eventBus.on(RPS.events.init, this.init.bind(this));
    this.eventBus.on(RPS.events.madeAStep, this.gamerMadeAStep.bind(this));
    this.eventBus.on(RPS.events.roundIsOver, this.roundIsOver.bind(this));
    this.eventBus.on(RPS.events.gameFinished, this.gameFinished.bind(this));
  }

  public init() {}
  public gamerMadeAStep(gamers: Gamer[]) {}
  public roundIsOver(gamers: Gamer[]) {}
  public gameFinished(gamers: Gamer[]) {}

  private get isFinish() {
    const hasSteps = this.stepsCount < this.stepsCountTotal;
    const hasGamerWithotLives = this.gamers.some(({ liveCount }) => !liveCount);

    return !hasSteps && hasGamerWithotLives;
  }

  private get isAllMadeAStep() {
    let isEqually = true;
    let prevValue: number | null = null;

    this.gamers.forEach(({ stepsCount }) => {
      if (!prevValue || !isEqually) {
        return;
      }

      isEqually = prevValue === stepsCount;

      prevValue = stepsCount;
    });

    return isEqually;
  }

  public start() {
    this.dealСardsForGamers();
    this.stepsCount = 0;
  }

  public finish() {
    this.calculateResultOfGame();
    this.eventBus.emit(RPS.events.gameFinished, this.gamers);
  }

  public makeAStep(userId: number, cardType: Cards) {
    const gamer = this.gamers.find(({ id }) => id === userId);
    gamer?.makeAStep(cardType);
    this.eventBus.emit(RPS.events.madeAStep, this.gamers);

    if (!this.isAllMadeAStep) {
      return;
    }

    this.calculateResultOfRound();

    this.eventBus.emit(RPS.events.roundIsOver, this.gamers);

    if (this.isFinish) {
      this.finish();
    }
  }

  private calculateResultOfRound() {
    // примитивно, надо будет переписать на нормальную
    // учитывает только что в игре 2 игрока

    const firstGamer = this.gamers[0];
    const secondGamer = this.gamers[1];

    const isFirstWin = winCombinations[firstGamer.curCard as Cards] === secondGamer.curCard;
    const isSecondWin = winCombinations[secondGamer.curCard as Cards] === firstGamer.curCard;

    if (isFirstWin) {
      firstGamer.winRound();
      secondGamer.loseRound();
    } else if (isSecondWin) {
      secondGamer.winRound();
      firstGamer.loseRound();
    }
  }

  private calculateResultOfGame() {
    if (!this.isAllMadeAStep) {
      return;
    }

    this.gamers.forEach((gamer) => {
      if (gamer.liveCount < 3) {
        gamer.gameOver();
      }
    });
  }

  private dealСardsForGamers() {
    this.gamers.forEach((item) => {
      item.getCards(this.stepsCount, this.isAllCardsEqually);
    });
  }
}

export default RPS;