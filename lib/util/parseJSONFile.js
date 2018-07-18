/**
 *
 * parseJSONFile
 * @param {object} filePath
 * @param {function} callback
 *
 */

'use strict';

const fs = require('fs-extra');

module.exports = (filePath, callback) => {
  return new Promise((resolve, reject) => {
    fs.exists(filePath, (exists) => {
      if (!exists) {
        reject('"' + filePath + '" is not found.');
      } else {
        resolve();
      }
    });
  })
  .then(() => {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf8', (err, str) => {
        if (err) {
          reject(err);
        } else {
          resolve(str);
        }
      });
    });
  })
  .then((str) => {
    return new Promise((resolve, reject) => {
      try {
        const object = JSON.parse(str.replace(/\n/g, ''));
        callback(false, object);
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  })
  .catch((err) => {
    callback(err);
  });
};
