import React from 'react';
import { render } from 'preact';

import { Component } from '../classes/component';
import VideoModal from '../preact-components/video-modal';

const modalRoot = document.createElement('div');
modalRoot.id = 'modal-root';
document.appendChild(modalRoot);

class VideoModalRenderer extends Component {
  state = {
    modalShown: false,
  };

  onInit() {
    this.openerNode = document.getElementById('video-button');
    this.openerNode.addEventListener('click', () => {
      this.setState({ modalShown: true });
    });
  }

  onUpdate() {
    this.render();
  }

  handleClose = () => {
    this.setState({ modalShown: false });
  };

  // eslint-disable-next-line
  render() {
    render(
      <VideoModal show={this.state.modalShown} videoId={'374027762'} onClose={this.handleClose} />,
      modalRoot
    );
  }
}

export default new VideoModalRenderer();
