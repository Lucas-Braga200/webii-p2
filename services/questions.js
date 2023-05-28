const { v4: uuidv4 } = require('uuid');

const questions = [
  {
    id: uuidv4(),
    question: 'O que é programação paralela?',
    alternatives: [
      { id: uuidv4(), text: 'É uma técnica que permite a execução simultânea de várias tarefas em um único processador.', correct: false },
      { id: uuidv4(), text: 'É uma técnica que divide um programa em partes menores que podem ser executadas em paralelo em vários processadores.', correct: true },
      { id: uuidv4(), text: 'É uma técnica que permite a execução de um programa em vários computadores diferentes.', correct: false },
      { id: uuidv4(), text: 'É uma técnica que torna um programa mais rápido sem a necessidade de usar vários processadores.', correct: false }
    ]
  },
  {
    id: uuidv4(),
    question: 'Qual é a vantagem da programação paralela?',
    alternatives: [
      { id: uuidv4(), text: 'Melhorar a eficiência e o desempenho de um programa ao executar tarefas simultaneamente.', correct: true },
      { id: uuidv4(), text: 'Simplificar a lógica do programa ao evitar a necessidade de programação sequencial.', correct: false },
      { id: uuidv4(), text: 'Reduzir o tempo de compilação e execução do programa.', correct: false },
      { id: uuidv4(), text: 'Permitir a execução de um programa em qualquer tipo de hardware, independentemente do número de processadores.', correct: false }
    ]
  },
  {
    id: uuidv4(),
    question: 'Quais são os principais modelos de programação paralela?',
    alternatives: [
      { id: uuidv4(), text: 'Memória Compartilhada e Mensagens', correct: true },
      { id: uuidv4(), text: 'Memória Compartilhada e Computação em Nuvem', correct: false },
      { id: uuidv4(), text: 'Memória Distribuída e Programação Funcional', correct: false },
      { id: uuidv4(), text: 'Memória Distribuída e Computação em Nuvem', correct: false }
    ]
  },
  {
    id: uuidv4(),
    question: 'O que é um deadlock em programação paralela?',
    alternatives: [
      { id: uuidv4(), text: 'Uma situação em que dois ou mais processos ficam bloqueados, aguardando recursos que nunca serão liberados.', correct: true },
      { id: uuidv4(), text: 'Uma falha crítica que ocorre quando um programa paralelo entra em um loop infinito.', correct: false },
      { id: uuidv4(), text: 'Um mecanismo utilizado para garantir a sincronização correta entre threads.', correct: false },
      { id: uuidv4(), text: 'Uma técnica para melhorar o desempenho de um programa paralelo.', correct: false }
    ]
  },
  {
    id: uuidv4(),
    question: 'Quais são as principais abordagens de escalonamento em programação paralela?',
    alternatives: [
      { id: uuidv4(), text: 'Escalonamento Estático e Escalonamento Dinâmico', correct: true },
      { id: uuidv4(), text: 'Escalonamento Preemptivo e Escalonamento Cooperativo', correct: false },
      { id: uuidv4(), text: 'Escalonamento Baseado em Prioridades e Escalonamento Circular', correct: false },
      { id: uuidv4(), text: 'Escalonamento FIFO e Escalonamento LIFO', correct: false }
    ]
  },
  {
    id: uuidv4(),
    question: 'O que é um programa paralelo?',
    alternatives: [
      { id: uuidv4(), text: 'Um programa que executa tarefas sequencialmente em um único processador.', correct: false },
      { id: uuidv4(), text: 'Um programa que divide suas tarefas em partes menores que podem ser executadas em paralelo.', correct: true },
      { id: uuidv4(), text: 'Um programa que executa várias instâncias simultâneas em diferentes processadores.', correct: false },
      { id: uuidv4(), text: 'Um programa que utiliza memória compartilhada para melhorar o desempenho.', correct: false }
    ]
  },
];

const listQuestions = () => {
  return questions;
};

const getQuestion = (id) => {
  return questions.find(question => question.id == id);
};

module.exports = { listQuestions, getQuestion };
