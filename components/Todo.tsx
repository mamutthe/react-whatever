import React, { useEffect, useRef, useState } from "react";

const TaskInput = React.forwardRef<HTMLInputElement>((props, ref) => (
  <input
    ref={ref}
    placeholder="Insert a task"
    className="py-2 px-1 rounded text-center"
  ></input>
));

const Task: React.FC<{
  name: string;
  onRemove: () => void;
}> = ({ name, onRemove }) => {
  function handleChange(e) {
    //Fade Out removal
    e.target.parentElement.style = "opacity: 0";
    setTimeout(onRemove, 500);
    console.log(name, "handleChange");
  }

  return (
    <div
      className="text-button bg-white shadow-xl rounded py-5 px-10
    hover:bg-slate-50 font-mono font-extrabold text-2xl flex flex-row-reverse
    justify-end transition-all"
    >
      <p>{name}</p>
      <input type="checkbox" onChange={handleChange} className="mr-5"></input>
    </div>
  );
};

const AddTaskButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>((props, ref) => (
  <button
    {...props}
    ref={ref}
    className="text-black bg-white shadow-xl rounded py-5 px-10
     hover:bg-slate-50 font-mono font-extrabold text-2xl"
  >
    ADD TASK
  </button>
));

export default () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [task, setTask] = useState<string[]>([
    "Pet a dog",
    "Debug some code",
    "Perform experiments",
    "Center a DIV",
    "Hunt a wild JS",
    "I love TS",
    "I hate TS",
  ]);

  function handleAddTask(e) {
    e.preventDefault();
    if (inputRef.current == null) return;
    const value = inputRef.current.value;
    if (value.length == 0) return alert("You must insert a task first");
    if (task.includes(value)) return alert("You already added this task");
    setTask([...task, value]);
    inputRef.current.value = "";
    console.log(value);
  }

  return (
    <div className="bg-slate-900 min-h-screen p-4 flex flex-col items-center justify-center space-y-10">
      <div className="grid md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
        {task.map((name) => (
          <Task
            onRemove={() => {
              setTask(task.filter((x) => x !== name));
              console.log(name, "removeu");
            }}
            name={name}
            key={name}
          />
        ))}
      </div>
      <form className="flex flex-col items-center space-y-5">
        <TaskInput ref={inputRef} />
        <div>
          <AddTaskButton type="submit" onClick={handleAddTask} />
        </div>
      </form>
    </div>
  );
};
