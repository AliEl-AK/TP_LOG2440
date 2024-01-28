import NoteEditor from '../src/assets/js/noteEditor.js';
import { jest } from "@jest/globals";

describe('NoteEditor Tests', () => {
  let noteEditor, mockStorageManager;

  function buildHTML() {
    const noteContent = document.createElement('div');
    noteContent.id = 'note-content';
    document.body.appendChild(noteContent);
  }

  beforeEach(() => {
    buildHTML();
    mockStorageManager = {
      getNoteById: jest.fn(),
      pinById: jest.fn(),
      deleteNoteById: jest.fn()
    };
    noteEditor = new NoteEditor(mockStorageManager);
  });

  afterEach(() => {
    document.body.innerHTML = '';
    jest.resetAllMocks();
  });

  describe('getNoteIdFromURL', () => {
    it('should return null when URL has no "id" parameter', () => {
        Object.defineProperty(window, 'location', {
            writable: true,
            value: { search: '' },
        });
        expect(noteEditor.getNoteIdFromURL()).toBeNull();
    });

    it('should return the "id" parameter from URL', () => {
        const testID = 'testNoteId';
        Object.defineProperty(window, 'location', {
            writable: true,
            value: { search: `?id=${testID}` },
        });
        expect(noteEditor.getNoteIdFromURL()).toBe(testID);
    });
});

  // TODO : Tester le reste de la classe
  describe('displayNoteDetails', () => {
    it('should display note details if valid note is found', () => {
        const mockNote = {
            title: 'Test',
            lastEdit: new Date(),
            tags: [],
            color: '#FFFFFF',
            pinned: false,
            content: 'Test content',
        };

        noteEditor.storageManager = {
            getNoteById: jest.fn().mockReturnValue(mockNote),
        };

        noteEditor.displayNoteDetails();

        const noteContent = document.getElementById('note-content');
        expect(noteContent).toBeDefined();
    });

    
});
describe('pin', () => {
  it('should toggle pin status of the note', () => {
      const mockNote = { pinned: false };
      noteEditor.storageManager = {
          pinById: jest.fn(),
          getNoteById: jest.fn().mockReturnValue(mockNote),
      };
      document.body.innerHTML = '<div id="note-content"><p id="pinned"></p></div>';

      noteEditor.pin();

      expect(noteEditor.storageManager.pinById).toHaveBeenCalledTimes(1);
  });
});

describe('delete', () => {
  it('should delete the note if user confirms', () => {
    window.confirm = jest.fn(() => true);
    const noteId = "testNoteId";
    noteEditor.delete();
    expect(mockStorageManager.deleteNoteById).toHaveBeenCalledWith(noteId);
  });

  it('should not delete the note if user denies', () => {
    window.confirm = jest.fn(() => false);
    noteEditor.delete();
    expect(mockStorageManager.deleteNoteById).not.toHaveBeenCalled();
  });
});
});