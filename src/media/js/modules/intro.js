const TIMEOUT = 5000;

class Intro {
  constructor() {
    this.currentIndex = 0;

    this.buttonNodes = Array.from(document.querySelector('[data-intro-buttons]').children);

    setInterval(() => {
      this.currentIndex =
        this.currentIndex === this.buttonNodes.length - 1 ? 0 : this.currentIndex + 1;
      const buttonNode = this.buttonNodes[this.currentIndex];
      if (buttonNode) {
        buttonNode.click();
      }
    }, TIMEOUT);
  }
}

export default new Intro();
