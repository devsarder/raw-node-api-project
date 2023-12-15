// dependencies
const fs = require('fs');
const path = require('path');

// module scaffolding
const lib = {};
lib.baseDir = path.join(__dirname, '../.data/');
// write data to file
lib.create = (dir, file, data, callBack) => {
    // open file for writing
    fs.open(`${lib.baseDir + dir}/${file}.json`, 'wx', (err1, fileDescriptor) => {
        if (!err1 && fileDescriptor) {
            // convert dat to string
            const stringData = JSON.stringify(data);
            // write the file synchronously
            fs.writeFile(fileDescriptor, stringData, (err2) => {
                if (!err2) {
                    fs.close(fileDescriptor, (err3) => {
                        if (!err3) {
                            callBack(false);
                        } else {
                            callBack('error writing to new file');
                        }
                    });
                }
            });
        } else {
            callBack(err1);
        }
    });
};
// read the existing file
lib.readfile = (dir, file, callBack) => {
    fs.readFile(`${lib.baseDir + dir}/${file}.json`, 'utf-8', (err, data) => {
        if (err) throw err;
        callBack(err, data);
    });
};
// update the existing file
lib.updateFile = (dir, file, data, callBack) => {
    const stringData = JSON.stringify(data);
    // open the file
    fs.open(`${lib.baseDir + dir}/${file}.json`, 'r+', (err1, fileDescriptor) => {
        if (!err1 && fileDescriptor) {
            fs.ftruncate(fileDescriptor, (err2) => {
                if (!err2) {
                    fs.writeFile(fileDescriptor, stringData, (err3) => {
                        if (!err3) {
                            callBack(false);
                        } else {
                            callBack('error closing file');
                        }
                    });
                } else {
                    callBack('error');
                }
            });
        } else {
            callBack('error writing to new file');
        }
    });
};
// delete the existing file
lib.delete = (dir, file, callBack) => {
    fs.unlink(`${lib.baseDir + dir}/${file}.json`, (err) => {
        if (!err) {
            callBack(false);
        } else {
            callBack('file can not be deleted');
        }
    });
};

// export the library
module.exports = lib;
