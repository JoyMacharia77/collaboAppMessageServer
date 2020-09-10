//Websocket Server in the Project for The Collabo App Chat Interface
const SocketServer = require('websocket').server
const http = require('http')

const server = http.createServer((req, res) => {})

//Making The Server Listen
server.listen(3000, ()=>{
    console.log("Listening to port 3000...")
})

//Creating a webSocket Server
webSocketServer = new SocketServer({httpServer:server})

//Array Created to store all connections
const connections = []

//Checking for new connection requests by making a call to the webSocket server
webSocketServer.on('request', (req) => {
    const connection = req.accept() //Accepting Request
    console.log('New Device Connected!')
    connections.push(connection) //pushed to array

    //Whenever there's a new message....(mes) holds the message
    connection.on('message' , (mes) =>{
        //sends message to everyone except sender
        connections.forEach(element =>{
            //If element is not equal to current connection
            if(element != connection)
                element.sendUTF(mes.utf8Data)
        })
    })
   
    //When Connection Closes
    connection.on('close', (resCode, des) =>{
        console.log('Connection Closed')
        //Removes elements from an array and if necessary returns new ones
        //in their place
        connections.splice(connections.indexOf(connection), 1)
    }) 

 /*   /**
 * Forcefully terminating HTTP server.

const close = (callback) => {
    for (const connection of connections) {
      connection.destroy();
  
      connections.delete(socket);
    }
  
    webSocketServer.close(callback);
  }; */
})

