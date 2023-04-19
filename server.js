const http = require('node:http')
const fs = require('node:fs')
const path = require('node:path')

const server = http.createServer(
    function handle(req, res) {

        // serve static files
        if (req.url.startsWith('/public')) {
            // remove query params
            const plainUrl = req.url.split('?')[0]
            // serve static files
            const filePath = path.join(__dirname, plainUrl);
            const f = fs.readFileSync(filePath)
            // get extension
            const ext = path.extname(filePath).replace('.', '')

            res.setHeader('Content-Type', `text/${ext}`)
            res.end(f)
            return
        }

        // handle actions
        if (req.method === "POST" && req.url.startsWith('/actions')) {
            // log request body

            new Promise((resolve, reject) => {
                // read request body

                let body = []
                req.on('data', (chunk) => {
                    body.push(chunk)
                })
                req.on('end', () => {
                    body = Buffer.concat(body).toString()

                    resolve(body)
                })
            }).then(d => {

                // convert form data to object
                const formData = d.split('&').reduce((acc, cur) => {
                    const [key, value] = cur.split('=')
                    acc[key] = value
                    return acc
                }, {})


                // redirect
                if (!formData.name) {
                    res.writeHead(302, {
                        'Location': '/public/someform.html?error=somethingwrong'
                    })

                } else {
                    res.writeHead(302, {
                        'Location': '/public/someform.html?success=nice'
                    })
                }

                res.end('ok')
            })

            return
        }

        switch (req.url) {
            case '/':
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