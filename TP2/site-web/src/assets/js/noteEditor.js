import StorageManager from './storageManager.js';

/**
 * @typedef {import('./utils.js').Note} Note
 */

export default class NoteEditor {

  constructor(storageManager) {
    this.storageManager = storageManager;
  }


  getNoteIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
  }


  displayNoteDetails() {
    const noteId = this.getNoteIdFromURL();
    const note = this.storageManager.getNoteById(noteId);

    const noteContent = document.getElementById('note-content');

    if (note !== undefined) {
      const title = document.createElement('h2');
      title.innerText = note.title;
      noteContent.appendChild(title);

      const modifDate = document.createElement('p');
      modifDate.innerText = "Date de la dernière modification : " + new Date(note.lastEdit).toLocaleDateString();
      noteContent.appendChild(modifDate);

      const tags = document.createElement('p');

      const tagsTitle = document.createElement('span');
      tagsTitle.innerText = "Tags: ";

      const tagsList = document.createElement('span');
      tagsList.id = "tags";

      let contentOfTags = "";
      for (let i = 0; i < note.tags.length; i++) {
        contentOfTags += note.tags[i];
        if (i !== note.tags.length - 1) {
          contentOfTags += ", "
        }
      }
      tagsList.innerText = contentOfTags;
      tagsList.contentEditable = "true";

      tags.appendChild(tagsTitle);
      tags.appendChild(tagsList);
      noteContent.appendChild(tags);

      const colorBlock = document.createElement('div');
      colorBlock.style.display = "inline-block";

      const color = document.createElement('p');
      color.innerText = "Couleur : "
      color.style.display = "inline-block";
      colorBlock.appendChild(color);

      const colorText = document.createElement('label');
      colorText.htmlFor = "color-selector"
      colorText.innerText = note.color;
      colorText.style.display = "inline-block";
      colorText.style.marginLeft = "5pt";
      colorText.style.fontSize = "14pt";
      colorText.style.backgroundColor = note.color;
      colorText.style.cursor = "pointer";

      const colorSelector = document.createElement('input');
      colorSelector.id = "color-selector";
      colorSelector.type = "color";
      colorSelector.defaultValue = note.color;
      colorSelector.style.display = "none";

      colorText.addEventListener('click', () => {
        colorSelector.style.display = "inline-block";
      })

      colorSelector.addEventListener('input', () => {
        colorText.style.backgroundColor = colorSelector.value;
        colorText.innerText = colorSelector.value;
        colorSelector.style.display = "none";
      })

      colorBlock.appendChild(colorText);
      colorBlock.appendChild(colorSelector);

      noteContent.appendChild(colorBlock);

      const pinned = document.createElement('p');
      pinned.innerText = "Épinglée : " + (note.pinned ? "Oui" : "Non");
      pinned.id = 'pinned';
      noteContent.appendChild(pinned);

      const content = document.createElement('p');
      content.innerText = "Contenu : \n"
      noteContent.appendChild(content);

      const textContent = document.createElement('textarea');
      textContent.id = "new-content";
      textContent.defaultValue = note.content;
      textContent.style.fontSize = "13pt";
      noteContent.appendChild(textContent);
    } else {
      const didNotFindNote = document.createElement('h2');
      didNotFindNote.innerText = "La note demandée n'existe pas."
      noteContent.appendChild(didNotFindNote);
    }
  }


  pin() {
    const noteId = this.getNoteIdFromURL();
    this.storageManager.pinById(noteId);
    const pinnedHTML = document.getElementById('pinned');
    pinnedHTML.innerText = 'Épinglée : ' + (this.storageManager.getNoteById(noteId).pinned ? 'Oui' : 'Non');
  }


  delete() {
    const isConfirmed = confirm('Are you sure you want to delete this note?');
    if (isConfirmed) {
      this.storageManager.deleteNoteById(this.getNoteIdFromURL());
      window.location.href = 'index.html';
    }
  }
}


function saveChangesByIdListener(noteEditor, storageManager) {
  const saveButton = document.getElementById('save-button');

  const noteId = noteEditor.getNoteIdFromURL();

  saveButton.addEventListener('click', () => {
    const color = document.getElementById('color-selector');
    const content = document.getElementById('new-content');
    const tags = document.getElementById('tags');

    let newTags = tags.innerText.split(',');
    for (let i = 0; i < newTags.length; i++) {
      newTags[i] = newTags[i].toString().trim();
    }
    newTags = newTags.filter((Tag) => {
      return Tag !== '';
    });

    if (color.value !== storageManager.getNoteById(noteId).color ||
        content.value !== storageManager.getNoteById(noteId).content ||
        newTags !== storageManager.getNoteById(noteId).tags) {
      storageManager.modifyNoteById(noteId, content.value, newTags)
      const notes = storageManager.getNotes();
      const note = notes.find((note) => {
        return note.id === noteId;
      });
      note.color = color.value;

      storageManager.setNotes(notes);
    } else {
      storageManager.setNotes(storageManager.getNotes());
    }
  })
}

function addKeyBoardEvents(noteEditor) {
  document.addEventListener('keydown', (event) => {
    if (
      document.activeElement.tagName !== 'INPUT' &&
      document.activeElement.tagName !== 'TEXTAREA'
    ) {
      const key = event.key;
      if (key === 'p') {
        noteEditor.pin();
      } else if (key === 'Delete') {
        noteEditor.delete();
      }
    }
  });
}

window.onload = () => {
  const storageManager = new StorageManager();
  const noteEditor = new NoteEditor(storageManager);

  noteEditor.displayNoteDetails();

  saveChangesByIdListener(noteEditor, storageManager);
  addKeyBoardEvents(noteEditor);
}