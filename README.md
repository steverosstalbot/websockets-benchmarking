1) build this image as "docker build -t wsclient ."
2) than run docker-compose up
3) cd steve-src
4) invoke from the command line:
   ./wsclients [number to invoke]

   This is a bash script that spawns the wsclient as a separate 
   process by invoking 
     node wsclient.js [number of time to fork] [seed-name] [wait] [numTries each thread]

  

