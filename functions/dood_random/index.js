
// LIST RANDOM FILE
const { key_api, base_api } = require("../../src/base/domain.js");

exports.handler = async (event) => {
    let statusCode, data;
    const { fld_id,page,per_page } = event.queryStringParameters;
    console.log("fld_id:", fld_id,page,per_page);
    
    try {
        const response = await fetch(`${base_api}/file/list?key=${key_api}&fld_id=${fld_id}&page=${page}&per_page=${per_page}`);
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
