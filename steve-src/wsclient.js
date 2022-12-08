// wsclient [number of time to fork] [seed-name] [wait] [numTries each thread]
const WebSocketClient = require('websocket').client;
const args = process.argv.slice(2);
console.log("Args:" + args);

var numForks = args[0]
for (let i = 0; i < numForks; i++) 
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

        function sendData(seqNo) 
        {
            var seedName = args[1];
            if (connection.connected) 
	    {
                connection.send("hello from client " + seedName + ":" + (i+1) + " " + seqNo);
            }
        }

        var millisecondsToWait = args[2];
	var numTries = args[3];
        for (let i = 1; i < numTries; i++) 
        {
            setTimeout(function timer() 
	    {
		sendData(i);
            }, i * millisecondsToWait);
        }
    });

    client.connect('ws://localhost:8080/', []);
}
