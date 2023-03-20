const http = require('node:http')
const fs = require('node:fs')

const server = http.createServer(
    function handle(req, res) {

        switch (req.url) {
            case '/':
                console.log('yaharu!')
                const f = fs.readFileSync('./public/index.html')
                res.end(f)
                break;
            case '/favicon.ico':
                const f2 = fs.readFileSync('./public/favicon.ico')
                res.end(f2)
                break;
            case '/public/script.js':
                const f3 = fs.readFileSync('./public/script.js')
                res.end(f3)
                break;
        }
    }
)

// especial ip, localhost -> itself
server.listen(1339, '127.0.0.1')