/**
 *
 * command line
 * @return {object} config object
 *
 */

module.exports = require('yargs').usage('ejs-html-cli [options]')
.option('src', {
    default: 'src/ejs/**/*.ejs',
    type: 'string',
    describe: 'source directory path.'
})
.option('dest', {
    default: 'dest',
    type: 'string',
    describe: 'destination directory path.'
})
.option('options', {
    default: 'src/ejs/options.json',
    type: 'string',
    describe: 'options json file path.'
})
.option('personal', {
    default: 'personal',
    type: 'string',
    describe: 'personal key in options file.'
})
.version()
.help('help')
.alias('version', 'v')
.alias('help', 'h')
.argv;
