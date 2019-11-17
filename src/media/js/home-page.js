import 'intersection-observer';
import 'core-js/stable/array';

global.SOLUS = new (function() {
  this.modules = {
    Intro: require('./modules/intro'),
    Tabs: require('./modules/tabs'),
  };
})();

if (module.hot) {
  module.hot.accept();
}
