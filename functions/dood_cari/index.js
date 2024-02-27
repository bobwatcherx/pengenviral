
// CARI FILE
const { key_api, base_api } = require("../../src/base/domain.js");

exports.handler = async (event) => {
    let statusCode, data;
    const { search_term} = event.queryStringParameters;
    console.log("search_term:", search_term);
    
    try {
        const response = await fetch(`${base_api}/search/videos?key=${key_api}&search_term=${search_term}`);
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
