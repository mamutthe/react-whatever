import React, { useEffect, useRef, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
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
                      flex items-center pointer-events-none"
      >
        <MagnifyingGlassIcon className="w-8 h-8 text-slate-900" />
      </div>
      <input
        className="block pl-14 w-full h-20 border-transparent 
        rounded-l-3xl text-3xl bg-gray-50
        focus:ring-transparent focus:border-none focus:shadow-gray-300
        "
        type="text"
        /*        placeholder="Pesquisar" */
      />
    </form>
  );
};

const ClearButton: React.FC<ButtonTYPE> = (rest) => {
  return (
    <button
      {...rest}
      className="p-4 flex items-center justify-center
    rounded-r-3xl border-gray-500 bg-gray-50"
    >
      <XMarkIcon className="w-12 h-12 text-red-600" />
    </button>
  );
};

const CEPCard: React.FC<CEPCardTYPE> = ({
  cep,
  state,
  city,
  neighborhood,
  street,
}) => {
  const CEPCardRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  return (
    <div
      ref={CEPCardRef}
      className=" flex flex-col items-center justify-center
    shadow-gray-200 bg-white rounded-3xl 
    py-4 font-mono text-slate-900 transition-all"
    >
      <div className="w-fit">
        <p className="md:text-4xl text-2xl text-center">{street}</p>
        {state && city && neighborhood && (
          <p className="md:text-2xl text-xl text-center">
            {neighborhood} - {city}/{state}
          </p>
        )}
        {cep && (
          <p className="text-lg text-slate-900/50 font-semibold text-end">
            {cep}
          </p>
        )}
      </div>
    </div>
  );
};

export default () => {
  const [dot, setDot] = useState("");
  const [CEPInfo, setCepInfo] = useState<CEPCardTYPE>();

  useEffect(() => {
    const interval = setInterval(() => {
      setDot((dot) => (dot.length < 3 ? dot + "." : ""));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const CEPCardRef = useRef<HTMLDivElement>(null);

  async function getCEPAPI(CEPNumber: string) {
    const brasilAPICEP = await fetch(
      `https://brasilapi.com.br/api/cep/v1/${CEPNumber}`
    );
     if (brasilAPICEP.ok) {
      const data = await brasilAPICEP.json();
      setCepInfo(data);
    } else
      setCepInfo({
        street: "Não foi possível encontrar o CEP",
      });
  }

  return (
    <div className="bg-slate-200 h-screen">
      <div className="m-auto max-w-2xl  p-3 flex flex-col justify-center space-y-10 pt-24">
        {CEPInfo ? (
          <CEPCard {...CEPInfo} />
        ) : (
          <div className="flex justify-center w-full text-slate-900 font-mono md:text-5xl text-3xl">
            <h1 className="text-center">Insira o número do CEP</h1>
            <span className="w-10">{dot}</span>
          </div>
        )}
        <div className="flex shadow-xl shadow-gray-200 hover:shadow-gray-300 rounded-3xl">
          <SearchBar
            onSubmit={async (e) => {
              e.preventDefault();
              const input = e.currentTarget[0] as HTMLInputElement;
              await getCEPAPI(input.value);
              input.value = "";
            }}
          />
          <ClearButton
            onClick={() => {
              CEPCardRef.current?.setAttribute("style", "opacity: 0");
              setCepInfo(undefined);
            }}
          />
        </div>
      </div>
    </div>
  );
};
