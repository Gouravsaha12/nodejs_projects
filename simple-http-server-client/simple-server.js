const http = require("http")

const server = http.createServer();

server.on("request", (req, res) => {

    console.log(req.method);

    console.log(req.url);

    console.log(req.headers);

    req.on("data", (chunk) => {
        console.log(chunk.toString("utf-8"));
    })

    req
})

server.listen(8050, ()=>{
    console.log("listening on http://localhost:8050");
})