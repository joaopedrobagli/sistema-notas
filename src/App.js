import React, { useState } from 'react';
import './App.css';

function App() {
  const [alunos, setAlunos] = useState([]);
  const [nome, setNome] = useState('');
  const [nota, setNota] = useState('');
  const [editandoId, setEditandoId] = useState(null);


  const adicionarAluno = () => {
    if (nome && nota) {
      const novoAluno = {
        id: Date.now(),
        nome: nome,
        nota: parseFloat(nota)
      };
      setAlunos([...alunos, novoAluno]);
      setNome('');
      setNota('');
    }
  };


  const editarAluno = (id) => {
    const aluno = alunos.find(a => a.id === id);
    setNome(aluno.nome);
    setNota(aluno.nota.toString());
    setEditandoId(id);
  };

  const atualizarAluno = () => {
    if (nome && nota) {
      setAlunos(alunos.map(aluno => 
        aluno.id === editandoId 
          ? { ...aluno, nome: nome, nota: parseFloat(nota) }
          : aluno
      ));
      setNome('');
      setNota('');
      setEditandoId(null);
    }
  };

  
  const excluirAluno = (id) => {
    setAlunos(alunos.filter(aluno => aluno.id !== id));
  };

  return (
    <div className="app">
      <h1>CRUD de Notas</h1>
      
      <div className="formulario">
        <h3>Nome do aluno</h3>
        <input
          type="text"
          placeholder="Informe o nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        
        <h3>Informe a nota do aluno</h3>
        <input
          type="number"
          placeholder="0-10"
          value={nota}
          onChange={(e) => setNota(e.target.value)}
          min="0"
          max="10"
          step="0.1"
        />
        
        {editandoId ? (
          <button onClick={atualizarAluno}>Atualizar</button>
        ) : (
          <button onClick={adicionarAluno}>Adicionar</button>
        )}
      </div>

      <div className="lista-alunos">
        {alunos.map(aluno => (
          <div key={aluno.id} className="aluno-card">
            <div className="info-aluno">
              <h3>{aluno.nome}</h3>
              <p>Nota: {aluno.nota}</p>
              <p className={aluno.nota >= 6 ? 'aprovado' : 'reprovado'}>
                {aluno.nota >= 6 ? 'O aluno foi Aprovado' : 'O aluno foi Reprovado'}
              </p>
            </div>
            <div className="acoes">
              <button onClick={() => editarAluno(aluno.id)}>Editar</button>
              <button onClick={() => excluirAluno(aluno.id)}>Excluir</button>
            </div>
          </div>
        ))}
      </div>

      {alunos.length === 0 && <p className="vazio">Nenhum aluno cadastrado</p>}
    </div>
  );
}

export default App;