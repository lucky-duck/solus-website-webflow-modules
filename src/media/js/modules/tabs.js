import { createVideoFrameMarkup, createVideoNode } from './video-frame-utils';
import { nextTabAndReturnNewIndex, nextTabIndex } from '../utils/utils';
import visibilitySensor from '../utils/visibility-sensor';
import { Component } from '../classes/component';

class Tabs extends Component {
  onInit() {
    this.currentIndex = 0;
    this.containerNode = document.querySelector('[data-video-tabs]');
    this.tabButtonNodes = Array.from(
      this.containerNode.querySelector('[data-tab-buttons]').children
    );
    this.frameContainers = Array.from(this.containerNode.querySelectorAll('[data-video-frame]'));
    this.nextMethodShim = this.next.bind(this);
    this.createVideos();
    this.initVisibilitySensor();
    this.tabButtonNodes.forEach(node => {
      node.addEventListener('click', () => {
        const prevVideoNode = this.currentVideoNode;
        prevVideoNode.pause();
        this.currentIndex = nextTabIndex(this.tabButtonNodes, this.currentIndex);
        this.currentVideoNode = this.videoNodes[this.currentIndex];
        this.currentVideoNode.play();
        setTimeout(() => {
          prevVideoNode.currentTime = 0;
        }, 100);
      });
    });
  }

  onDestroy() {
    this.disableVisibilitySensor();
  }

  next() {
    setTimeout(() => {
      const nextIndex = nextTabIndex(this.tabButtonNodes, this.currentIndex);
      const nextTabNode = this.tabButtonNodes[nextIndex];
      nextTabNode.click();
    }, 350);
    // const nextIndex = nextTabIndex(this.tabButtonNodes, this.currentIndex);
    // setTimeout(() => {
    //   const prevNode = this.currentVideoNode;
    //   // this.currentIndex = nextTabAndReturnNewIndex(this.tabButtonNodes, this.currentIndex);
    //   this.currentVideoNode = this.videoNodes[this.currentIndex];
    //   this.currentVideoNode.play();
    //   setTimeout(() => {
    //     prevNode.currentTime = 0;
    //   }, 100);
    // }, 350);
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
    videoNode.addEventListener('ended', this.nextMethodShim);
  }

  start() {
    this.currentVideoNode && this.currentVideoNode.play();
  }

  stop() {
    this.currentVideoNode && this.currentVideoNode.pause();
  }
}

export default new Tabs();
