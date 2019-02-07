const fs = require('fs');
const { spawn } = require('child_process');
const { exec } = require('child_process');
var restoreFiles = spawn('find', ['/media/removable/STORAGE/Handshakes', '-type', 'f', '-name', '*.cmd']);

var files = [];
restoreFiles.stdout.on('data', function(data) {
  console.log(data.toString())
  files.push(data.toString());
});

restoreFiles.on('close', function(code) {
  let restoreFile = files[files.length - 1];
  restoreFile = restoreFile.replace(restoreFile.substr(files[files.length - 1].length - 1), '');
  //.replace('/media/removable/STORAGE/Handshakes/', '');
  console.log('restoreFile:',  restoreFile);
    
  fs.readFile(restoreFile, (err, contents) => {
    console.log('File contents:', contents.toString());
     
    var cmd = `screen -dmS aircrack bash -c "${contents.toString()}"`;
    console.log(cmd);
      
    exec(cmd).stdout.on('data', function(data) {
            //console.log(data.toString());
        }).on('close', function(code) {
            console.log('Done with code:', code);
        });
    });
});