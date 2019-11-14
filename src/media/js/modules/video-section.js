import throttle from 'lodash/throttle';

import { Component } from '../../js/classes/component';
import visibilitySensor from '../utils/visibility-sensor';

class VideoSection extends Component {
  onInit() {
    this.containerNode = document.getElementById('video-section');

    if (!this.containerNode) {
      return;
    }

    this.state = {
      currentIndex: 0,
    };

    this.handleScrollProgress = throttle(this.handleScrollProgress.bind(this), 60);
    this.updateValues = this.updateValues.bind(this);

    this.sectionNodes = Array.from(
      this.containerNode.querySelector('[data-fixed-scrolling-sections]').children
    );
    this.videoContainer = this.containerNode.querySelector('[data-video-container]');
    this.initVideoContainer();
    this.videoNodesContainer = this.containerNode.querySelector('[data-fixed-scrolling-videos]');
    this.addVideosOnThePage();
    this.initVisibilitySensor();
    this.updateValues();
    window.addEventListener('resize', this.updateValues);
    this.setVideo();
  }

  onStateUpdate(prevState) {
    if (prevState.currentIndex !== this.state.currentIndex) {
      this.setVideo(prevState.currentIndex);
    }
  }

  onDestroy() {
    window.removeEventListener('resize', this.updateValues);
    this.removeScrollTracking();
  }

  initVideoContainer() {
    this.videoContainer.innerHTML = `
      <div class="video-frame">
        <div class="video-frame__video-container" data-fixed-scrolling-videos></div>
        <div class="video-frame__frame"></div>
      </div>
    `;
  }

  createVideoUrl(index) {
    return `https://solus-video-section.netlify.com/media/video/${index}.mp4`;
  }

  addVideosOnThePage() {
    [1, 2, 3, 4].forEach(index => {
      const videoNode = document.createElement('video');
      const attrs = {
        className: 'video-frame__video _hidden',
        autoplay: true,
        loop: true,
        preload: 'auto',
        playsinline: true,
        muted: true,
        src: this.createVideoUrl(index),
      };
      Object.keys(attrs).forEach(key => (videoNode[key] = attrs[key]));
      this.videoNodesContainer.appendChild(videoNode);
    });
    this.videoNodes = Array.from(
      this.containerNode.querySelector('[data-fixed-scrolling-videos]').children
    );
  }

  initVisibilitySensor() {
    visibilitySensor.observe(this.containerNode, ({ isVisible }) => {
      isVisible ? this.addScrollTracking() : this.removeScrollTracking();
    });
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
    if (prevVideoNode) {
      prevVideoNode.classList.add('_hidden');
      prevVideoNode.pause();
    }
    nextVideoNode.classList.remove('_hidden');
    nextVideoNode.currentTime = 0;
    nextVideoNode.play();
  }

  updateValues() {
    this.containerOffsetTop = this.containerNode.offsetTop;
    this.containerHeight = this.containerNode.offsetHeight;
    this.windowHeight = window.innerHeight;
    this.screenOffset = this.windowHeight / 2;
  }
}

export default new VideoSection();
