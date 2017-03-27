const exec = require('child_process').exec;

const commands = [
    { command: 'git init', options: { cwd: '..' } },
    { command: 'npm i -D husky' },
    { command: 'git add -A' },
    { command: 'git commit -m "init project"' }
];

function runCommands(array) {
    let i = 0;

    function next() {
        if (i >= array.length) {
            return;
        }

        exec(array[i].command, (array[i].options || {}), function (err, stdout) {
            if (err) {
                console.log(err);
            } else {
                console.log(stdout);
            }

            i += 1;
            next();
        });
    }

    next();
}

runCommands(commands);
