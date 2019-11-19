import React from 'react';
import { render, h } from 'preact';

import { Component } from '../classes/component';
import VideoModal from '../preact-components/video-modal';

const modalRoot = document.createElement('div');
modalRoot.id = 'modal-root';
document.body.appendChild(modalRoot);

class VideoModalRenderer extends Component {
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
