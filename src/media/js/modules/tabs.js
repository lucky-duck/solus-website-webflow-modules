import { createVideoFrameMarkup, createVideoNode } from './video-frame-utils';
import { nextTabAndReturnNewIndex } from '../utils/utils';
import visibilitySensor from '../utils/visibility-sensor';
import { Component } from '../classes/component';

class Tabs extends Component {
  onInit() {
    this.containerNode = document.querySelector('[data-video-tabs]');
    this.tabButtonNodes = Array.from(
      this.containerNode.querySelector('[data-tab-buttons]').children
    );
    this.frameContainers = Array.from(this.containerNode.querySelectorAll('[data-video-frame]'));
    this.createVideos();
    this.initVisibilitySensor();
  }

  onDestroy() {
    this.disableVisibilitySensor();
  }

  createVideos() {
    this.videoNodes = [];
    this.frameContainers.forEach((node, tabIndex) => {
      const index = node.dataset.videoFrame;
      node.innerHTML = createVideoFrameMarkup({
        customClasses: ['_white', '_tabs'],
      });
      const videoNode = createVideoNode(index, { loop: false, autoplay: false });
      if (tabIndex === 0) {
        this.currentVideoNode = videoNode;
      }
      this.addOnEndHandler(videoNode);
      this.videoNodes.push(videoNode);
      node.querySelector('[data-video-frame-videos]').appendChild(videoNode);
    });
  }

  initVisibilitySensor() {
    visibilitySensor.observe(this.containerNode, ({ isVisible }) => {
      isVisible ? this.start() : this.stop();
    });
  }

  disableVisibilitySensor() {
    visibilitySensor.unobserve(this.containerNode);
  }

  addOnEndHandler(videoNode) {
    videoNode.addEventListener('ended', () => {
      this.next();
    });
  }

  next = () => {
    this.currentVideoNode.pause();
    this.currentVideoNode.currentTime = 0;
    this.currentIndex = nextTabAndReturnNewIndex(this.tabButtonNodes, this.currentIndex);
    this.currentVideoNode = this.videoNodes[this.currentIndex];
    this.currentVideoNode.play();
  };

  start() {
    this.currentVideoNode && this.currentVideoNode.play();
  }

  stop() {
    this.currentVideoNode && this.currentVideoNode.pause();
  }
}

export default new Tabs();
