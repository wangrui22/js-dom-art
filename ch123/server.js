http = require('http');
url = require('url');
fs = require('fs');

http.createServer(function(req , res) {
    var pathName = url.parse(req.url).pathname;
    fs.readFile(pathName.substr(1), function(err, data) {
        if(err) {
            console.log(err);
        } else {
            console.log("ok");
            //res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data.toString());
        }
        res.end();
    });

}).listen(8080);