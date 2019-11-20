import React from 'react';
import ReactDOM from 'react-dom';

import { Component as StatefulComponent } from '../classes/component';
import VideoModal from '../preact-components/video-modal';

const modalRoot = document.createElement('div');
modalRoot.id = 'modal-root';
document.body.appendChild(modalRoot);

class VideoModalRenderer extends StatefulComponent {
  onInit() {
    // eslint-disable-next-line
    this.state = {
      modalShown: false,
    };
    this.openerNodes = Array.from(document.querySelectorAll('.video-button'));
    if (!this.openerNodes.legnth) {
      return;
    }
    this.openerNodes.forEach(node => {
      node.addEventListener('click', e => {
        e.preventDefault();
        this.setState({ modalShown: true });
      });
    });
    this.render();
  }

  onStateUpdate() {
    this.render();
  }

  handleClose = () => {
    this.setState({ modalShown: false });
  };

  // eslint-disable-next-line
  render() {
    ReactDOM.render(
      <VideoModal show={this.state.modalShown} videoId={'374027762'} onClose={this.handleClose} />,
      modalRoot
    );
  }
}

export default new VideoModalRenderer();
