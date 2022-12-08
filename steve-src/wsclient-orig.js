const WebSocketClient = require('websocket').client;
const args = process.argv.slice(2);
//console.log("Args:" + args);

for (let i = 0; i < args[0];i++) 
{
    var client = new WebSocketClient();

    client.on('connectFailed', function(error) 
    {
        console.log('Connect Error: ' + error.toString());
    });

    client.on('connect', function(connection) 
    {
        console.log('Connected');

        connection.on('error', function(error) 
	{
            console.log("Connection Error: " + error.toString());
        });
        connection.on('close', function() 
        {
            console.log('echo-protocol Connection Closed');
        });
        connection.on('message', function(message) 
        {
            if (message.type === 'utf8') 
	    {
                console.log("Received: '" + message.utf8Data + "'");
            }
        });

        function sendData() 
        {
            if (connection.connected) 
	    {
                connection.send("hello from client " + (i+1));
            }
        }

        var millisecondsToWait = 10000;

        setTimeout(function() 
        {
            sendData();
        }, millisecondsToWait);
    });

    client.connect('ws://localhost:8080/', []);
}
