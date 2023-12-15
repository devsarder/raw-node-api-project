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
            callBack('could not create a new file it may exists');
        }
    });
};
