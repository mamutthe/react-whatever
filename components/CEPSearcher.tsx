import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";

const SearchBar = () => {
  return (
    <form className="relative mt-1 p-3 rounded-md">
      <div
        className="absolute inset-y-0 pl-4 
                      flex items-center pointer-events-none"
      >
        <MagnifyingGlassIcon className="w-8 h-8 text-slate-900" />
      </div>
      <input
        className="block pl-14 w-full h-20 border-transparent 
                        rounded-3xl text-3xl bg-gray-50 shadow-xl shadow-gray-200
                        focus:ring-transparent focus:border-none focus:shadow-gray-300
                      hover:shadow-gray-300"
        type="text"
 /*        placeholder="Pesquisar" */
      />
    </form>
  );
};

const ClearButton = () => {
  return (
    <button className="h-20 w-20 flex items-center justify-center
     rounded-xl border-gray-500 shadow-lg shadow-gray-200 
     hover:shadow-gray-300 bg-gray-50">
      <XMarkIcon className="w-12 h-12 text-red-600" />
    </button>
  );
};

const CEPList = () => {
  return (
    
    )
}

export default () => {
  return (
    <div className="bg-slate-200 h-screen">
      <h1 className="text-slate-900 font-extrabold text-7xl md:text-9xl text-center">Digite o nome da rua...</h1>
      <CEPList />
      <SearchBar />
    </div>
  );
};
