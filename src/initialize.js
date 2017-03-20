/**
 * see it: https://www.npmjs.com/package/nconf
 */
import fs from 'fs';
import nconf from 'nconf';
import path from 'path';

let { NODE_ENV, RUNNING_LOCALLY } = process.env;// eslint-disable-line

if (typeof NODE_ENV === 'undefined') {
  NODE_ENV = 'development';
}

const DEFAULT_CONFIG = path.join(__dirname, './configs/defaults.json');

const PRODUCTION_CONFIG = path.join(__dirname, './configs/production.json');

const DEVELOPMENT_CONFIG = path.join(__dirname, './configs/development.json');



const ENV_CONFIG = NODE_ENV === 'production'
  ? PRODUCTION_CONFIG
  : DEVELOPMENT_CONFIG;


// Setup nconf to use (in-order):
//   1. Command-line arguments
//   2. Environment variables
//   3. Our environment-specific config (eg. database info)
//   4. Our default configuration (eg. timezone)
//   5. Private configuration (API keys, deploy info)

nconf
  .argv()
  .env()
  .file('environment', ENV_CONFIG)
  .file('defaults', DEFAULT_CONFIG);

export default nconf;
