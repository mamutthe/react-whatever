import React, { useState } from "react";

function Counter({ count }: { count: number }) {
  return <h1>{count}</h1>;
}

export function Button() {
  let [count, setCount] = useState(() => 0);

  function increaseCount() {
    setCount((prevCount) => prevCount + 1);
  }

  return (
    <>
      <button onClick={increaseCount}>Click Me</button>
      <Counter count={count}></Counter>
    </>
  );
}

export default Button;
