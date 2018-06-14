/**
 *
 * findSrcFiles
 * @param {string} srcFilePathPattern
 * @return {array}
 *
 */

'use strict';

const path = require('path');
const glob = require('glob');

module.exports = (srcFilePathPattern) => {
  return glob.sync(srcFilePathPattern).filter((srcFilePath) => {
		return (path.basename(srcFilePath).charAt(0) !== '_' && path.extname(srcFilePath) === '.ejs');
	});
};
