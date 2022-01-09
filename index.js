var express = require('express')
const winston = require('winston');
var app = express()
const port = 8080
const context =("request handeld ")
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
   
app.get('/', function (req, res) {
    console.log("request required")
    res.send('hello world')
    
    console.log("Request Finished")
    logger.info('api request handeld');
  })
  const path = require('path');
const fs = require('fs');

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
    });
});

console.log("works here")
// i apparently dont remember any syntax of javascript, thats nice

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
  
  