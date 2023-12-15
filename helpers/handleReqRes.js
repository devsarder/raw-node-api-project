// dependencies
const url = require('url');
const { StringDecoder } = require('string_decoder');
const routes = require('../routes');
const { notFoundHandler } = require('../handlers/routeHandlers/notFoundHandler');

// module scaffolding
const handler = {};
handler.handleReqRes = (req, res) => {
    // get the url and parse it
    const parsedUrl = url.parse(req.url, true); // added true because of query string
    const { path } = parsedUrl;
    const trimmedUrl = path.replace(/^\/+|\/$/g, ''); // to remove forward slash used reg expressions
    const method = req.method.toLowerCase();
    const queryString = parsedUrl.query;
    const headersObj = req.headers;
    const decoder = new StringDecoder('utf-8'); // required from node core module string decoder
    let realData = {}; // this realData we got from the req body
    const reqPropertiesObj = {
        trimmedUrl,
        method,
        queryString,
        headersObj,
    };
    const chosenHandler = routes[trimmedUrl] ? routes[trimmedUrl] : notFoundHandler;

    req.on('data', (buffer) => {
        realData += decoder.write(buffer);
    });
    req.on('end', () => {
        realData += decoder.end();
        console.log(realData);
        chosenHandler(reqPropertiesObj, (statusCode, payload) => {
            // eslint-disable-next-line no-param-reassign
            statusCode = typeof statusCode === 'number' ? statusCode : 500;
            // eslint-disable-next-line no-param-reassign
            payload = typeof payload === 'object' ? payload : {};
            const payloadString = JSON.stringify(payload);
            res.writeHead(statusCode);
            res.end(payloadString);
        });
    });

    // res.end('hello programmers how are you doing');
};
module.exports = handler;
