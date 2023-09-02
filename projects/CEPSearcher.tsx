import React, { useEffect, useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { ArrowPathRoundedSquareIcon } from '@heroicons/react/24/outline';
type SearchBarTYPE = React.DetailedHTMLProps<
  React.FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
>;

type CEPCardTYPE = {
  cep?: string | undefined;
  state?: string | undefined;
  city?: string | undefined;
  neighborhood?: string | undefined;
  street: string;
};

type ButtonTYPE = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const SearchBar: React.FC<SearchBarTYPE> = ({ ...rest }) => {
  return (
    <form className="w-full relative rounded-md" {...rest}>
      <div
        className="absolute inset-y-0 pl-4 
                      flex items-center pointer-events-none">
        <MagnifyingGlassIcon className="w-8 h-8 text-white/80" />
      </div>
      <input
        className="block pl-14 w-full h-20 border-transparent
        rounded-l-3xl text-3xl bg-white/20 text-white/80
        focus:ring-transparent focus:border-none focus:shadow-gray-300
        "
        type="text"
        placeholder="Pesquisar..."
      />
    </form>
  );
};

const ClearButton: React.FC<ButtonTYPE> = (rest) => {
  return (
    <button
      {...rest}
      className="p-4 flex items-center justify-center
    rounded-r-3xl border-gray-500 bg-white/20">
      <ArrowPathRoundedSquareIcon className="w-10 h-10 text-white/80" />
    </button>
  );
};

const CEPCard: React.FC<CEPCardTYPE> = ({ cep, state, city, neighborhood, street }) => {
  return (
    <div
      onClick={() => {
        window.open(
          `https://www.google.com/maps/search/?api=1&query=${cep},${city},${state}`,
          '_blank'
        );
      }}
      className=" flex flex-col items-center justify-center
    shadow-gray-200 bg-white/20 rounded-3xl border border-white/40
    py-4 font-mono text-white/80 transition-all">
      <div className="w-fit">
        <p className="md:text-4xl text-2xl text-center cursor-pointer">{street}</p>
        {state && city && neighborhood && (
          <p className="md:text-2xl text-xl text-center">
            {neighborhood} - {city}/{state}
          </p>
        )}
        {cep && <p className="text-lg text-white/80 font-semibold text-end">{cep}</p>}
      </div>
    </div>
  );
};

export default () => {
  const [dot, setDot] = useState('');
  const [CEPInfo, setCepInfo] = useState<CEPCardTYPE>();

  useEffect(() => {
    const interval = setInterval(() => {
      setDot((dot) => (dot.length < 3 ? dot + '.' : '.'));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  async function getCEPAPI(CEPNumber: string) {
    const brasilAPICEP = await fetch(`https://brasilapi.com.br/api/cep/v1/${CEPNumber}`);
    if (brasilAPICEP.ok) {
      const data = await brasilAPICEP.json();
      setCepInfo(data);
    } else
      setCepInfo({
        street: 'Não foi possível encontrar o CEP'
      });
  }

  return (
    <div className="m-auto max-w-2xl p-3 flex flex-col justify-center space-y-10 pt-24">
      {CEPInfo ? (
        <CEPCard {...CEPInfo} />
      ) : (
        <div className="flex justify-center w-full text-white font-mono md:text-5xl text-3xl">
          <h1 className="text-center text-2xl">Insira o número do CEP</h1>
          <span className="w-10">{dot}</span>
        </div>
      )}
      <div
        className="flex rounded-3xl border border-white/40 bg-zinc-900/80
         shadow-xl shadow-white/5 hover:shadow-white/10">
        <SearchBar
          onSubmit={async (e) => {
            e.preventDefault();
            const input = e.currentTarget[0] as HTMLInputElement;
            await getCEPAPI(input.value);
            input.value = '';
          }}
        />
        <ClearButton
          onClick={() => {
            setCepInfo(undefined);
          }}
        />
      </div>
    </div>
  );
};
