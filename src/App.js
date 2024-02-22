import "./App.css";
import { useState } from "react";
import Card from "./Card";

function App() {
  const [todos, setTodos] = useState(1);
  const [progress, setProgress] = useState(1);
  const [revision, setRevision] = useState(1);
  const [done, setDone] = useState(1);

  return (
    <main className="h-full overflow-hidden">
      <div className="min-h-screen h-full flex flex-col gap-10 justify-center items-start md:items-center bg-blue-100 w-screen">
        <div className="flex flex-col md:items-center">
          <h1 className="text-4xl font-bold px-5">ALeN</h1>
          <h1 className="text-2xl font-bold px-5">Project Management App</h1>
        </div>
        <div className="w-full flex flex-col justify-center items-start lg:items-center max-lg:px-5 max-lg:overflow-x-scroll">
          <div className="h-[450px] w-[1000px] bg-slate-400 flex p-3 gap-3 rounded-xl">
            <div className="w-1/4 bg-red-300 flex flex-col justify-between h-full p-3 rounded-l-md gap-y-2">
              <div className="text-center">To Do</div>
              <div className="h-full rounded-lg flex flex-col gap-y-1">
                {Array(todos)
                  .fill({})
                  .map((card, index) => (
                    <Card key={index} />
                  ))}
              </div>
              <div
                className="hover:cursor-pointer"
                onClick={() => setTodos((todos) => todos + 1)}
              >
                Add Item
              </div>
            </div>
            <div className="w-1/4 bg-red-300 flex flex-col justify-between h-full p-3 rounded-l-md gap-y-2">
              <div className="text-center">In Progress</div>
              <div className="h-full rounded-lg flex flex-col gap-y-1">
                {Array(progress)
                  .fill({})
                  .map((card, index) => (
                    <Card key={index} />
                  ))}
              </div>
              <div
                className="hover:cursor-pointer"
                onClick={() => setProgress((progress) => progress + 1)}
              >
                Add Item
              </div>
            </div>
            <div className="w-1/4 bg-red-300 flex flex-col justify-between h-full p-3 rounded-l-md gap-y-2">
              <div className="text-center">In Revision</div>
              <div className="h-full flex flex-col gap-y-1 rounded-lg">
                {Array(revision)
                  .fill({})
                  .map((card, index) => (
                    <Card key={index} />
                  ))}
              </div>
              <div
                className="hover:cursor-pointer"
                onClick={() => setRevision((revision) => revision + 1)}
              >
                Add Item
              </div>
            </div>
            <div className="w-1/4 bg-red-300 flex flex-col justify-between h-full p-3 rounded-l-md gap-y-2">
              <div className="text-center">Done</div>
              <div className="h-full flex flex-col gap-y-1 rounded-lg">
                {Array(done)
                  .fill({})
                  .map((card, index) => (
                    <Card key={index} />
                  ))}
              </div>
              <div
                className="hover:cursor-pointer"
                onClick={() => setDone((done) => done + 1)}
              >
                Add Item
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-10 flex flex-col justify-center items-center bg-blue-100">
        <p>Farrell Matthew Lim</p>
      </div>
    </main>
  );
}

export default App;
