// import 'intersection-observer';
import 'core-js/stable/array';

global.ProjectName = new (function() {
  this.modules = {
    Tabs: require('./modules/tabs'),
  };
})();

if (module.hot) {
  module.hot.accept();
}
