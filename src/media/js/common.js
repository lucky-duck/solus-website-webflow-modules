import 'intersection-observer';
import 'core-js/stable/array';

global.SOLUS_COMMON = new (function() {
  this.modules = {
    Navigation: require('./modules/navigation'),
    // VideoModalRenderer: require('./modules/video-modal-renderer'),
  };
})();

if (module.hot) {
  module.hot.accept();
}
