import notes from './defaultData.js';

/**
 * @typedef {import('./utils.js').Note} Note
 */

export default class StorageManager {
  STORAGE_KEY_NOTES = 'notes';

  populate() {
    if (!this.getNotes() || this.getNotes().length === 0) {
      localStorage.setItem(this.STORAGE_KEY_NOTES, JSON.stringify(notes));
    }
  }

  getNotes() {
    return JSON.parse(localStorage.getItem(this.STORAGE_KEY_NOTES)) || [];
  }

  getNoteById(id) {
    const allNotes = this.getNotes();
    return allNotes.find(note => note.id === id) || undefined;
  }

  setNotes(notesArray) {
    localStorage.setItem(this.STORAGE_KEY_NOTES, JSON.stringify(notesArray));
  }

  addNote(note) {
    const allNotes = this.getNotes();
    allNotes.push(note);
    this.setNotes(allNotes);
  }
  
  deleteNoteById(id) {
    const allNotes = this.getNotes();
    const filteredNotes = allNotes.filter(note => note.id !== id);
    this.setNotes(filteredNotes);
  }

  deleteAllNotes() {
    localStorage.removeItem(this.STORAGE_KEY_NOTES);
  }

  modifyNoteById(id, content, tags) {
    const allNotes = this.getNotes();
    const noteIndex = allNotes.findIndex(note => note.id === id);
    if (noteIndex !== -1) {
      allNotes[noteIndex].content = content;
      allNotes[noteIndex].tags = tags;
      allNotes[noteIndex].lastEdit = new Date();
      allNotes[noteIndex].pinned != allNotes[noteIndex].pinned;
      this.setNotes(allNotes);
    }
  }

  pinById(id) {
    const allNotes = this.getNotes();
    const noteIndex = allNotes.findIndex(note => note.id === id);
    allNotes[noteIndex].pinned = !allNotes[noteIndex].pinned;
    this.setNotes(allNotes);
  }
}