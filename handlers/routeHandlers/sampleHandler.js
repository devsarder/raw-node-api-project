// module scaffolding
const handler = {};
handler.sampleHandler = (reqPropertiesObj, callBack) => {
    // console.log('from sample handler', reqPropertiesObj);
    try {
        callBack(200, {
            message: 'this is a sample url',
        });
    } catch (error) {
        console.log(error);
    }
    // console.log('sampleHandler');
};

module.exports = handler;
