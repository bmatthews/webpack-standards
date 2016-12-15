'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.webpackService = exports.not = exports.env = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _webpackMerge = require('webpack-merge');

var _webpackMerge2 = _interopRequireDefault(_webpackMerge);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackDevServer = require('webpack-dev-server');

var _webpackDevServer2 = _interopRequireDefault(_webpackDevServer);

var _utils = require('../utils');

var _standard = require('../configs/standard');

var _standard2 = _interopRequireDefault(_standard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WebpackService = function () {
  function WebpackService() {
    _classCallCheck(this, WebpackService);

    this.builderFuncs = {};
    this.currentConfig = {};
  }

  _createClass(WebpackService, [{
    key: 'builderGet',
    value: function builderGet() {
      var _this = this;

      return _extends({}, this.builderFuncs, {
        get: function get(config) {
          return _webpackMerge2.default.smart(_this.currentConfig, config);
        }
      });
    }
  }, {
    key: 'pipeline',
    value: function pipeline(name, builderFuncsPipeline) {
      var _this2 = this;

      this.addBuilderFunc(name, function (enabledOrSettings, settings) {
        // first parameter is predicate, so see if we should include the config
        if ((0, _utils.isFunction)(enabledOrSettings)) {
          if (!enabledOrSettings()) {
            return _this2.builderGet();
          }

          builderFuncsPipeline(_this2.builderFuncs, settings);
          return _this2.builderGet();
        }

        builderFuncsPipeline(_this2.builderFuncs, enabledOrSettings);
        return _this2.builderGet();
      });

      return this;
    }
  }, {
    key: 'addBuilderFunc',
    value: function addBuilderFunc(name, builderFunc) {
      if (!name) {
        throw new Error('Attempting to register a function with no associated name');
      }

      if (!builderFunc) {
        throw new Error('Attempting to register a function \'' + name + '\' with no value');
      }

      if (!(0, _utils.isFunction)(builderFunc)) {
        throw new Error('Attempting to register \'' + name + '\' with an invalid function');
      }

      if (this.builderFuncs[name]) {
        throw new Error(name + ' function already registered');
      }

      this.builderFuncs[name] = builderFunc;
    }
  }, {
    key: 'register',
    value: function register(nameOrArray, configurator) {
      if (Array.isArray(nameOrArray)) {
        this.registerArray(nameOrArray);
        return this;
      }

      this.registerConfigurator(nameOrArray, configurator);
      return this;
    }
  }, {
    key: 'registerConfigurator',
    value: function registerConfigurator(name, configurator) {
      var _this3 = this;

      this.addBuilderFunc(name, function (enabledOrSettings, settings) {
        // first parameter is predicate, so see if we should include the config
        if ((0, _utils.isFunction)(enabledOrSettings)) {
          if (!enabledOrSettings()) {
            return _this3.builderGet();
          }

          _this3.currentConfig = configurator(_this3.currentConfig, settings);
          return _this3.builderGet();
        }

        _this3.currentConfig = configurator(_this3.currentConfig, enabledOrSettings);
        return _this3.builderGet();
      });
    }
  }, {
    key: 'registerArray',
    value: function registerArray(configurators) {
      var _this4 = this;

      configurators.forEach(function (c) {
        // Assume that c is a { name, config } object
        // or a { name, pipeline } object

        if (!c || !c.name) {
          throw new Error('Array registration object does not have a name defined, use format { name: \'\', config: (config, settings) => config }');
        }

        if (c.config && c.pipeline) {
          throw new Error(c.name + ' registers both a config and a pipeline, they are mutually exclusive');
        }

        if (c.config) {
          _this4.registerConfigurator(c.name, c.config);
          return;
        }

        if (c.pipeline) {
          _this4.pipeline(c.name, c.pipeline);
          return;
        }

        throw new Error('Configurator \'' + c.name + '\' does not define a config or pipeline value');
      });
    }
  }, {
    key: 'configure',
    value: function configure(config) {
      this.currentConfig = config || {};
      return this.builderGet();
    }
  }, {
    key: 'run',
    value: function run(webpackConfig, settings) {

      if (!webpackConfig) {
        throw new Error('You must specify a valid webpack configuration');
      }

      if (!webpackConfig.devServer) {
        throw new Error('The specified webpack configuration does not contain a \'devServer\' section');
      }

      var runningPort = settings && settings.port || 8080;

      new _webpackDevServer2.default((0, _webpack2.default)(webpackConfig), webpackConfig.devServer).listen(runningPort, '127.0.0.1', // TODO: review localhost vs 127.0.0.1
      function (err, result) {
        if (err) {
          return console.log(err);
        }

        console.log('Listening at http://127.0.0.1:' + runningPort + '/');
      });
    }
  }]);

  return WebpackService;
}();

// TODO: support array of environments


var env = exports.env = function env(environments) {
  return function () {
    var currentEnvironment = process.env.NODE_ENV || 'development';
    return currentEnvironment === environments;
  };
};

var not = exports.not = function not(predicate) {
  return function () {
    return !predicate();
  };
};

var webpackService = exports.webpackService = new WebpackService();