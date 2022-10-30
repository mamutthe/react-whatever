import React, { useState } from 'react';

type quizHeaderTYPE = {
  quizTitle: string,
  quizTendency: {
    [key:number]: string
  }
}

type alternativeTYPE = {
  text: string, 
  tendency: number,
  tendencyAlt?: number
}

type quizQuestionsTYPE = {
  questionTitle: string,
  alternatives:alternativeTYPE[]  
}

type quizTYPE = {
  quizHeader: quizHeaderTYPE 
  quizQuestions: quizQuestionsTYPE[]
}

const QuestionCard = ({ questionTitle }: { questionTitle: string }) => (
  <div className="card w-auto h-28 my-5 md:mx-48 mx-5">
    <h1 className="font-mono font-semibold text-blue-500 md:text-3xl text-xl text-center">
      {questionTitle}
    </h1>
  </div>
);

const AnswersCard = ({ alternatives }) => {
  return (
    <div className="card w-auto h-[30rem] md:mx-48 mx-5">
      <div className="grid grid-rows-4 grid-flow-col gap-x-4 gap-y-6 w-full px-12">
        {alternatives}
      </div>
    </div>
  );
};

export default () => {
  const quiz:quizTYPE = {
    quizHeader: {
      quizTitle: 'Qual bairro de araçatuba mais combina com você 🤔 ?',
      quizTendency: {
        //Number of personality types is equal to the length of this object
        1: 'Água Branca',
        2: 'Alvorada',
        3: 'Concórdia',
        4: 'Nova York'
      }
    },
    quizQuestions: [
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
          { text: 'Villa Grill', tendency: 2, tendencyAlt: 3 }
        ]
      },
      {
        questionTitle: 'Em qual supermercado você faz compras 🍅 ?',
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
          { text: 'I.E.', tendency: 2 },
          { text: 'Salesiano', tendency: 3 }
        ]
      }
    ]
  };

  const [quizQuestionNumber, setQuizQuestionNumber] = useState<undefined | number>(undefined);
  const [currentTendency, setCurrentTendency] = useState(0);


  function handleQuiz(quizQuestionNumber: number | undefined) {
    console.log(quizQuestionNumber);
    setQuizQuestionNumber((value)=> {
      if (value === undefined) {
        return 0;
      }
      return value + 1;
    });
  }

  function buffer(alternative: alternativeTYPE) {
    const tendencyValue = alternative.tendency;
    if (alternative.tendencyAlt !== undefined) {
      const tendencyAltValue = alternative.tendencyAlt;
    }
  }

  return (
    <div className="bg-slate-200 flex flex-col h-screen">
          <QuestionCard questionTitle={quiz.quizQuestions[quizQuestionNumber as number]?.questionTitle} />
          <AnswersCard
            alternatives={quiz.quizQuestions[quizQuestionNumber as number]?.alternatives.map((alternative) => {
              return (
                <div
                  key={alternative.text}
                  onClick={() => {buffer(alternative)}}
                  className="alternative-card flex-center">
                  <p className="alternative-text">{alternative.text}</p>
                </div>
              );
            })}
          />
      <button onClick={() => handleQuiz(quizQuestionNumber)}>click me</button>
    </div>
  );
};
