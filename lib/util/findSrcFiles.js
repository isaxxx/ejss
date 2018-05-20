const path = require('path');
const glob = require('glob');

/**
 *
 * find src files
 * @param {string} srcFilePathPattern	src file path pattern
 * @return {array}						array in files path
 *
 */

module.exports = (srcFilePathPattern) => {
    let srcFiles = glob.sync(srcFilePathPattern);
    srcFiles = srcFiles.filter((srcFilePath) => {
		return (path.basename(srcFilePath).charAt(0) !== '_');
	});
    return srcFiles;
};
