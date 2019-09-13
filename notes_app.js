const validator = require('validator');
const chalk = require('chalk');
const yargs = require('yargs');
const note = require('./notes.js');

// customize yargs version
yargs.version('1.1.0');

// create add command
yargs.command({
  command: 'add',
  describe: 'add a new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true, // make sure the title arg is there
      type: 'string' // enforce type of arg
    },
    body: {
      describe: 'Note body',
      demandOption: true, // make sure the title arg is there
      type: 'string' // enforce type of arg
    }
  },
  handler(argv) {
    note.addNote(argv.title, argv.body);
  }
});

// create remove command
yargs.command({
  command: 'remove',
  describe: 'remove a note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    note.removeNote(argv.title);
  }
});

// create list command
yargs.command({
  command: 'list',
  describe: 'listing notes',
  handler() {
    note.listNotes();
  }
});

// create read command
yargs.command({
  command: 'read',
  describe: 'read a note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    note.readNote(argv.title);
  }
});

yargs.parse();
