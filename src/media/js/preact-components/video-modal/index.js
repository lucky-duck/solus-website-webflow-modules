import React from 'react';
import Vimeo from '@u-wave/react-vimeo';
import cn from 'classnames';
import { TweenMax, Power1 } from 'gsap';
import { Transition } from 'react-transition-group';

import styles from './styles.module.css';

class VideoModal extends React.Component {
  state = {
    closing: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.transitionState !== this.props.transitionState) {
      switch (this.props.transitionState) {
        case 'entering':
          this.show();
          break;
        case 'exiting':
          this.hide();
          break;
      }
    }
  }

  handleCloseClick = () => {
    this.setState({ closing: true });
    setTimeout(() => {
      this.props.onClose();
    }, 400);
  };

  handlePlayerReady = () => {
    TweenMax.fromTo(
      this.playerNode,
      0.65,
      { autoAlpha: 0 },
      { autoAlpha: 1, ease: Power1.easeOut, delay: 0.1 }
    );
  };

  show() {
    TweenMax.fromTo(
      this.modalNode,
      0.65,
      { y: '100%', autoAlpha: 1 },
      { y: '0%', ease: Power1.easeOut }
    );

    TweenMax.fromTo(
      this.closeNode,
      0.55,
      { autoAlpha: 0 },
      { autoAlpha: 1, ease: Power1.easeOut, delay: 0.55 }
    );
  }

  hide() {
    TweenMax.to(this.modalNode, 0.5, {
      y: '100%',
      ease: Power1.easeIn,
      onComplete: () => {
        TweenMax.set(this.modalNode, { autoAlpha: 0 });
        this.setState({ closing: false });
      },
    });

    TweenMax.to(this.playerNode, 0.25, { autoAlpha: 0, ease: Power1.easeOut });
  }

  render() {
    const { videoId } = this.props;

    return (
      <div className={styles.videoModal} ref={node => (this.modalNode = node)}>
        <div className={styles.playerContainer} ref={node => (this.playerNode = node)}>
          <Vimeo
            className={styles.player}
            video={videoId}
            autoplay
            onReady={this.handlePlayerReady}
          />
        </div>
        <button
          className={cn(styles.close, this.state.closing && styles.closing)}
          type="button"
          onClick={this.handleCloseClick}
          ref={node => (this.closeNode = node)}
        >
          <div className={styles.closeInner}>
            <span className={styles.closeLine} />
            <span className={styles.closeLine} />
          </div>
        </button>
      </div>
    );
  }
}

function withTransition(WrappedComponent) {
  return function WithTransition(props) {
    return (
      <div>
        <Transition in={props.show} unmountOnExit timeout={750}>
          {transitionState => <WrappedComponent {...props} transitionState={transitionState} />}
        </Transition>
      </div>
    );
  };
}

export default withTransition(VideoModal);
