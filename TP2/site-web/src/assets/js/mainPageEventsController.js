import { createNoteObject } from './utils.js';


/*@typedef {import('./utils.js').Note} Note*/
export default class MainPageEventsController {
  constructor(noteLibrary) {
    this.noteLibrary = noteLibrary;
  }
  

openModalListener() {
  const createNoteButton = document.getElementById('createNoteButton');
  const modal = document.getElementById('createNoteModal');

    createNoteButton.addEventListener('click', () => {
      modal.setAttribute('open', 'open');
    });
  }

   
closeModalListener() {
  const closeModal = document.getElementById('closeModal');
  const modal = document.getElementById('createNoteModal');

    closeModal.addEventListener('click', () => {
      modal.removeAttribute('open');
    });
  }

 submitListener() {
    const noteForm = document.getElementById('noteForm');
    noteForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const note = this.getNoteDetailsFromModal();
      this.noteLibrary.addNoteToList(note);

      document.getElementById('createNoteModal').removeAttribute('open');
    });
  }


  getNoteDetailsFromModal() {
    const title = document.getElementById('noteTitle').value;
    const content = document.getElementById('noteContent').value;
    const tags = document.getElementById('noteTags').value.split(',').map(tag => tag.trim());
    const color = document.getElementById('noteColor').value;
    const pinned = document.getElementById('notePinned').checked;

    return createNoteObject(title, content, tags, color, pinned);
  }

  sortListener() {
    const sortOrderDropdown = document.getElementById('sort-order');
    sortOrderDropdown.addEventListener('change', () => {
      const selectedOrder = sortOrderDropdown.value;
      this.noteLibrary.sortNotes(selectedOrder);
      this.noteLibrary.updateListsInterface();
    });
  }

  deleteAllListener() {
    const deleteAllButton = document.getElementById('delete-all-button');
    deleteAllButton.addEventListener('click', () => {
      this.noteLibrary = [];
      localStorage.removeItem('notes');
      document.getElementById('pinned-notes').innerHTML = '';
      document.getElementById('notes').innerHTML = '';
    });
  }

  addKeyBoardEvents() {
    document.addEventListener('keydown', (event) => {
        if (!this.noteLibrary.selectedNote) {
            return; 
        }

        switch (event.key) {
            case 'P':
            case 'p':
                this.noteLibrary.pinNote(this.noteLibrary.selectedNote.dataset.noteId);
                break;
            case 'Delete':
                this.noteLibrary.deleteNote(this.noteLibrary.selectedNote.dataset.noteId);
                break;
            default:
                break;
        }
    });
  }

  manageModal() {
    this.openModalListener();
    this.closeModalListener();
    this.submitListener();
  }



  listenToAllEvents() {
    this.manageModal();
    this.addKeyBoardEvents();
    this.deleteAllListener();
    this.sortListener();
}

}