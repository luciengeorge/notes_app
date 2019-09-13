const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find((note) => note.title === title);
  if(duplicateNote) {
    console.log(chalk.red('note already exist'));
  } else {
    notes.push({ title, body })
    saveNotes(notes);
    console.log(chalk.green('note saved'));
  }
}

const loadNotes = () => {
  try {
    const dataJSON = fs.readFileSync('notes.json').toString();
    return JSON.parse(dataJSON);
  } catch(error) {
    return [];
  }
}

const saveNotes = (notes) => fs.writeFileSync('notes.json', JSON.stringify(notes));

const removeNote = (title) => {
  const notes = loadNotes();
  const filteredNotes = notes.filter((note) => {
    return note.title !== title;
  });
  if (filteredNotes.length === notes.length) {
    console.log(chalk.red('Note not found'));
  } else {
    saveNotes(filteredNotes);
    console.log(chalk.green(`Note with title: '${title}' was removed.`));
  }
}

const listNotes = () => {
  const notes = loadNotes();
  if (notes.length === 0) {
    console.log(chalk.red('There are no notes'));
  }
  notes.forEach((note) => console.log(`${chalk.bold.underline(note.title)}: ${note.body}`));
}

const readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find((note) => note.title === title);
  console.log(note ? `${chalk.bold.underline(note.title)}: ${note.body}` : chalk.red('Note not found'));
}

module.exports = { addNote, removeNote, listNotes, readNote };
