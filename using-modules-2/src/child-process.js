const { exec, spawn } = require('child_process');

// exec('curl ifconfig.me', (err, stdout, sterr) => {
//     console.log(stdout);
// });

const ls = spawn('ls', ['-la']);

ls.stdout.on('data', data => console.log('stdout', data.toString()));
ls.stdout.on('data', data => console.log('stdout', data.toString()));
ls.on('error', error => console.log('error', error));
ls.on('close', code => console.log('close', code));

