import 'core-js/stable/array';

global.SOLUS = new (function() {
  this.modules = {
    Tabs: require('./modules/tabs'),
  };
})();

if (module.hot) {
  module.hot.accept();
}
