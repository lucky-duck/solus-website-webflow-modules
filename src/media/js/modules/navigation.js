import throttle from 'lodash/throttle';

class Header {
  headerNode = document.querySelector(
    '.black-nav-wrapper #navbar-inner, .white-nav-wrapper #navbar-inner'
  );
  visible = false;
  scrolled = false;

  constructor() {
    if (!this.headerNode) {
      return;
    }
    this.changeContainerHeight();
    this.scrollTop = this.getScrollTop();

    this.addEvents();
    this.update();

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

  changeContainerHeight() {
    this.headerNode.parentNode.style.height = this.headerNode.offsetHeight;
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
