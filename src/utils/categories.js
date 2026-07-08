export const CATEGORIES = [
  { id: 'pessoal', label: 'Pessoal', color: '#7C6FE0' },
  { id: 'trabalho', label: 'Trabalho', color: '#3B82C4' },
  { id: 'ideia', label: 'Ideia', color: '#E8A33D' },
  { id: 'lembrete', label: 'Lembrete', color: '#D65A4A' },
  { id: 'outro', label: 'Outro', color: '#6B8068' },
];

export function getCategory(id) {
  return CATEGORIES.find((category) => category.id === id) || CATEGORIES[CATEGORIES.length - 1];
}
