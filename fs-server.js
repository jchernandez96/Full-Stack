const http = require("http");
const fs = require("fs");
const path = require("path")
const eventos = require("events")

//Create  event emitter
const EventEmitter = new eventos();

//Registro de eventos
EventEmitter.on("fileRead",(filename)=>{
    console.log(`File "${filename}" fue leido con exito`)
});

//Server 
const server = http.createServer((req, res)=>{

    //Registro de Routas
    const filePath = path.join(__dirname, "messages.txt");

    if(req.url==="/"){
        res.writeHead(200, {"content-type":"text/plain"});
        res.end("Bienvenido Al Servidor De Archivos");
    }
    else if(req.url === "/leer"){
            fs.readFile(filePath, "utf-8",(err,data)=>{
            //Error Leyendo Archivo
            if(err){
                //Mensaje de error por HTTP
                res.writeHead(500, {"content-type":"text/plain"});
                res.end("Error de lectura de archivo");
            };
            //Mensaje de exito por HTTP
            //Caso De Exito - Leemos Archivo
            EventEmitter.emit("fileRead","messages.txt")
            //Data por HTTP
            res.writeHead(200,{"content-type":"text/plain"});
            res.end(`Exito de lectura de archivo ${data}`);
        });
    }else{
        //Mensaje de error por HTTP
        res.writeHead(404, {"content-type":"text/plain"});
        res.end("Page no found");
    }
});

server.listen(3000, ()=>{
    console.log("Server Running at http://localhost:3000");
});