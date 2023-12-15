// dependencies
const http = require('http');
const { handleReqRes } = require('./helpers/handleReqRes');
const environment = require('./helpers/environment');
const lib = require('./lib/data');
// app object-module scaffolding
const app = {};
// configuration
// app.config = {
//     port: 3000,
// };
// console.log(lib);
// @TODO: calling the function jus for testing
// lib.create('test', 'input', { name: 'bangladesh', capital: 'DHAKA' }, (err) => {
//     console.log('error from index.js', err);
// });
// read file 'test
// lib.readfile('test', 'newfile', (err, data) => {
//     console.log(err, data);
// });
// // update existing file
// lib.updateFile('test', 'newfile', { name: 'italy', language: 'italian' }, (err) => {
//     console.log(err);
// });
// delete existing file
lib.delete('test', 'newfile', (err) => {
    console.log(err);
});

// create the server
app.createServer = () => {
    const server = http.createServer(handleReqRes);
    server.listen(environment.port, () => {
        console.log(`server listening on ${environment.port}`);
    });
};

// start the server
app.createServer();
