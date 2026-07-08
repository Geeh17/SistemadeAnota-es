import React from 'react';
import NoteCard from './NoteCard';

function NoteList({ notes, onUpdate, onDelete }) {
  if (notes.length === 0) {
    return (
      <div className="empty-state">
        <p>Nenhuma anotação encontrada com os filtros atuais.</p>
      </div>
    );
  }

  return (
    <ul className="note-list">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </ul>
  );
}

export default NoteList;
