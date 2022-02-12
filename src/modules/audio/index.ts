const URL = '/static/audio/theme.mp3';

type RPSAudioOptions = {
  parent: HTMLDivElement,
};

export class RPSAudio {
  element: HTMLAudioElement;

  constructor({
    parent,
  }: RPSAudioOptions) {
    this.element = new Audio(URL);

    console.log(this.element);

    parent.append(this.element);


    this.element.addEventListener('canplaythrough', () => {
      console.log('canplaythrough', this.element);
      this.play();
    });

    this.element.addEventListener('canplay', () => {
      console.log('canplay', this.element);
      this.play();
    });
  }

  play() {
    this.element.play();
  }

  pause() {
    this.element.pause();
  }
}
