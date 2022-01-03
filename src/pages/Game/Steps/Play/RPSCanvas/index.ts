import { Cards } from '@/RPS/constants';
import { loadImage } from '@/utils/images';
import shirtCard from '@/assets/shirt-card.png';
import paperCard from '@/assets/paper-card.png';
import rockCard from '@/assets/rock-card.png';
import scissorsCard from '@/assets/scissors-card.png';
import styles from '../Play.module.scss';

type Card = {
  type: Nullable<Cards>,
  shouldShow: boolean,
};

type CanvasOptions = {
  width: number,
  height: number,
};

const CARD_HEIGHT = 207;
const CARD_WIDTH = 146;
const CARD_INDENT = 10;

export default class RPSCanvas {
  ctx: Nullable<CanvasRenderingContext2D>;
  width: number;
  height: number;

  constructor(
    canvas: HTMLCanvasElement,
    {
      width,
      height,
    }: CanvasOptions
  ) {

    canvas.width = width;
    canvas.height = height;
    this.ctx = canvas.getContext('2d');
    this.width = width;
    this.height = height;

    this.drawStart();
  }

  private clear() {
    const { ctx, width, height } = this;

    if (!ctx) {
      return;
    }

    ctx.clearRect(0, 0, width, height);
  }

  public drawStart() {
    const { ctx, width, height } = this;
    if (!ctx) {
      return;
    }
    this.clear();
    ctx.font = 'bold 30px Helvetica, Arial, sans-serif';
    ctx.fillStyle = styles.colorPrimary;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('ВЫБЕРИТЕ КАРТУ', width / 2, height / 2);
  }

  public async drawCards(cards: Card[], isRevert = false) {
    this.clear();

    const { ctx, width, height } = this;
    if (!ctx) {
      return;
    }

    const shirtImage = await loadImage(shirtCard);
    const rockImage = await loadImage(rockCard);
    const paperImage = await loadImage(paperCard);
    const scissorsImage = await loadImage(scissorsCard);

    const types = {
      [Cards.rock]: rockImage,
      [Cards.paper]: paperImage,
      [Cards.scissors]: scissorsImage,
    };

    const cardsCount = cards.length;
    const totalWidth = cardsCount * CARD_WIDTH + (cardsCount - 1) * CARD_INDENT;

    cards.forEach((card, index) => {
      if (!card.type) {
        return;
      }
      const x = (width - totalWidth) / 2 + index * (CARD_WIDTH + CARD_INDENT);
      const y = (height - CARD_HEIGHT) / 2;
      ctx.drawImage(
        !isRevert ? shirtImage : types[card.type],
        x,
        y,
        CARD_WIDTH,
        CARD_HEIGHT,
      );
    });
  }
}
