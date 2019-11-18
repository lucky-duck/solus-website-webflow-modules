import 'intersection-observer';
import 'core-js/stable/array';

global.SOLUS_COMMON = new (function() {
  this.modules = {
    Navigation: require('./modules/navigation'),
  };
})();

if (module.hot) {
  module.hot.accept();
}
