import { useEffect, useState } from 'react';
import { generateId } from '../utils/id';
import { loadNotes, saveNotes } from '../utils/storage';
import { notify } from '../utils/notifications';

export function useNotes() {
  const [notes, setNotes] = useState(() => loadNotes());

  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  const addNote = ({ title, content, category }) => {
    const now = new Date().toISOString();
    const note = {
      id: generateId(),
      title: title.trim(),
      content: content.trim(),
      category,
      createdAt: now,
      updatedAt: now,
    };

    setNotes((previousNotes) => [note, ...previousNotes]);

    if (category === 'lembrete') {
      notify('Lembrete criado', note.title || note.content);
    }

    return note;
  };

  const updateNote = (id, changes) => {
    setNotes((previousNotes) =>
      previousNotes.map((note) =>
        note.id === id ? { ...note, ...changes, updatedAt: new Date().toISOString() } : note
      )
    );
  };

  const deleteNote = (id) => {
    setNotes((previousNotes) => previousNotes.filter((note) => note.id !== id));
  };

  const replaceAll = (newNotes) => {
    setNotes(newNotes);
  };

  return { notes, addNote, updateNote, deleteNote, replaceAll };
}
