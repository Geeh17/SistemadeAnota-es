const STORAGE_KEY = 'sistema-anotacoes:notes';

export function loadNotes() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Não foi possível carregar as anotações salvas:', error);
    return [];
  }
}

export function saveNotes(notes) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch (error) {
    console.error('Não foi possível salvar as anotações:', error);
  }
}
