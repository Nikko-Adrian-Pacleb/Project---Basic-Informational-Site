const http = require('http')
const path = require('path')
const fs = require('fs')

const server = http.createServer((req, res) => {
    // console.log("req: \n", req) // Test
    console.log("req.url: ", req.url) // Test

    // Initialize Paths
    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index' : req.url)
    console.log("filePath: ", filePath) // Test

    // Read File
    fs.readFile(filePath + '.html', (err, content) => {
        // IF Error
        if(err) {
            // IF Page Not Found
            if(err.code == "ENOENT") {
                fs.readFile(
                    path.join(__dirname, 'public', '404.html'),
                    (err, content) => {
                        // console.log("404 Called") // Test
                        res.writeHead(200, {'Content-Type': 'text/html'})
                        res.end(content, 'utf8')
                    }
                )
            }
            // IF Server Error
            else {
                res.writeHead(500)
                res.end(`Server Error: ${err.code}`)
            }
        } 
        // IF Success
        else {
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.end(content, 'utf8')
        }
    })

})

const PORT = process.env.PORT || 3000

server.listen(PORT, () => console.log(`Project Runnning at PORT: ${PORT}`))