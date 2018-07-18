/**
 *
 * command
 * @return {object}
 *
 */

'use strict';

module.exports = require('yargs').usage('ejss [options]')
.option('src', {
  default: './src/ejs/**/*.ejs',
  type: 'string',
  describe: 'source directory path.'
})
.option('dest', {
  default: './dest/',
  type: 'string',
  describe: 'destination directory path.'
})
.option('data', {
  default: './src/ejs/data.json',
  type: 'string',
  describe: 'data json file path.'
})
.option('compression', {
  default: false,
  type: 'bool',
  describe: 'whether to compression.'
})
.option('lint', {
  default: '',
  type: 'string',
  describe: 'htmlhint config file path.'
})
.option('log', {
  default: true,
  type: 'bool',
  describe: 'whether to log.'
})
.version()
.help('help')
.alias('version', 'v')
.alias('help', 'h')
.argv;
