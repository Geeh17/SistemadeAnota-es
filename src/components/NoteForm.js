import React, { useState } from 'react';
import { CATEGORIES } from '../utils/categories';

function NoteForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0].id);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (content.trim() === '') return;

    onAdd({ title, content, category });
    setTitle('');
    setContent('');
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <div className="note-form__row">
        <label className="field">
          <span className="field__label">Título (opcional)</span>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Ex.: Reunião com o time"
            maxLength={80}
          />
        </label>

        <label className="field field--category">
          <span className="field__label">Categoria</span>
          <select value={category} onChange={(event) => setCategory(event.target.value)}>
            {CATEGORIES.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="field">
        <span className="field__label">Anotação</span>
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Escreva sua anotação aqui..."
          rows={3}
          required
        />
      </label>

      <div className="note-form__actions">
        <button type="submit" className="btn btn-primary">
          Adicionar anotação
        </button>
      </div>
    </form>
  );
}

export default NoteForm;
