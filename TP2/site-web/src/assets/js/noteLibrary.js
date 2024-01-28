
/**
 * @typedef {import('./utils.js').Note} Note
 */

export default class NoteLibrary {
    noteList = document.getElementById('notes');
    pinnedNoteList = document.getElementById('pinned-notes');
    ascendingValueComparer = 'newest';
    selectedNote = null;
  
    constructor(storageManager) {
      this.storageManager = storageManager;
    }
  

    createHTMLNote(note) {
      const noteDiv = document.createElement('div');
      noteDiv.classList.add('note');
  
      
      const h2 = document.createElement('h2');
      h2.textContent = note.title;
      noteDiv.appendChild(h2);
  
      const p = document.createElement('div');
      p.textContent = note.content;
      noteDiv.appendChild(p);
  
      noteDiv.dataset.id = note.id;
      
      const tagsElement = document.createElement('p');
      tagsElement.textContent = `Tags: ${note.tags.filter(value => value.trim() !== '').map(value => value.trim()).join(', ')}`;
      noteDiv.appendChild(tagsElement);
  
      const lastEditElement = document.createElement('p');
      const lastEditDate = new Date(note.lastEdit);
      lastEditElement.textContent = `Last Edited: ${lastEditDate.toDateString()}`;
      noteDiv.appendChild(lastEditElement);
  
      noteDiv.style.backgroundColor = note.color;
  
  
      const pinIcon = document.createElement('i');
      pinIcon.classList.add('pin', 'fa', 'fa-paperclip');
      if (!note.pinned) {
          pinIcon.classList.add('hidden');
      }
      noteDiv.appendChild(pinIcon);
  
  
      const deleteIcon = document.createElement('i');
      deleteIcon.classList.add('delete-button', 'hidden', 'fa', 'fa-trash-o');
      deleteIcon.addEventListener('click', (e) => {
          e.stopPropagation();  
          this.deleteNote(note.id);
      });
      noteDiv.appendChild(deleteIcon);
  
  
      const detailsIcon = document.createElement('i');
      detailsIcon.classList.add('details-button', 'hidden', 'fa', 'fa-info');
      detailsIcon.addEventListener('click', () => {
          window.location.href = './detail.html?id=' + note.id.toString();
        })
      noteDiv.appendChild(detailsIcon);
      
      noteDiv.addEventListener('mouseover', () => {
        pinIcon.classList.remove('hidden');
    });     
      
      noteDiv.addEventListener('mouseout', () => {
          if (!note.pinned) {
              pinIcon.classList.add('hidden');
          }
      });
      
      noteDiv.addEventListener('click', () => {
          if (this.selectedNote === noteDiv) {
              this.selectedNote = null;
              noteDiv.classList.remove('selected');
              deleteIcon.classList.add('hidden');
              detailsIcon.classList.add('hidden');
          } else {
              if (this.selectedNote) {
                  this.selectedNote.classList.remove('selected');
                  this.selectedNote.querySelector('.delete-button').classList.add('hidden');
                  this.selectedNote.querySelector('.details-button').classList.add('hidden');
              }
              this.selectedNote = noteDiv;
              noteDiv.classList.add('selected');
              deleteIcon.classList.remove('hidden');  
              detailsIcon.classList.remove('hidden'); 
          }
      });
      
      
      pinIcon.addEventListener('click', (e) => {
          e.stopPropagation(); 
          this.pinNote(noteDiv.dataset.id);
        });
  
      return noteDiv;
  }
  
  selectNote(noteNodeElements) {
      noteNodeElements.deleteIcon.classList.toggle('hidden');
      noteNodeElements.detailsIcon.classList.toggle('hidden');
  }
  
  generateHTMLNotes(notes) {
      notes.forEach(note => {
          const noteDiv = this.createHTMLNote(note);
          if (note.pinned) {
              this.pinnedNoteList.appendChild(noteDiv);
          } else {
              this.noteList.appendChild(noteDiv);
          }
      });
  }
  
  updateListsInterface() {
      this.noteList.innerHTML = '';
      this.pinnedNoteList.innerHTML = '';
      this.generateHTMLNotes(this.storageManager.getNotes());
  }
  
  addNoteToList(note) {
      this.storageManager.addNote(note);
      this.updateListsInterface();
  }
  
  sortNotes(order) {
      let notes = [...this.storageManager.getNotes()]; 
  
      notes.sort((a, b) => {
          const dateA = new Date(a.lastEdit);
          const dateB = new Date(b.lastEdit);
      
          if (order === 'newest') {
            return dateB - dateA; 
          } else {
            return dateA - dateB;
          }
      });
      
      this.storageManager.setNotes(notes);
  }
  
  deleteNote(id) {
      this.storageManager.deleteNoteById(id);
      this.updateListsInterface();
  }
  
  pinNote(id) {
      this.storageManager.pinById(id);
      this.updateListsInterface();
    }
  
  deleteAll() {
      this.storageManager.clearNotes(); 
      this.updateListsInterface();
  }
  
  
  }