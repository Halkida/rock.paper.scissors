import styles from '../Canvas.module.scss';

type CanvasOptions = {
  width: number,
  height: number,
};

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

  private drawStart() {
    const { ctx, width, height } = this;
    if (!ctx) {
      return;
    }
    ctx.font = 'bold 30px Helvetica, Arial, sans-serif';
    ctx.fillStyle = styles.colorPrimary;
    console.log(styles);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('ВЫБЕРИТЕ КАРТУ', width / 2, height / 2);
  }
}
