
const express = require('express');
const jwt = require('jsonwebtoken');
const http = require('http');

const app = express();
const PORT = 3001;
const SECRET = 'test_secret';

// Mock Middleware
const ensureAuthenticated = (req, res, next) => {
    const auth = req.headers['authorization'];
    if (!auth) {
        return res.status(403).json({
            message: 'Unauthorized , JWT  token is required',
        });
    }
    try {
        const decoded = jwt.verify(auth, SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Unauthorized , JWT is wrong or expired',
            error: error.message
        });
    }
};

app.get('/products', ensureAuthenticated, (req, res) => {
    res.status(200).json({ success: true });
});

const server = app.listen(PORT, () => {
    console.log(`Test server running on ${PORT}`);
    runTests();
});

function makeRequest(path, headers = {}) {
    return new Promise((resolve) => {
        const options = {
            hostname: 'localhost',
            port: PORT,
            path: path,
            method: 'GET',
            headers: headers
        };
        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve({ status: res.statusCode, body: JSON.parse(data) }));
        });
        req.end();
    });
}

async function runTests() {
    const validToken = jwt.sign({ name: 'test' }, SECRET);

    console.log("\nTest 1: Token in Query Params (Simulating User Issue)");
    // Note: Http module doesn't automatically put query params in headers obviously.
    const res1 = await makeRequest(`/products?authorization=${validToken}`);
    console.log(`Status: ${res1.status}, Msg: ${res1.body.message}`);

    console.log("\nTest 2: Token in Headers (Plain Token)");
    const res2 = await makeRequest('/products', { 'authorization': validToken });
    console.log(`Status: ${res2.status}, Success: ${res2.body.success}`);

    console.log("\nTest 3: Token in Headers (Bearer Prefix)");
    const res3 = await makeRequest('/products', { 'authorization': `Bearer ${validToken}` });
    console.log(`Status: ${res3.status}, Msg: ${res3.body.message}, Error: ${res3.body.error}`);

    server.close();
}
