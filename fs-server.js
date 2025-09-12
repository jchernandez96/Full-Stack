const http = require("http");
const fs = require("fs");
const path = require("path")
const ev = require("events")

//Create  event emitter
const EventEmitter = new ev();

//Server 
const server = http.createServer((req, res)=>{
    fs.readFile("messages.txt", "utf-8",(err,data)=>{
        if(err){
            //Mensaje de error por HTTP
            res.writeHead(500, {"content-type":"text/plain"});
            res.end("Error de lectura de archivo");
        };
        //Mensaje de exito por HTTP
        res.writeHead(200,{"content-type":"text/plain"});
        res.end(`Exito de lectura de archivo ${data}`);
    });
});

server.listen(3000, ()=>{
    console.log("Server Running at http://localhost:3000");
});