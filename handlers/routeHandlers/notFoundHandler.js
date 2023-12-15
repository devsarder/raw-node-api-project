// module scaffolding
const handler = {};
handler.notFoundHandler = (reqPropertiesObj, callBack) => {
    callBack(404, {
        message: 'Not Found',
    });
    // console.log('notFoundHandler');
};

module.exports = handler;
