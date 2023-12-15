// dependencies
const http = require('http');
const { handleReqRes } = require('./helpers/handleReqRes');
const environment = require('./helpers/environment');
// app object-module scaffolding
const app = {};
// configuration
// app.config = {
//     port: 3000,
// };

// create the server
app.createServer = () => {
    const server = http.createServer(handleReqRes);
    server.listen(environment.port, () => {
        console.log(`server listening on ${environment.port}`);
    });
};

// start the server
app.createServer();
