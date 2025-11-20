import React, { useState } from 'react';

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

  const calcularMedia = () => {
    if (alunos.length === 0) return 0;
    const soma = alunos.reduce((total, aluno) => total + aluno.nota, 0);
    return (soma / alunos.length).toFixed(1);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>Sistema de Notas</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Nome do aluno"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          style={{ width: '100%', padding: '8px', margin: '5px 0' }}
        />
        <input
          type="number"
          placeholder="Nota (0-10)"
          value={nota}
          onChange={(e) => setNota(e.target.value)}
          min="0"
          max="10"
          step="0.1"
          style={{ width: '100%', padding: '8px', margin: '5px 0' }}
        />
        
        {editandoId ? (
          <button onClick={atualizarAluno} style={{ padding: '10px', margin: '5px' }}>
            Atualizar
          </button>
        ) : (
          <button onClick={adicionarAluno} style={{ padding: '10px', margin: '5px' }}>
            Adicionar Aluno
          </button>
        )}
      </div>

      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        <h3>Média da Turma: {calcularMedia()}</h3>
      </div>

      <div>
        {alunos.map(aluno => (
          <div key={aluno.id} style={{ 
            border: '1px solid #ddd', 
            padding: '15px', 
            margin: '10px 0',
            borderRadius: '5px'
          }}>
            <div>
              <h3 style={{ margin: '0 0 10px 0' }}>{aluno.nome}</h3>
              <p>Nota: <strong>{aluno.nota}</strong></p>
              <p style={{ 
                color: aluno.nota >= 6 ? 'green' : 'red',
                fontWeight: 'bold'
              }}>
                {aluno.nota >= 6 ? 'Aprovado' : 'Reprovado'}
              </p>
            </div>
            <div>
              <button 
                onClick={() => editarAluno(aluno.id)}
                style={{ margin: '5px', padding: '5px 10px' }}
              >
                Editar
              </button>
              <button 
                onClick={() => excluirAluno(aluno.id)}
                style={{ margin: '5px', padding: '5px 10px' }}
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>

      {alunos.length === 0 && (
        <p style={{ textAlign: 'center', color: '#666' }}>
          Nenhum aluno cadastrado
        </p>
      )}
    </div>
  );
}

export default App;
