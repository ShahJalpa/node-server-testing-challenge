const express = require('express');

const Dances = require('./dances/dances-model.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ api: 'up'});
});

server.get('/dances', (req, res) => {
    Dances.getAll()
        .then(dances => {
            res.status(200).json(dances);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

server.get('/dances/id', (req, res) => {
    res.end()
});

module.exports = server;
