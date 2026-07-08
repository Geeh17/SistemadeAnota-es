# 📝 Sistema de Anotações

Sistema de anotações desenvolvido com **React**, permitindo criar, editar, excluir, buscar, filtrar, ordenar, exportar e importar anotações. Ideal para organizar ideias, lembretes e tarefas com praticidade.

---

## 🚀 Tecnologias Utilizadas

- React 18 (componentes funcionais e Hooks)
- HTML5 e CSS3 (variáveis CSS, layout responsivo)
- Web Notifications API
- Persistência local com `localStorage`
- Google Fonts (IBM Plex Mono / IBM Plex Sans)

---

## 📂 Estrutura do Projeto

```
SistemadeAnotacoes/
├── public/
│   ├── index.html
│   ├── favicon.svg
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── Header.js
│   │   ├── NoteForm.js
│   │   ├── Toolbar.js
│   │   ├── NoteList.js
│   │   ├── NoteCard.js
│   │   └── ConfirmDialog.js
│   ├── hooks/
│   │   └── useNotes.js
│   ├── utils/
│   │   ├── categories.js
│   │   ├── id.js
│   │   ├── notifications.js
│   │   └── storage.js
│   ├── styles/
│   │   └── App.css
│   ├── App.js
│   ├── index.css
│   └── index.js
├── package.json
└── README.md
```

---

## 💡 Funcionalidades

- Criação de anotações com título (opcional), categoria e conteúdo
- Persistência automática no navegador (`localStorage`) — as notas continuam lá ao recarregar a página
- Edição inline e exclusão com diálogo de confirmação (sem `prompt`/`confirm` nativos do navegador)
- Busca por título ou conteúdo
- Filtro por categoria (Pessoal, Trabalho, Ideia, Lembrete, Outro)
- Ordenação por data de atualização, categoria ou título
- Exportação e importação de anotações em `.json`
- Notificação automática ao criar uma anotação da categoria "Lembrete" (mediante permissão do navegador)
- Interface responsiva, com identidade visual própria (tema "caderno")

---

## 🖥️ Como executar o projeto

1. Clone o repositório ou baixe o `.zip` do projeto
2. Instale as dependências:

```bash
npm install
```

3. Execute o projeto em modo de desenvolvimento:

```bash
npm start
```

4. Acesse `http://localhost:3000`

Para gerar a build de produção:

```bash
npm run build
```

---

## 👨‍💻 Desenvolvedor

Desenvolvido por **Geraldo Luiz**
🔗 [Portfólio](https://portfolio-geeh.netlify.app/)
