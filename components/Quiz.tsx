import React, { useState } from 'react';

type StartQuizButtonTYPE = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

type quizHeaderTYPE = {
  quizTitle: string;
  quizTendency: {
    [key: number]: string;
  };
};

type alternativeTYPE = {
  text: string;
  tendency: number;
  tendencyAlt?: number;
};

type quizQuestionsTYPE = {
  questionTitle: string;
  alternatives: alternativeTYPE[];
};

type quizTYPE = {
  quizHeader: quizHeaderTYPE;
  quizQuestions: quizQuestionsTYPE[];
};

const StartQuizCard = ({
  quizTitle,
  children
}: {
  quizTitle: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="quiz-card flex flex-col mx-16 my-16 h-full border-solid border-green-600 border-2">
      <h1 className="quiz-title md:text-3xl text-2xl">{quizTitle}</h1>
      {children}
    </div>
  );
};

const StartQuizButton: React.FC<StartQuizButtonTYPE> = ({ ...rest }) => {
  return (
    <button
      {...rest}
      className="my-20 text-white bg-green-600 hover:bg-green-700 font-medium rounded-lg text-sm px-32 py-6 mr-2 mb-2">
      Começar Quiz
    </button>
  );
};

const QuestionCard = ({ questionTitle }: { questionTitle: string }) => (
  <div className="quiz-card w-auto h-28 my-5 md:mx-48 mx-5">
    <h1 className="quiz-title">{questionTitle}</h1>
  </div>
);

const AnswersCard = ({ alternatives }) => {
  return (
    <div className="quiz-card w-auto h-[30rem] md:mx-48 mx-5 overflow-hidden">
      <div className="grid grid-rows-4 grid-flow-col gap-x-4 gap-y-6 w-full px-12">
        {alternatives}
      </div>
    </div>
  );
};

export default () => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [quizQuestionNumber, setQuizQuestionNumber] = useState<undefined | number>(undefined);
  const [currentTendency, setCurrentTendency] = useState({});

  const quiz: quizTYPE = {
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

  function startQuiz(): void {
    setIsRunning(true);
    setCurrentTendency(() => {
      const tendencyObject = {};
      for (let i = 1; i <= Object.keys(quiz.quizHeader.quizTendency).length; i++) {
        tendencyObject[i] = 0;
      }
      return tendencyObject;
    });
  }

  function nextQuestion(quizQuestionNumber: number | undefined): void {
    setQuizQuestionNumber((quizQuestionNumber) => {
      if (quizQuestionNumber === undefined) {
        return 0;
      }
      return quizQuestionNumber + 1;
    });

    if ((quizQuestionNumber as number) === quiz.quizQuestions.length - 1) {
      handleResult();
    }
  }

  function buffer(alternative: alternativeTYPE): void {
    const tendencyValue = alternative.tendency;
    let tendencyAltValue = 0;
    if (alternative.tendencyAlt !== undefined) {
      tendencyAltValue = alternative.tendencyAlt;
    }

    setCurrentTendency((currentTendency) => {
      const tendencyObject = currentTendency;
      tendencyObject[tendencyValue] = tendencyObject[tendencyValue] + 1;
      if (alternative.tendencyAlt !== undefined) {
        tendencyObject[tendencyAltValue] = tendencyObject[tendencyAltValue] + 1;
      }
      return tendencyObject;
    });
    setTimeout(() => {
      console.log(currentTendency);
    }, 100);
  }

  function handleResult() {
    return {};
  }

  return (
    <div className="bg-slate-200 flex flex-col h-screen">
      {isRunning ? null : (
        <StartQuizCard quizTitle={quiz.quizHeader.quizTitle}>
          <StartQuizButton
            onClick={() => {
              startQuiz();
              nextQuestion(quizQuestionNumber);
            }}
          />
        </StartQuizCard>
      )}
      {isRunning ? (
        <>
          <QuestionCard
            questionTitle={quiz.quizQuestions[quizQuestionNumber as number]?.questionTitle}
          />
          <AnswersCard
            alternatives={quiz.quizQuestions[quizQuestionNumber as number]?.alternatives.map(
              (alternative, index) => {
                //Assign different slide up animation timming for each div
                const animationDelay = 0;
                if (index === 0) {
                }

                return (
                  <div
                    key={alternative.text}
                    onClick={() => {
                      buffer(alternative);
                      nextQuestion(quizQuestionNumber);
                    }}
                    style={{ animation: `slide-up ${animationDelay}s ease` }}
                    className="alternative-card flex-center">
                    <p className="alternative-text">{alternative.text}</p>
                  </div>
                );
              }
            )}
          />
        </>
      ) : null}
    </div>
  );
};
