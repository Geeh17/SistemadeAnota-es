import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      currentNote: '',
      sortCriteria: 'data',
    };
  }

  componentDidMount() {
    // Pedir permissão para enviar notificações quando o aplicativo é carregado
    this.requestNotificationPermission();
  }

  handleNoteChange = (event) => {
    this.setState({ currentNote: event.target.value });
  }

  addNote = () => {
    if (this.state.currentNote.trim() !== '') {
      const currentDate = new Date();
      const noteWithTimestamp = `${this.state.currentNote} (Criado em: ${currentDate.toLocaleString()})`;
      this.setState((prevState) => ({
        notes: [...prevState.notes, noteWithTimestamp],
        currentNote: '',
      }));

      // Verifique se a anotação contém um lembrete e envie uma notificação
      if (noteWithTimestamp.toLowerCase().includes('lembrete')) {
        this.sendNotification('Lembrete: ' + this.state.currentNote);
      }
    }
  }

  requestNotificationPermission() {
    if ('Notification' in window) {
      Notification.requestPermission()
        .then((permission) => {
          if (permission === 'granted') {
            console.log('Permissão para notificações concedida.');
          }
        });
    }
  }

  sendNotification(message) {
    if ('Notification' in window && Notification.permission === 'granted') {
      const notification = new Notification('Anotação Importante', {
        body: message,
      });

      // Você pode adicionar um evento para lidar com o clique na notificação
      notification.onclick = () => {
        console.log('O usuário clicou na notificação.');
      };
    }
  }

  editNote = (index) => {
    const updatedNotes = [...this.state.notes];
    const editedNote = updatedNotes[index];
    const editedText = prompt('Editar anotação:', editedNote.split('(')[0].trim());

    if (editedText !== null) {
      updatedNotes[index] = `${editedText} (Editado em: ${new Date().toLocaleString()})`;
      this.setState({
        notes: updatedNotes,
      });
    }
  }

  deleteNote = (index) => {
    if (window.confirm('Tem certeza de que deseja excluir esta anotação?')) {
      const updatedNotes = [...this.state.notes];
      updatedNotes.splice(index, 1);

      this.setState({
        notes: updatedNotes,
      });
    }
  }

  handleSortChange = (event) => {
    this.setState({ sortCriteria: event.target.value });
  }

  exportNotes = () => {
    const { notes } = this.state;
    const notesToExport = JSON.stringify(notes);

    const blob = new Blob([notesToExport], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'notes.json';
    a.click();

    URL.revokeObjectURL(url);
  }

  importNotes = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const importedNotes = JSON.parse(e.target.result);

        this.setState({ notes: importedNotes });
      };

      reader.readAsText(file);
    }
  }

  render() {
    const containerStyle = {
      backgroundImage: `url('/meu-projeto/src/img/Fundo.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      // Aqui você pode adicionar mais estilos se necessário
    };

    const sortedNotes = [...this.state.notes].sort((a, b) => {
      if (this.state.sortCriteria === 'data') {
        return a.substring(a.lastIndexOf('(')) > b.substring(b.lastIndexOf('(')) ? -1 : 1;
      } else if (this.state.sortCriteria === 'categoria') {
        return a.substring(a.indexOf('(') + 1, a.indexOf(')')).localeCompare(b.substring(b.indexOf('(') + 1, b.indexOf(')')));
      } else {
        return a.split('(')[0].trim().localeCompare(b.split('(')[0].trim());
      }
    });

    return (
      <div className="app-container" style={containerStyle}>
        <h1>Sistema de Anotações</h1>
        <label>
          Ordenar por:
          <select value={this.state.sortCriteria} onChange={this.handleSortChange}>
            <option value="data">Data</option>
            <option value="categoria">Categoria</option>
            <option value="titulo">Título</option>
          </select>
        </label>
        <input
          type="text"
          value={this.state.currentNote}
          onChange={this.handleNoteChange}
          placeholder="Digite sua anotação"
        />
        <button onClick={this.addNote}>Adicionar</button>
        <button onClick={this.exportNotes}>Exportar Notas</button>
        <input
          type="file"
          accept=".json"
          onChange={this.importNotes}
        />
        <ul>
          {sortedNotes.map((note, index) => (
            <li key={index}>
              {note}
              <button onClick={() => this.editNote(index)}>Editar</button>
              <button onClick={() => this.deleteNote(index)}>Excluir</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
