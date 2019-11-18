import throttle from 'lodash/throttle';

class Header {
  headerNode = document.querySelector('.black-nav-wrapper, .white-nav-wrapper');
  visible = false;
  scrolled = false;

  constructor() {
    if (!this.headerNode) {
      return;
    }
    this.logoLinkNode = this.headerNode.querySelector('[data-logo-link]');
    this.scrollTop = this.getScrollTop();

    this.addEvents();
    this.update();
    this.initLogoLinkLogic();

    if (module.hot) {
      module.hot.dispose(() => {
        this.removeEvents();
      });
    }
  }

  addEvents() {
    window.addEventListener('scroll', this.handleScroll);
    this.logoLinkNode.addEventListener('click', this.handleLogoLinkClick);
  }

  removeEvents() {
    window.removeEventListener('scroll', this.handleScroll);
    this.logoLinkNode.removeEventListener('click', this.handleLogoLinkClick);
  }

  initLogoLinkLogic() {
    const href = this.logoLinkNode.getAttribute('href');
    if (window.location.pathname === href) {
      this.isHomePage = true;
      this.logoLinkNode.classList.add('_disabled');
    }
  }

  getScrollTop() {
    let scrollTop = window.pageYOffset;
    return scrollTop < 0 ? 0 : scrollTop;
  }

  handleScroll = () => {
    this.update();
  };

  handleLogoLinkClick = e => {
    if (this.isHomePage) {
      e.preventDefault();
    }
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
