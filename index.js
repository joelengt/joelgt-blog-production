// # Ghost Startup
// Orchestrates the startup of Ghost when run from command line.
var express,
    ghost,
    parentApp,
    errors;

// Make sure dependencies are installed and file system permissions are correct.
require('./core/server/utils/startup-check').check();

// Proceed with startup
express = require('express');
ghost = require('./core');
errors = require('./core/server/errors');

// Create our parent express app instance.
parentApp = express();
var path = require('path')
var fs = require('fs')
// Rutas de joelengt

parentApp.get('/demos', function (req, res) {
	fs.readFile('./content/static-pages/demos/index.html', function (err, data) {
        res.writeHead(200,{"Content-Type":"text/html"});
        res.write(data);
        res.end();
    })
})

parentApp.get('/portafolio', function (req, res) {
    fs.readFile('./content/static-pages/portafolio/index.html', function (err, data) {
        res.writeHead(200,{"Content-Type":"text/html"});
        res.write(data);
        res.end();  
    })
})


// Call Ghost to get an instance of GhostServer
ghost().then(function (ghostServer) {
    // Mount our Ghost instance on our desired subdirectory path if it exists.
    parentApp.use(ghostServer.config.paths.subdir, ghostServer.rootApp);

    // Let Ghost handle starting our server instance.
    ghostServer.start(parentApp);
}).catch(function (err) {
    errors.logErrorAndExit(err, err.context, err.help);
});
