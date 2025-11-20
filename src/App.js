import React, { useState } from 'react';
import './App.css';

function App() {
  const [alunos, setAlunos] = useState([]);
  const [nome, setNome] = useState('');
  const [nota, setNota] = useState('');
  const [editandoId, setEditandoId] = useState(null);


//cadastrando novo aluno
  const adicionarNovoAluno = () => {
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

//editando aluno
  const editarAluno = (id) => {
    const aluno = alunos.find(a => a.id === id);
    setNome(aluno.nome);
    setNota(aluno.nota.toString());
    setEditandoId(id);
  };

  //atualizando o aluno
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

  //excluindo o aluno
  const excluirAluno = (id) => {
    setAlunos(alunos.filter(aluno => aluno.id !== id));
  };

  
  return (
    <div className="app">
      <h1>Notas</h1>
      
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
          placeholder="Informe a nota de 0 a 10"
          value={nota}
          onChange={(e) => setNota(e.target.value)}
          min="0"
          max="10"
          step="0.1"
        />
        
        {editandoId ? (
          <button onClick={atualizarAluno}>Atualizar</button>
        ) : (
          <button onClick={adicionarNovoAluno}>Adicionar</button>
        )}
      </div>

      <div className="lista">
        {alunos.map(aluno => (
          <div key={aluno.id} className="card-alu">
            <div className="info-alu">
              <h3>{aluno.nome}</h3>
              <p>Nota: {aluno.nota}</p>
              <p className={aluno.nota >= 5 ? 'O aluno foi aprovado' : 'O aluno foi reprovado'}>
                {aluno.nota >= 5 ? 'O aluno foi Aprovado' : 'O aluno foi Reprovado'}
              </p>
            </div>
            <div className="acao">
              <button onClick={() => editarAluno(aluno.id)}>Editar</button>
              <button onClick={() => excluirAluno(aluno.id)}>Excluir</button>
            </div>
          </div>
        ))}
      </div>

      
    </div>
  );
}

export default App;