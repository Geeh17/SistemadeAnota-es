import React, { useState } from 'react';
import ConfirmDialog from './ConfirmDialog';
import { getCategory } from '../utils/categories';

function formatDate(isoString) {
  return new Date(isoString).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function NoteCard({ note, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(note.title);
  const [draftContent, setDraftContent] = useState(note.content);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const category = getCategory(note.category);

  const startEditing = () => {
    setDraftTitle(note.title);
    setDraftContent(note.content);
    setIsEditing(true);
  };

  const saveEdit = () => {
    if (draftContent.trim() === '') return;
    onUpdate(note.id, { title: draftTitle.trim(), content: draftContent.trim() });
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <li className="note-card" style={{ '--category-color': category.color }}>
      <span className="note-card__tab" aria-hidden="true" />

      <div className="note-card__body">
        {isEditing ? (
          <>
            <input
              type="text"
              className="note-card__edit-title"
              value={draftTitle}
              onChange={(event) => setDraftTitle(event.target.value)}
              placeholder="Título (opcional)"
            />
            <textarea
              className="note-card__edit-content"
              value={draftContent}
              onChange={(event) => setDraftContent(event.target.value)}
              rows={3}
            />
          </>
        ) : (
          <>
            <div className="note-card__meta">
              <span className="note-card__category">{category.label}</span>
              <span className="note-card__date">
                {note.updatedAt !== note.createdAt
                  ? `Editado em ${formatDate(note.updatedAt)}`
                  : `Criado em ${formatDate(note.createdAt)}`}
              </span>
            </div>
            {note.title && <h3 className="note-card__title">{note.title}</h3>}
            <p className="note-card__content">{note.content}</p>
          </>
        )}

        <div className="note-card__actions">
          {isEditing ? (
            <>
              <button type="button" className="btn btn-ghost" onClick={cancelEdit}>
                Cancelar
              </button>
              <button type="button" className="btn btn-primary" onClick={saveEdit}>
                Salvar
              </button>
            </>
          ) : (
            <>
              <button type="button" className="btn btn-ghost" onClick={startEditing}>
                Editar
              </button>
              <button type="button" className="btn btn-danger" onClick={() => setConfirmOpen(true)}>
                Excluir
              </button>
            </>
          )}
        </div>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        title="Excluir anotação"
        message="Tem certeza de que deseja excluir esta anotação? Essa ação não pode ser desfeita."
        confirmLabel="Excluir"
        onConfirm={() => {
          setConfirmOpen(false);
          onDelete(note.id);
        }}
        onCancel={() => setConfirmOpen(false)}
      />
    </li>
  );
}

export default NoteCard;
