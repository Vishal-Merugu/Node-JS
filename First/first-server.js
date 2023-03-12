const http = require('http');
const fs = require('fs');

const server = http.createServer((request,response) =>{
    const url = request.url;
    const method = request.method;
    if(url === '/'){
        response.setHeader('Context-Type', 'text/html')
        response.write('<html>')
        response.write("<head><title>Enter Message</title></head>");
        response.write('<body>')
        response.write('<form action = "/message" method = "POST"><input type = "text" name = "message" ><button type = "submit">Send</button></form>')
        response.write('</body>');
        response.write('</html>');
        return response.end();
    } 
    if(url === '/message' && method === "POST"){
        const body = []
        request.on('data',(chunk) =>{
            console.log(chunk);
            body.push(chunk)
        })
        return request.on('end',() =>{
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            console.log(message);
            fs.writeFile('message.txt', message, (err) =>{
                response.statusCode = 302;
                response.setHeader('Location','/');
                return response.end();
            });
        })

    }
    response.setHeader('Content-Type','text/html');
    response.write("<html>");
    response.write("<head><title>Hello from Node JS</title></head>");
    response.write("<body>Hello</body>")
    response.write("</html>");
    response.end();

});
server.listen(3000)


