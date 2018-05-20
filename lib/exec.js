const chalk = require('chalk');
const path = require('path');
const updateNotifier = require('update-notifier');
const pkg = require('../package.json');
const render = require('./util/render');
const findDestFilePath = require('./util/findDestFilePath');
const deleteLastSlash = require('./util/deleteLastSlash');
const findSrcFiles = require('./util/findSrcFiles');
const readOptionsFile = require('./util/readOptionsFile');
const defaultConfig = require('./command');

/**
 *
 * exec
 * @param {object} config   config object
 * @param {function}        callback
 *
 */

module.exports = (config, callback) => {
    config = Object.assign({}, defaultConfig, config);
    return new Promise((resolve, reject) => {
        updateNotifier({pkg}).notify();
        readOptionsFile(config.options, (options) => {
            resolve(options);
        });
    })
    .then((options) => {
        const src = config.src;
        const dest = deleteLastSlash(config.dest);
        const srcFilesBasePath = path.dirname(config.options);
        let files = findSrcFiles(src);
        files.some((v, i) => {
            if (v === config.options) {
                files.splice(i, 1);
            }
        });
        if (files.length > 0) {
            files.map((srcFilePath) => {
                const destFilePath = findDestFilePath(src, dest, srcFilePath);
                let personalOptions = Object.assign({}, options);
                if ( Object.prototype.hasOwnProperty.call(personalOptions, config.personal) ) {
                    const srcFileRelativePath = srcFilePath.replace(srcFilesBasePath, '');
                    let personal = personalOptions[config.personal];
                    if ( Object.prototype.hasOwnProperty.call(personal, srcFileRelativePath) ) {
                        personal = personal[srcFileRelativePath];
                    } else {
                        personal = personal['/index.ejs'];
                    }
                    personalOptions[config.personal] = personal;
                }
                render(srcFilePath, destFilePath, personalOptions, config, callback);
            });
        } else {
            callback(false);
        }
    });
};
