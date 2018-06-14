/**
 *
 * renderHTML
 * @param {string} srcFilePath
 * @param {string} destFilePath
 * @param {object} data
 * @param {object} option
 * @param {bool} isCompression
 * @param {function} callback
 * @return {object}
 *
 */

'use strict';

const ejs = require('ejs');
const fs = require('fs-extra');
const Minimize = require('minimize');

module.exports = (srcFilePath, destFilePath, data, option, isCompression, callback) => {
  callback = callback || function () {};
  return new Promise((resolve, reject) => {
    ejs.renderFile(srcFilePath, data, option, (err, str) => {
      if (err) {
        reject(err);
      } else {
        resolve(str);
      }
    });
  })
  .then((str) => {
    return new Promise((resolve, reject) => {
      if (isCompression) {
        const minimize = new Minimize();
        minimize.parse(str, (err, str) => {
          if (err) {
            reject(err);
          } else {
            resolve(str);
          }
        });
      } else {
        resolve(str);
      }
    });
  })
  .then((str) => {
    return new Promise((resolve, reject) => {
      fs.outputFile(destFilePath, str, (err) => {
        if (err) {
          reject(err);
        } else {
          callback(false, str);
        }
      });
    });
  })
  .catch((err) => {
    callback(err);
  });
};
