http = require('http');
url = require('url');
fs = require('fs');
express = require('express');
path = require('path');

var app = express();
app.use(express.static(path.join(__dirname,'./')));

app.all('/', function(req, res){
    console.log("=======================================");
    console.log("请求路径："+req.url);
    var filename = req.url.split('/')[req.url.split('/').length-1];
    var suffix = req.url.split('.')[req.url.split('.').length-1];
    console.log("文件名：", filename);
    if(req.url==='/'){
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(get_file_content(path.join(__dirname, 'html', 'index.html')));
    }else if(suffix==='css'){
      res.writeHead(200, {'Content-Type': 'text/css'});
      res.end(get_file_content(path.join(__dirname, 'public', 'css', filename)));
    }else if(suffix in ['gif', 'jpeg', 'jpg', 'png']) {
      res.writeHead(200, {'Content-Type': 'image/'+suffix});
      res.end(get_file_content(path.join(__dirname, 'public', 'images', filename)));
    }
  });
  
  
  function get_file_content(filepath){
    return fs.readFileSync(filepath);
  }
  
  app.listen(8080);