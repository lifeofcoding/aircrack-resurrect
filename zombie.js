const fs = require('fs');
const { spawn } = require('child_process');
const { exec } = require('child_process');

var files = [];
spawn('find', ['/media/removable/STORAGE/Handshakes', '-type', 'f', '-name', '*.cmd']).stdout.on('data', function(data) {
  files.push(data.toString());
}).on('close', function(code) {
  files.forEach((file, idx) => {
  	//clean up extra white space
    file = file.replace(file.substr(file.length - 1), '');
    
    console.log('Found restore file:',  file);
    fs.readFile(file, (err, contents) => {
      let cmd = `\n\nscreen -dmS aircrack bash -c "${contents.toString()}"`;
      
      console.log(`Executing command:\n${cmd}`);
      exec(cmd).stdout.on('close', function(code) {
        files.pop();
        
        if (!files.length) {
        	console.log('... and the cracking continues...');
        }
      });
    });
  });
});