import React from "react";
import ReactDOM from "react-dom";

/* const root = ReactDOM.createRoot(document.getElementById("root"));

function tick() {
  const element = <h1>It is {new Date().toLocaleTimeString()}</h1>;
  root.render(element);
}

setInterval(tick, 500); */

const rootDiv = document.getElementById("root");
const timeElement = document.createElement("h1");

const tick = () => {
  timeElement.innerHTML = `It is ${new Date().toLocaleTimeString()}`;
  rootDiv.appendChild(timeElement);
};

setInterval(tick, 500);
