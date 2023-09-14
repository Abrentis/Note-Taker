const db = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
    readFromFile,
    readAndAppend,
    writeToFile,
} = require('../helpers/fsUtils');

// ---> /api/notes
// Handles GET request in public/assets/js/index.js
db.get('/', (req, res) => {
    readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)));
});

// ---> /api/notes/:id
db.delete('/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/notes.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const updatedData = json.filter((note) => note.id !== noteId);
            writeToFile('./db/notes.json', updatedData);
            res.json(`Note ${noteId} has been deleted!`);
        });
});

// ---> /api/notes
// Handles POST request in public/assets/js/index.js
db.post('/', (req, res) => {
    console.log(req.body);
    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };

        readAndAppend(newNote, './db/notes.json');
        res.json('Note added successfully');
    } else {
        res.error('Error in adding note');
    }
});

module.exports = db;