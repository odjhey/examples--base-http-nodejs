const http = require('node:http')
const fs = require('node:fs')
const path = require('node:path')

const server = http.createServer(
    function handle(req, res) {

        // serve static files
        if (req.url.startsWith('/public')) {
            // serve static files
            const filePath = path.join(__dirname, req.url);
            const f = fs.readFileSync(filePath)
            res.end(f)
            return
        }

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
        }
    }
)

// especial ip, localhost -> itself
server.listen(1339, '127.0.0.1')