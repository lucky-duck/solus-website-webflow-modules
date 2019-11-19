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
    this.openerNode = document.getElementById('video-button');
    if (!this.openerNode) {
      return;
    }
    this.openerNode.addEventListener('click', e => {
      e.preventDefault();
      this.setState({ modalShown: true });
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
