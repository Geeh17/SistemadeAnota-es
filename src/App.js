import React, { useEffect, useMemo, useState } from 'react';
import Header from './components/Header';
import NoteForm from './components/NoteForm';
import Toolbar from './components/Toolbar';
import NoteList from './components/NoteList';
import { useNotes } from './hooks/useNotes';
import { requestNotificationPermission } from './utils/notifications';
import './styles/App.css';

function sortNotes(notes, criteria) {
  const sorted = [...notes];

  switch (criteria) {
    case 'titulo':
      return sorted.sort((a, b) => a.title.localeCompare(b.title, 'pt-BR'));
    case 'categoria':
      return sorted.sort((a, b) => a.category.localeCompare(b.category, 'pt-BR'));
    case 'data':
    default:
      return sorted.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  }
}

function App() {
  const { notes, addNote, updateNote, deleteNote, replaceAll } = useNotes();
  const [sortCriteria, setSortCriteria] = useState('data');
  const [categoryFilter, setCategoryFilter] = useState('todas');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  const visibleNotes = useMemo(() => {
    let result = notes;

    if (categoryFilter !== 'todas') {
      result = result.filter((note) => note.category === categoryFilter);
    }

    if (searchTerm.trim() !== '') {
      const term = searchTerm.trim().toLowerCase();
      result = result.filter(
        (note) =>
          note.title.toLowerCase().includes(term) || note.content.toLowerCase().includes(term)
      );
    }

    return sortNotes(result, sortCriteria);
  }, [notes, categoryFilter, searchTerm, sortCriteria]);

  return (
    <div className="page">
      <div className="notebook">
        <div className="notebook__rail" aria-hidden="true">
          {Array.from({ length: 12 }).map((_, index) => (
            <span key={index} className="notebook__hole" />
          ))}
        </div>

        <div className="notebook__content">
          <Header noteCount={notes.length} />
          <NoteForm onAdd={addNote} />
          <Toolbar
            sortCriteria={sortCriteria}
            onSortChange={setSortCriteria}
            categoryFilter={categoryFilter}
            onCategoryFilterChange={setCategoryFilter}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            notes={notes}
            onImport={replaceAll}
          />
          <NoteList notes={visibleNotes} onUpdate={updateNote} onDelete={deleteNote} />
        </div>
      </div>
    </div>
  );
}

export default App;
