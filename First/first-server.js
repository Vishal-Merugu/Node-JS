const http = require('http');
const server = http.createServer((request,response) =>{
    const url = request.url
    if(url.includes('/home')){
        response.setHeader('Context-Type', 'text/html')
        response.write('<html>')
        response.write("<head><title>HOME</title></head>");
        response.write('<body>')
        response.write('<h1>Welcome HOME</h1>')
        response.write('</body>');
        response.write('</html>');
        response.end();
    } else if (url.includes('/about')){
        response.setHeader('Context-Type', 'text/html')
        response.write('<html>')
        response.write("<head><title>About US</title></head>");
        response.write('<body>')
        response.write('<h1>Welcome to About us page</h1>')
        response.write('</body>');
        response.write('</html>');
        response.end();
    } else if(url.includes('/node')){
        response.setHeader('Context-Type', 'text/html')
        response.write('<html>')
        response.write("<head><title>Node</title></head>");
        response.write('<body>')
        response.write('<h1>Welcome to my Node JS Project</h1>')
        response.write('</body>');
        response.write('</html>');
        response.end();
    }
    
});

server.listen(4000)

