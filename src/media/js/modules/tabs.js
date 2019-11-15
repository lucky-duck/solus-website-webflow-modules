import { createVideoFrameMarkup, createVideoNode } from './video-frame-utils';

class Tabs {
  constructor() {
    this.containerNode = document.querySelector('[data-video-tabs]');
    this.frameContainers = Array.from(this.containerNode.querySelectorAll('[data-video-frame]'));
    this.frameContainers.forEach(node => {
      const index = node.dataset.videoFrame;
      node.innerHTML = createVideoFrameMarkup({ whiteFrame: true });
      node
        .querySelector('[data-video-frame-videos]')
        .appendChild(createVideoNode(index, { hidden: false }));
    });
  }
}

export default new Tabs();
