var http = require('http');
fs = require('fs')


fs.readFile('./index.html', function(err, html){
    if(err){
        throw err;
    }
    http.createServer(function(req, res){
        switch(req.url){
            case '/':
                res.writeHeader(200,{
                    "Content-Type": "text/html"
                });
                res.write(html);
                res.end;
                break;
        }
    }).listen(8888);
});
