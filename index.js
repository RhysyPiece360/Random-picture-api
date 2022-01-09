var express = require('express')
const winston = require('winston');
var app = express()
const port = 8080
const context =("request handeld ")
const io = require('@pm2/io');
const fs = require('fs');
//bruh, my lint got mad at me, when i was reading off code from docs lmfao
const logger = winston.createLogger({
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'combined.log' })
    ]
  });
  logger.log({
    level: 'info',
    message: 'api start'
  });
  //pm2 stuff
 

  const currentReqs = io.counter({
    name: 'Realtime request count',
    id: 'app/realtime/requests'
  });
  
app.get('/', function (req, res) {
    console.log("request required")
    res.send('/image endpoint has the actuall images sent,')
    
    console.log("Request Finished")
    logger.info('api request handeld');
    currentReqs.inc();
  })
  const path = require('path');


const directoryPath = path.join(__dirname, 'image');
const pickRandomNumber = (max) => Math.floor(Math.random() * max);

const allowedFileTypes = [".jpg", ".png"];
const hasAllowedEnding = file => allowedFileTypes.some(ending => file.toLowerCase().endsWith(ending));

app.get('/image', function (req, res) {
    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        const images = files.filter(hasAllowedEnding);
        const pickedIndex = pickRandomNumber(images.length);
        const imageName = images[pickedIndex];
        res.sendFile(path.join(directoryPath, imageName));
        logger.info('api request handeld');
        currentReqs.inc();
    });
});
app.get('/imagecount', function (req, res) {
res.send("in devlopment still")

})
console.log("works here")
// i apparently dont remember any syntax of javascript, thats nice

app.listen(port, () => {
    console.log(`app listening at http://satawiki.catsarecute.xyz:${port}`)
  })
  
  
  
