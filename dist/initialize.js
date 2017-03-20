'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _nconf = require('nconf');

var _nconf2 = _interopRequireDefault(_nconf);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _process$env = process.env,
    NODE_ENV = _process$env.NODE_ENV,
    RUNNING_LOCALLY = _process$env.RUNNING_LOCALLY; // eslint-disable-line

/**
 * see it: https://www.npmjs.com/package/nconf
 */

if (typeof NODE_ENV === 'undefined') {
  NODE_ENV = 'development';
}

var DEFAULT_CONFIG = _path2.default.join(__dirname, './configs/defaults.json');

var PRODUCTION_CONFIG = _path2.default.join(__dirname, './configs/production.json');

var DEVELOPMENT_CONFIG = _path2.default.join(__dirname, './configs/development.json');

var ENV_CONFIG = NODE_ENV === 'production' ? PRODUCTION_CONFIG : DEVELOPMENT_CONFIG;

// Setup nconf to use (in-order):
//   1. Command-line arguments
//   2. Environment variables
//   3. Our environment-specific config (eg. database info)
//   4. Our default configuration (eg. timezone)
//   5. Private configuration (API keys, deploy info)

_nconf2.default.argv().env().file('environment', ENV_CONFIG).file('defaults', DEFAULT_CONFIG);

exports.default = _nconf2.default;