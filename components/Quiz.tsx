import React from 'react';

const QuestionCard = ({ question }: { question: string }) => (
  <div className="card w-auto h-28 my-5 mx-5">
    <h1 className="font-mono font-semibold text-blue-500 text-4xl">{question}</h1>
  </div>
);

const AnswerCard = () => <div className="card w-auto h-[30rem] mx-5"></div>;

export default () => {
  const quiz = ['Qual o bairro de Araçatuba que mais combina com você 🤔?',
    {
      questionTitle: 'Em qual loja você compra roupas no calcadão 👚 ?',
      alternatives: [
        { text: 'Mega Moda', tendency: 1 },
        { text: '40º Graus', tendency: 2 },
        { text: 'Riachuelo', tendency: 3 },
        { text: 'Damyller', tendency: 4 }
      ]
    },
    {
      questionTitle: 'Em qual destes lugares você escolheria jantar 🥣 ?',
      alternatives: [
        { text: 'Jerônimo', tendency: 4 },
        { text: 'Pontinho Doce', tendency: 1, tendencyAlt: 2 },
        { text: 'Burger King', tendency: 2, tendencyAlt: 3 },
        { text: 'Villa Grill', tendency: 4 }
      ]
    },
    {
      questionTitle: 'Em qual supermercado você faz compras ?',
      alternatives: [
        { text: 'Rondon', tendency: 1, tendencyAlt: 2 },
        { text: 'Amigão', tendency: 2 },
        { text: 'Pão de Açúcar', tendency: 4 },
        { text: 'Muffato', tendency: 2, tendencyAlt: 3 }
      ]
    },
    {
      questionTitle: 'Em qual escola você estuda/estudou 📋 ?',
      alternatives: [
        { text: 'SEB COC', tendency: 4 },
        { text: 'Ary Bocuhy', tendency: 1 },
        { text: 'I.E', tendency: 2 },
        { text: 'Salesiano', tendency: 3 }
      ]
    }
  ];
  function 
  return (
    <div className="bg-slate-200 flex flex-col h-screen">
      <QuestionCard question={''} />
      <AnswerCard />
    </div>
  );
};
