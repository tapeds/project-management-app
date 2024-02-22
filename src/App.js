import "./App.css";
import { useState } from "react";
import List from "./List";

function App() {
  const [todos, setTodos] = useState([]);
  const [progress, setProgress] = useState([]);
  const [revision, setRevision] = useState([]);
  const [done, setDone] = useState([]);

  return (
    <main className="h-full overflow-hidden">
      <div className="min-h-screen h-full flex flex-col gap-10 justify-center items-start md:items-center bg-blue-100 w-screen">
        <div className="flex flex-col md:items-center">
          <h1 className="text-4xl font-bold px-5">ALeN</h1>
          <h1 className="text-2xl font-bold px-5">Project Management App</h1>
        </div>
        <div className="w-full flex flex-col justify-center items-start lg:items-center max-lg:px-5 max-lg:overflow-x-scroll">
          <div className="h-[450px] w-[1000px] bg-slate-400 flex p-3 gap-3 rounded-xl">
            <List
              data={todos}
              setData={setTodos}
              title="To Do"
              className="rounded-l-md"
            />
            <List data={progress} setData={setProgress} title="In Progress" />
            <List data={revision} setData={setRevision} title="In Revision" />
            <List
              data={done}
              setData={setDone}
              title="Done"
              className="rounded-r-md"
            />
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
