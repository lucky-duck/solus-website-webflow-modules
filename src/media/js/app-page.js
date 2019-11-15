import 'intersection-observer';
import 'core-js/stable/array';

global.SOLUS = new (function() {
  this.modules = {
    VideoSection: require('./modules/video-section'),
  };
})();

if (module.hot) {
  module.hot.accept();
}
