import { Cards } from './constants';
import Gamer from './Gamer';
import EventBus from './event-bus';

type HistoryItem = {
  round: number,
  winnerId: Nullable<number>;
}

export type GameStats = {
  history: HistoryItem[];
  winnerId: Nullable<number>;
  gamers: Gamer[];
}

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
  onGameFinished?: (gameStats: GameStats) => void,
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
  private roundsCount: number;
  public gamers: Gamer[];
  public gameStats: GameStats;
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
    this.gameStats = {
      history: [],
      winnerId: null,
      gamers: this.gamers
    };
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
    this.handlers.onGameFinished && this.handlers.onGameFinished(this.gameStats);
  }

  private get isFinish() {
    const hasSteps = this.roundsCount < this.stepsCountTotal;
    const hasGamerWithoutScore = this.gamers.some(({ score }) => !score);

    return !hasSteps || hasGamerWithoutScore;
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
    this.deal??ardsForGamers();
    this.roundsCount = 0;
    this.eventBus.emit(RPS.events.start);
  }

  public finish() {
    this.gameStats.winnerId = this.calculateResultOfGame();
    this.eventBus.emit(RPS.events.gameFinished, this.gamers);
  }

  public makeAStep(userId: number, cardType: Cards) {
    const gamer = this.gamers.find(({ id }) => id === userId);
    gamer?.makeAStep(cardType);
    this.computersInitSteps();
    this.eventBus.emit(RPS.events.madeAStep, this.gamers);

    if (!this.isAllMadeAStep) {
      return;
    }

    const winnerId = this.calculateResultOfRound();
    this.gameStats.history.push({
      winnerId,
      round: this.roundsCount + 1
    });

    this.gamers.forEach((gamer) => {
      gamer.curCard = null;
    });

    this.eventBus.emit(RPS.events.roundIsOver, this.gamers);
    this.roundsCount += 1;

    if (this.isFinish) {
      this.finish();
    }
  }

  private calculateResultOfRound() {
    // ????????????????????, ???????? ?????????? ???????????????????? ???? ????????????????????
    // ?????????????????? ???????????? ?????? ?? ???????? 2 ????????????

    const [firstGamer, secondGamer] = this.gamers;
    let winnerId: Nullable<number> = null;

    const isFirstWin = winCombinations[firstGamer.curCard as Cards] === secondGamer.curCard;
    const isSecondWin = winCombinations[secondGamer.curCard as Cards] === firstGamer.curCard;

    if (isFirstWin) {
      firstGamer.winRound();
      secondGamer.loseRound();
      winnerId = firstGamer.id;
    } else if (isSecondWin) {
      secondGamer.winRound();
      firstGamer.loseRound();
      winnerId = secondGamer.id;
    }

    return winnerId;
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
    let winnerId: Nullable<number> = null;
    const [firstGamer, secondGamer] = this.gamers;
    if (firstGamer.score > secondGamer.score) {
      winnerId = firstGamer.id;
    } else if (firstGamer.score < secondGamer.score) {
      winnerId = secondGamer.id;
    }

    this.gamers.forEach((gamer) => {
      if (gamer.score < 3) {
        gamer.gameOver();
      }
    });

    return winnerId;
  }

  private deal??ardsForGamers() {
    this.gamers.forEach((item) => {
      item.getCards(this.stepsCountTotal, this.isAllCardsEqually);
    });
  }
}

export default RPS;