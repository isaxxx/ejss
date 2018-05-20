const chalk = require('chalk');
const fs = require('fs-extra');

/**
 *
 * parse options file
 * @param {object} filePath     options file path
 * @param {function} callback   callback function
 *
 */

module.exports = (filePath, callback) => {
    callback = callback || function () {};
    return new Promise((resolve, reject) => {
        fs.exists(filePath, (exists) => {
            if (!exists) {
                console.error(chalk.red('"' + filePath + '" is not found.'));
            } else {
                resolve();
            }
        });
    })
    .then(() => {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, 'utf8', (err, body) => {
                if (err) {
                    console.error(chalk.red(err));
                } else {
                    resolve(body);
                }
            });
        });
    })
    .then((body) => {
        if (/\.json$/.test(filePath)) {
            try {
                let options = JSON.parse(body.replace(/\n/g, ''));
                callback(options);
            } catch (err) {
                console.error(chalk.red(err));
            }
        } else {
            console.error(chalk.red('"' + filePath + '" is invalid file format.'));
        }
    });
};
