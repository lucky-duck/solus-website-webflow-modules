import { nextTabAndReturnNewIndex } from '../utils/utils';

const TIMEOUT = 25000;

class Intro {
  constructor() {
    this.currentIndex = 0;

    this.buttonNodes = Array.from(document.querySelector('[data-intro-buttons]').children);

    setInterval(() => {
      /*this.currentIndex = nextTabAndReturnNewIndex(this.buttonNodes, this.currentIndex);*/
    }, TIMEOUT);
  }
}

export default new Intro();
