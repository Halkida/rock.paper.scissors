import { Cards } from './constants';
import Gamer from './Gamer';
import EventBus from './event-bus';
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
  static readonly events = {
    init: 'init',
    madeAStep: 'flow:made-a-step',
    circleIsOver: 'flow:circle-is-over',
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
    this.eventBus.on(RPS.events.circleIsOver, this.circleIsOver.bind(this));
    this.eventBus.on(RPS.events.gameFinished, this.gameFinished.bind(this));
  }

  public init() {}
  public gamerMadeAStep() {}
  public circleIsOver() {}
  public gameFinished() {}

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
    this.eventBus.emit(RPS.events.gameFinished);
  }

  public makeAStep(userId: number, cardType: Cards) {
    const gamer = this.gamers.find(({ id }) => id === userId);
    gamer?.makeAStep(cardType);
    this.eventBus.emit(RPS.events.madeAStep);

    if (!this.isAllMadeAStep) {
      return;
    }

    this.eventBus.emit(RPS.events.circleIsOver);

    if (this.isFinish) {
      this.finish();
    }
  }

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