
// INFO FILE
const { key_api, base_api } = require("../../src/base/domain.js");

exports.handler = async (event) => {
    let statusCode, data;
    const { file_code} = event.queryStringParameters;
    console.log("file_code:", file_code);
    
    try {
        const response = await fetch(`${base_api}/file/info?key=${key_api}&file_code=${file_code}`);
        data = await response.json();
        statusCode = 200;
    } catch (err) {
        statusCode = err.statusCode || 500;
        data = { error: err.message };
    }

    return {
        statusCode,
        body: JSON.stringify(data)
    };
};
