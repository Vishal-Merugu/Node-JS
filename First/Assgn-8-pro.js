const http = require('http');
const fs = require('fs');

const server = http.createServer((req,res) =>{
    const url = req.url;
    const method = req.method;
    if (url === '/'){
        fs.readFile('message.txt' , (err,msg) =>{
            const message = msg.toString()
            if (message === undefined){
                res.setHeader('Context-Type', "text/html");
                res.write('<html>');
                res.write("<head><title>Enter Message</title></head>");
                res.write('<body>')
                res.write('<form action = "/message" method = "POST"><input type = "text" name = "message" ><button type = "submit">Send</button></form>')
                res.write('</body>');
                res.write('</html>');
                return res.end();
            }else {
                res.setHeader('Context-Type', "text/html");
                res.write('<html>');
                res.write("<head><title>Enter Message</title></head>");
                res.write('<body>')
                res.write(`<p>${message}</p>`)
                res.write('<form action = "/message" method = "POST"><input type = "text" name = "message" ><button type = "submit">Send</button></form>')
                res.write('</body>');
                res.write('</html>');
                return res.end();
  
            }
        })
        
    }
    if(url === '/message' && method === 'POST'){
        const body = []
        req.on('data', (chunk) =>{
            body.push(chunk)
        })
        return req.on('end',()=>{
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            console.log(message);
            fs.writeFile('message.txt',message, (err) =>{
                res.statusCode = 302;
                res.setHeader('Location','/');
                return res.end();
            })
        })
    }
})
server.listen(5000);