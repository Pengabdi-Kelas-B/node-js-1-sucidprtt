
// import app from './app.js'
// di file pacakage.json tambahin > "type": "module", > untuk model modern ECSM
const app = require("./app");

const args = process.argv.slice(2);

const command = args[0];

switch (command) {
    case "make-folder":
        app.makeFolder()
        break;
    case "make-file":
        app.makeFile()
        break;
    case "ext-sorter":
        app.extSorter()
        break;
    case "read-folder":
        app.readFolder()
        break;
    case "read-file":
        app.readFile()
        break;
    default:
        throw Error("Invalid command")
        break;
}

// console.log(args);


// app.hellow()
// console.log(name);


