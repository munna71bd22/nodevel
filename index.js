const http = require('http')
const url = require('url');
const {StringDecoder} = require('string_decoder')
const router = require('./routes')
const fs = require('fs');


console.log("server is starting on port 3000")

const server = http.createServer((req, res) => {

    var route = router.routes.find(route => route.name === req.url)

    if (route) {
        if (route.method === req.method) {
            try {
                var x = new route.controller()
                var action = route.action

                if (req.method === 'GET') {
                    var response_result = eval("x." + route.action + "()")
                    var filePath = response_result;

                    fs.readFile(filePath, null, function (error, data) {
                        if (error) {
                            res.writeHead(404);
                            res.write('Whoops! File not found!');
                            res.end()
                        } else {
                            res.writeHead(200, {'Content-Type': 'text/html'});
                            res.write(data);
                            res.end()
                        }
                    });
                } else {

                    let body = '';
                    var decoder = new StringDecoder('utf-8')

                    req.on('data', (buffer) => {
                        body += decoder.write(buffer)
                    });
                    req.on('end', function () {
                        body += decoder.end()
                        console.log(body)
                        let f = function (result){
                            res.writeHead(200, {'Content-Type': 'application/json'});
                            res.write(JSON.stringify(result));
                            res.end()
                        }
                        var response_result = eval("x." + route.action + "(body,f)"
                    )
                    });


                }


            } catch (err) {
                fs.readFile("./500.html", null, function (error, data) {
                    if (error) {
                        res.writeHead(500);
                        res.write('500 Internal Server Error!');
                        res.end()
                    } else {
                        res.writeHead(500, {'Content-Type': 'text/html'});
                        res.write(data + err);
                        res.end()
                    }
                });
            }
        } else {
            res.writeHead(405);
            res.write("Method Not Allowed!")
            res.end()
        }
    } else {
        fs.readFile("./404.html", null, function (error, data) {
            if (error) {
                res.writeHead(404);
                res.write('Whoops! File not found!');
                res.end()
            } else {
                res.writeHead(404, {'Content-Type': 'text/html'});
                res.write(data);
                res.end()
            }
        });
    }
})
server.listen(3000)
//server.listen(300,'192.168.1.170')
