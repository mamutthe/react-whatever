import React, { useState } from "react";


export function Button() {
  const [count, setCount] = useState(() => 0);

  function increaseCount() {
    setCount((prevCount) => prevCount + 1);
  }

  function decreaseCount() {
    setCount((prevCount) => prevCount - 1);
  }

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <span className="text-white text-6xl font-bold">{count}</span>
      <button 
      className="text-white/80 font-semibold bg-zinc-700 p-2 rounded-md w-[20%] "
      onClick={increaseCount}
      >Increase</button>
      <button 
      className="text-white/80 font-semibold bg-zinc-700 p-2 rounded-md w-[20%] "
      onClick={decreaseCount}
      >Decrease</button>
    </div>
  );
}

export default Button;
