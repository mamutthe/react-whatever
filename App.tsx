import React, { useState } from 'react';
import { Dispatch, SetStateAction } from 'react';
import CEPSearcher from './projects/CEPSearcher';
import Quiz from './projects/Quiz';
import Todo from './projects/Todo';
import Counter from './projects/Counter';

const RoundedCard = ({ children, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="lg:h-20 lg:w-96 h-14 w-80 flex items-center justify-center rounded-lg border border-white/50 bg-white/20 text-2xl font-medium text-slate-200 transition-all duration-100 ease-linear cursor-pointer hover:bg-white hover:text-slate-900 active:bg-white">
      {children}
    </div>
  );
};

const Navbar = ({ setCurrentProject }: { setCurrentProject: Dispatch<SetStateAction<string>> }) => {
  return (
    <div className="z-2 absolute w-screen h-0">
      <button
        onClick={() => {
          setCurrentProject('Index');
        }}
        className="relative ml-4 mt-2 flex h-10 w-10 lg:h-14 lg:w-14 cursor-pointer flex-row items-center justify-center space-x-2 rounded-xl border border-white/10 bg-zinc-900/80">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 text-zinc-500">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
      </button>
    </div>
  );
};

const Index = ({ setCurrentProject }: { setCurrentProject: Dispatch<SetStateAction<string>> }) => (
  <>
    <div className="flex flex-col items-center gap-3 p-8">
      <span className="text-white font-bold text-4xl text-center lg:text-6xl">React Whatever</span>
      <span className="text-white font-medium text-2xl lg:text-3xl lg:mb-6">Projetos em React</span>
      <RoundedCard
        onClick={() => {
          setCurrentProject('CEPSearcher');
        }}>
        Buscador de CEP
      </RoundedCard>
      <RoundedCard
        onClick={() => {
          setCurrentProject('Quiz');
        }}>
        Quiz de personalidade
      </RoundedCard>
      <RoundedCard
        onClick={() => {
          setCurrentProject('Todo');
        }}>
        Lista de tarefas
      </RoundedCard>
      <RoundedCard
        onClick={() => {
          setCurrentProject('Counter');
        }}>
        Contador
      </RoundedCard>
    </div>
  </>
);

const App = () => {
  const [currentProject, setCurrentProject] = useState('Index');
  return (
    <div>
      {currentProject !== 'Index' && <Navbar setCurrentProject={setCurrentProject} />}
      {currentProject === 'Index' && <Index setCurrentProject={setCurrentProject} />}
      {currentProject === 'CEPSearcher' && <CEPSearcher />}
      {currentProject === 'Quiz' && <Quiz />}
      {currentProject === 'Todo' && <Todo />}
      {currentProject === 'Counter' && <Counter />}
    </div>
  );
};

export default App;
