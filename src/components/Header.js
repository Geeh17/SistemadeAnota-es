import React from 'react';

function Header({ noteCount }) {
  return (
    <header className="header">
      <p className="header__eyebrow">Caderno digital</p>
      <h1 className="header__title">Sistema de Anotações</h1>
      <p className="header__subtitle">
        {noteCount === 0
          ? 'Nenhuma anotação ainda — comece escrevendo a primeira abaixo.'
          : `${noteCount} ${noteCount === 1 ? 'anotação guardada' : 'anotações guardadas'}`}
      </p>
    </header>
  );
}

export default Header;
