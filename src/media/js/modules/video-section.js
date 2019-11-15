import throttle from 'lodash/throttle';

import { Component } from '../../js/classes/component';
import visibilitySensor from '../utils/visibility-sensor';
import { BREAKPOINT_SM } from '../utils/constants';
import { createVideoFrameMarkup, createVideoNode } from './video-frame-utils';

class VideoSection extends Component {
  onInit() {
    this.containerNode = document.getElementById('video-section');

    if (!this.containerNode) {
      return;
    }

    this.state = {
      currentIndex: 0,
    };

    this.handleScrollProgress = throttle(this.handleScrollProgress.bind(this), 100);
    this.handleResize = throttle(this.handleResize.bind(this), 100);
    this.updateValues = this.updateValues.bind(this);

    this.sectionNodes = Array.from(
      this.containerNode.querySelector('[data-fixed-scrolling-sections]').children
    );
    this.videoContainer = this.containerNode.querySelector('[data-video-container]');
    this.initVideoContainer();
    this.videoNodesContainer = this.containerNode.querySelector('[data-video-frame-videos]');
    this.addVideosOnThePage();

    window.addEventListener('resize', this.handleResize);
    if (!this.isMobile()) {
      this.init();
    }
  }

  onStateUpdate(prevState) {
    if (prevState.currentIndex !== this.state.currentIndex) {
      this.setVideo(prevState.currentIndex);
    }
  }

  onDestroy() {
    this.destroy();
  }

  isMobile() {
    return window.innerWidth <= BREAKPOINT_SM;
  }

  init() {
    this._initialized = true;
    this.initVisibilitySensor();
    this.updateValues();

    this.setVideo();
  }

  destroy() {
    this._initialized = false;
    this.removeScrollTracking();
    this.disableVisibilitySensor();
  }

  initVideoContainer() {
    this.videoContainer.innerHTML = createVideoFrameMarkup({ fixedScrolling: true });
  }

  createVideoUrl(index) {
    return `https://solus-webflow-modules.netlify.com/media/video/${index}.mp4`;
  }

  addVideosOnThePage() {
    [1, 2, 3, 4].forEach(index => {
      this.videoNodesContainer.appendChild(createVideoNode(index));
    });
    this.videoNodes = Array.from(
      this.containerNode.querySelector('[data-video-frame-videos]').children
    );
  }

  initVisibilitySensor() {
    visibilitySensor.observe(this.containerNode, ({ isVisible }) => {
      isVisible ? this.addScrollTracking() : this.removeScrollTracking();
    });
  }

  disableVisibilitySensor() {
    visibilitySensor.unobserve(this.containerNode);
  }

  addScrollTracking() {
    window.addEventListener('scroll', this.handleScrollProgress);
  }

  removeScrollTracking() {
    window.removeEventListener('scroll', this.handleScrollProgress);
  }

  handleScrollProgress() {
    const progress =
      (window.pageYOffset - this.containerOffsetTop + this.screenOffset) / this.containerHeight;
    const index = Math.abs(Math.round((this.sectionNodes.length - 1) * progress));
    if (this.state.currentIndex !== index) {
      this.setState({ currentIndex: index });
    }
  }

  setVideo(prevIndex) {
    const index = this.state.currentIndex;
    const prevVideoNode = this.videoNodes[prevIndex];
    const nextVideoNode = this.videoNodes[index];
    if (!nextVideoNode) {
      return;
    }
    if (prevVideoNode) {
      prevVideoNode.classList.add('_hidden');
      prevVideoNode.pause();
    }
    nextVideoNode.classList.remove('_hidden');
    nextVideoNode.currentTime = 0;
    nextVideoNode.play();
  }

  handleResize() {
    const IS_MOBILE = this.isMobile();
    if (this._initialized) {
      IS_MOBILE ? this.destroy() : this.updateValues();
    } else {
      !IS_MOBILE && this.init();
    }
  }

  updateValues() {
    this.containerOffsetTop = this.containerNode.offsetTop;
    this.containerHeight = this.containerNode.offsetHeight;
    this.windowHeight = window.innerHeight;
    this.screenOffset = this.windowHeight / 2;
  }
}

export default new VideoSection();
