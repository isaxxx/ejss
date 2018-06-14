/**
 *
 * findDestFilePath
 * @param {string} srcFilePathPattern
 * @param {string} dest
 * @param {string} srcFilePath
 * @return {string}
 *
 */

'use strict';

const path = require('path');
const globBase = require('glob-base');

module.exports = (srcFilePathPattern, dest, srcFilePath) => {
  const globStats = globBase(srcFilePathPattern);
  const extName = path.extname(srcFilePath);
  const fileName = path.basename(srcFilePath, extName);
  const dirName = path.dirname(srcFilePath).replace(globStats.base, '');
  return path.join(dest, dirName, fileName + '.html');
};
