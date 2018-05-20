const path = require('path');
const globBase = require('glob-base');

/**
 *
 * find dest path
 * @param {string} srcFilePathPattern	src file path pattern
 * @param {string} dest					dest base path
 * @param {string} srcFilePath			ejs param object
 * @return {string} 					dest file path
 *
 */

module.exports = (srcFilePathPattern, dest, srcFilePath) => {
    let globStats = globBase(srcFilePathPattern),
        extName = path.extname(srcFilePath),
        fileName = path.basename(srcFilePath, extName),
        dirName = path.dirname(srcFilePath).replace(globStats.base, ''),
        destFilePath = path.join(dest, dirName, fileName + '.html');
    return destFilePath;
};
