const http = require("http"); 
http.createServer(function (req, res) { 
    res.write("<h1>Hello World!</h1>");
    res.end();
}).listen(8080);