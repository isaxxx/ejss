/**
 *
 * exec
 * @param {object} param
 * @param {function} callback
 *
 */

'use strict';

const chalk = require('chalk');
const htmlhint = require('htmlhint').HTMLHint;
const path = require('path');
const updateNotifier = require('update-notifier');
const pkg = require('../package.json');
const defaultParam = require('./command');
const findDestFilePath = require('./util/findDestFilePath');
const findSrcFiles = require('./util/findSrcFiles');
const parseJSONFile = require('./util/parseJSONFile');
const renderHTML = require('./util/renderHTML');

module.exports = (param, callback) => {
  let lintRules = false;
  callback = callback || function () {};
  param = Object.assign({}, defaultParam, param);
  return new Promise((resolve, reject) => {
    updateNotifier({pkg}).notify();
    parseJSONFile(param.data, (err, object) => {
      if (err) {
        reject(err);
      } else {
        resolve(object);
      }
    });
  })
  .then((object) => {
    return new Promise((resolve, reject) => {
      if (param.lint === '') {
        resolve(object);
      } else {
        parseJSONFile(param.lint, (err, rules) => {
          if (err) {
            reject(err);
          } else {
            lintRules = rules;
            resolve(object);
          }
        });
      }
    });
  })
  .then((object) => {
    return new Promise((resolve, reject) => {
      const files = findSrcFiles(param.src);
      if (files.length > 0) {
        const completeCount = files.length;
        let currentCount = 0;
        files.map((srcFilePath) => {
          let data = Object.assign({}, object);
          if (Object.prototype.hasOwnProperty.call(data, 'page')) {
            const srcFilesBasePath = path.dirname(param.data);
            const srcFileRelativePath = srcFilePath.replace(srcFilesBasePath, '');
            const pageData = data.page;
            data.page = Object.prototype.hasOwnProperty.call(pageData, srcFileRelativePath) ? pageData[srcFileRelativePath] : pageData['/index.ejs'];
          }
          let options = {};
          if (Object.prototype.hasOwnProperty.call(data, 'options')) {
            options = data.options;
          }
          const destFilePath = findDestFilePath(param.src, param.dest, srcFilePath);
          renderHTML(srcFilePath, destFilePath, data, options, param.compression, (err, str) => {
            currentCount++;
            const isComplete = (completeCount === currentCount);
            if (err) {
              reject(err, str, srcFilePath, destFilePath, isComplete);
            } else {
              if (param.log) {
                console.log(chalk.green('Output: ' + destFilePath));
                if (lintRules) {
                  const lintMessages = htmlhint.format(htmlhint.verify(str, lintRules), {colors: true});
                  lintMessages.forEach((lintMessage) => {
                    console.log(lintMessage);
                  });
                }
              }
              callback(false, str, srcFilePath, destFilePath, isComplete);
              resolve();
            }
          });
        });
      } else {
        reject('source file is not found.');
      }
    });
  })
  .catch((err, src, srcFilePath, destFilePath, isComplete) => {
    if (param.log) {
      console.error(chalk.red(err));
    }
    callback(err, src, srcFilePath, destFilePath, isComplete);
  });
};
