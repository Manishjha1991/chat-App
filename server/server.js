const path =require("path");
const  express =require("express");
const http =require("http");
const socketIO =require("socket.io");
const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
var app =express();
app.use(express.static(publicPath));
var server=http.createServer(app);
var io = socketIO(server);
io.on('connection',(socket) =>{
  console.log("New User Connected");
  socket.on('createMessage',(message)=>{
    console.log("createMessage",message);
    io.emit('newMessage',{
      from:message.from,
      text:message.text,
      createAt:new Date().getTime()
    })
  })
  socket.on('disconnect',()=>{
    console.log("user is disconnect");
  })
})
server.listen(port, () => {
  console.log(`server Running on $(port)`);
});
