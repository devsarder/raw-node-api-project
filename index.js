// dependencies
const http = require('http');

// app scaffolding
const app = {};
// configuration
app.config = {
    port: 3000,
};

// create the server
app.createServer = () => {
    const server = http.createServer(app.handleResReq);
    server.listen(app.config.port, () => {
        console.log(`server listening on ${app.config.port}`);
    });
};

// handle requests and responses
app.handleResReq = (req, res) => {
    res.end('hello programmers how are you doing');
};
// start the server
app.createServer();
