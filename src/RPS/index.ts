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
  onInit?: () => void,
  onGameStarted?: (gamers: Gamer[]) => void,
  onGamerMadeAStep?: (gamers: Gamer[]) => void,
  onRoundIsOver?: (gamers: Gamer[]) => void,
  onGameFinished?: (gamers: Gamer[]) => void,
};

class RPS {
  static readonly events = {
    init: 'init',
    start: 'start',
    madeAStep: 'flow:made-a-step',
    roundIsOver: 'flow:round-is-over',
    gameFinished: 'flow:game-finished',
  };

  readonly stepsCountTotal: number;
  private stepsCount: number;
  public gamers: Gamer[];
  private isAllCardsEqually: boolean;
  private eventBus: EventBus;
  private handlers: Record<string, ((...param: unknown[]) => void) | undefined> = {};

  constructor({
    stepsCountTotal = defaultStepsCount,
    gamers,
    isAllCardsEqually = true,
    onInit,
    onGameStarted,
    onGamerMadeAStep,
    onRoundIsOver,
    onGameFinished,
  } : GameSettings) {
    this.stepsCountTotal = stepsCountTotal;
    this.gamers = gamers;
    this.isAllCardsEqually = isAllCardsEqually;
    this.eventBus = new EventBus();
    this.registerEvents();
    this.handlers = {
      onInit,
      onGameStarted,
      onGamerMadeAStep,
      onRoundIsOver,
      onGameFinished,
    };
    this.eventBus.emit(RPS.events.init);
    this.start();
  }

  private registerEvents(): void {
    this.eventBus.on(RPS.events.init, this.init.bind(this));
    this.eventBus.on(RPS.events.start, this.gameStarted.bind(this));
    this.eventBus.on(RPS.events.madeAStep, this.gamerMadeAStep.bind(this));
    this.eventBus.on(RPS.events.roundIsOver, this.roundIsOver.bind(this));
    this.eventBus.on(RPS.events.gameFinished, this.gameFinished.bind(this));
  }

  private init() {
    this.handlers.onInit && this.handlers.onInit();
  }
  private gameStarted() {
    this.handlers.onGameStarted && this.handlers.onGameStarted(this.gamers);
  }
  private gamerMadeAStep() {
    this.handlers.onGamerMadeAStep && this.handlers.onGamerMadeAStep(this.gamers);
  }
  private roundIsOver() {
    this.handlers.onRoundIsOver && this.handlers.onRoundIsOver(this.gamers);
  }
  private gameFinished() {
    this.handlers.onGameFinished && this.handlers.onGameFinished(this.gamers);
  }

  private get isFinish() {
    const hasSteps = this.stepsCount < this.stepsCountTotal;
    const hasGamerWithoutLives = this.gamers.some(({ liveCount }) => !liveCount);

    return !hasSteps || hasGamerWithoutLives;
  }

  private get isAllMadeAStep() {
    let isEqually = true;
    let prevValue: number | null = null;

    this.gamers.forEach(({ stepsCount }) => {
      if (prevValue === null || !isEqually) {
        prevValue = stepsCount;
        return;
      }

      isEqually = prevValue === stepsCount;

    });

    return isEqually;
  }

  public start() {
    this.dealСardsForGamers();
    this.stepsCount = 0;
    this.eventBus.emit(RPS.events.start);
    this.computersInitSteps();
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

    this.gamers.forEach((gamer) => {
      gamer.curCard = null;
    });

    this.eventBus.emit(RPS.events.roundIsOver, this.gamers);

    if (this.isFinish) {
      this.finish();
    } else {
      this.computersInitSteps();
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

  private computersInitSteps() {
    this.gamers.forEach((gamer) => {
      if (gamer.type === 'computer' &&
        gamer.stepsCount < this.stepsCountTotal
      ) {
        gamer.makeARandomStep();
      }
    });
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