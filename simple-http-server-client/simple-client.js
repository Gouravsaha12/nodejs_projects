const http = require("http");

const agent = new http.Agent({ keepAlive: true });

const request = http.request({
    agent: agent,
    hostname: "localhost",
    port: 8050,
    method: "POST",
    path: "/create-post",
    headers: {
        "Content-Type": "application/json",
        // "Content-length": 16
    },
})

request.on("response", (res)=>{

})

request.write(JSON.stringify({message: "Hi"}))
request.write(JSON.stringify({message: "Hi there"}))

request.end(JSON.stringify({message: "My last message!!"}));