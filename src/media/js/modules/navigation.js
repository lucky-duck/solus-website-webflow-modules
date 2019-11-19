import throttle from 'lodash/throttle';
import { BREAKPOINT_MD } from '../utils/constants';
import { isTabletOrMobile } from '../utils/utils';

class Header {
  headerNode = document.querySelector('.navbar-inner-container');
  visible = false;
  scrolled = false;

  constructor() {
    if (!this.headerNode) {
      return;
    }
    const parentNode = this.headerNode.parentNode.parentNode;
    if (parentNode.dataset.noSticky) {
      return;
    }

    this.handleResizeShim = throttle(this.handleResize, 60);

    window.addEventListener('resize', this.handleResizeShim);

    if (!isTabletOrMobile()) {
      this.turnOn();
    }

    if (module.hot) {
      module.hot.dispose(() => {
        this.removeEvents();
      });
    }
  }

  addEvents() {
    window.addEventListener('scroll', this.handleScroll);
  }

  removeEvents() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  turnOn() {
    if (this._turnedOn) {
      return;
    }
    this.scrollTop = this.getScrollTop();
    this.update();
    this.addEvents();
    this._turnedOn = true;
  }

  turnOff() {
    if (!this._turnedOn) {
      return;
    }
    this.removeEvents();
    this.headerNode.classList.remove('_scrolled', '_visible');
    this._turnedOn = false;
  }

  handleResize() {
    if (isTabletOrMobile()) {
      this.turnOff();
    } else {
      this.turnOn();
    }
  }

  getScrollTop() {
    let scrollTop = window.pageYOffset;
    return scrollTop < 0 ? 0 : scrollTop;
  }

  handleScroll = () => {
    this.update();
  };

  update = throttle(() => {
    const scrollTop = this.getScrollTop();

    if (scrollTop > this.scrollTop) {
      this.hide();
    } else {
      this.show();
    }

    this.scrollTop = scrollTop;

    if (this.scrollTop <= 0) {
      if (this.scrolled) {
        this.scrolled = false;
        this.headerNode.classList.remove('_scrolled');
      }
    } else {
      if (!this.scrolled) {
        this.scrolled = true;
        this.headerNode.classList.add('_scrolled');
      }
    }
  }, 200);

  show() {
    if (this.visible) {
      return;
    }
    this.visible = true;
    this.headerNode.classList.add('_visible');
  }

  hide() {
    if (!this.visible) {
      return;
    }
    this.visible = false;
    this.headerNode.classList.remove('_visible');
  }
}

export default new Header();
