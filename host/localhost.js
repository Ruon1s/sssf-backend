import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';

const sslkey = fs.readFileSync(path.resolve('ssl-key.pem'));
const sslcert = fs.readFileSync(path.resolve('ssl-cert.pem'));


const options = {
    key: sslkey,
    cert: sslcert
};

const reDirect = (req, res) => {
    res.writeHead(301, {'Location': 'https://localhost:8000' + req.url});
    res.end();
};

export default (app, httpsPort, httpPort) => {
    https.createServer(options, app).listen(httpsPort);
    http.createServer(reDirect).listen(httpPort);
};
