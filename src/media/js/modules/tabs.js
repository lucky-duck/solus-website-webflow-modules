import { createVideoNode } from './video-frame-utils';

class Tabs {
  constructor() {
    this.containerNode = document.querySelector('[data-video-tabs]');
    this.frameContainers = Array.from(
      this.containerNode.querySelectorAll('[data-frame-container]')
    );
    this.frameContainers.forEach(node => {
      const index = node.dataset.frameContainer;
      node.appendChild(createVideoNode(index));
    });
  }
}

export default new Tabs();
