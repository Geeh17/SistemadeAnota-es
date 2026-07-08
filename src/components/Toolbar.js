import React, { useRef } from 'react';
import { CATEGORIES } from '../utils/categories';

function Toolbar({
  sortCriteria,
  onSortChange,
  categoryFilter,
  onCategoryFilterChange,
  searchTerm,
  onSearchChange,
  notes,
  onImport,
}) {
  const fileInputRef = useRef(null);

  const handleExport = () => {
    const payload = { version: 1, exportedAt: new Date().toISOString(), notes };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `anotacoes-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      try {
        const parsed = JSON.parse(loadEvent.target.result);
        const importedNotes = Array.isArray(parsed) ? parsed : parsed.notes;
        if (!Array.isArray(importedNotes)) throw new Error('Formato inválido');
        onImport(importedNotes);
      } catch (error) {
        window.alert(
          'Não foi possível importar o arquivo. Verifique se é um JSON exportado por este sistema.'
        );
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  return (
    <div className="toolbar">
      <label className="field">
        <span className="field__label">Buscar</span>
        <input
          type="search"
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Buscar por título ou conteúdo"
        />
      </label>

      <label className="field">
        <span className="field__label">Categoria</span>
        <select value={categoryFilter} onChange={(event) => onCategoryFilterChange(event.target.value)}>
          <option value="todas">Todas</option>
          {CATEGORIES.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label className="field">
        <span className="field__label">Ordenar por</span>
        <select value={sortCriteria} onChange={(event) => onSortChange(event.target.value)}>
          <option value="data">Atualização</option>
          <option value="categoria">Categoria</option>
          <option value="titulo">Título</option>
        </select>
      </label>

      <div className="toolbar__actions">
        <button type="button" className="btn btn-ghost" onClick={handleExport}>
          Exportar
        </button>
        <button type="button" className="btn btn-ghost" onClick={handleImportClick}>
          Importar
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/json"
          onChange={handleFileChange}
          hidden
        />
      </div>
    </div>
  );
}

export default Toolbar;
