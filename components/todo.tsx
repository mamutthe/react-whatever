import React, { useRef, useState } from "react";

const TaskInput = React.forwardRef<HTMLInputElement>((props, ref) => (
  <input
    ref={ref}
    placeholder="Insert a task"
    className="py-2 px-1 rounded text-center"
  ></input>
));

const Task: React.FC<{
  name: string;
}> = ({ name }) => (
  <div
    className="text-black bg-white shadow-xl rounded py-5 px-10
    hover:bg-slate-50 font-mono font-extrabold text-2xl flex flex-row-reverse"
  >
    <p>{name}</p>
    <input type="checkbox" className="mr-5"></input>
  </div>
);

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
  const [task, setTask] = useState<string[]>([]);

  function handleAddTask() {
    if (inputRef.current == null) return;
    const value = inputRef.current.value;
    if (value.length == 0) return alert("You must insert a task first");
    if (task.includes(value)) return alert("You already added this task");
    setTask([...task, value]);
    inputRef.current.value = "";
    console.log(value);
  }
  return (
    <div className="bg-black flex flex-col items-center justify-center h-screen space-y-10">
      {task.map((name) => (
        <Task name={name} key={name} />
      ))}
      <TaskInput ref={inputRef} />
      <div>
        <AddTaskButton onClick={handleAddTask} />
      </div>
    </div>
  );
};
