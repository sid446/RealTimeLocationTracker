import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const PORT = 8000;

const app = express();
const server = createServer(app);
const io = new Server(server);

// Use import.meta.url to get the current directory in ES module format
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

io.on("connection",(socket)=>{
    socket.on("send-location",(data)=>{
        io.emit("receive-location",{id:socket.id,...data})

    })
    socket.on("disconnect",()=>{
        io.emit("User-disconnect" ,socket.id)
    
    })
})
app.get("/", (req, res) => {
    res.render("index");
});

server.listen(PORT, () => {
    console.log(`Server is connected to ${PORT}`);
});
