import "./App.css";
import List from "./List";

function App() {
  const todos = JSON.parse(localStorage.getItem("todos"));
  const progress = JSON.parse(localStorage.getItem("progress"));
  const revision = JSON.parse(localStorage.getItem("revision"));
  const done = JSON.parse(localStorage.getItem("done"));

  console.log(todos);

  return (
    <main className="h-full overflow-hidden">
      <title>ALeN</title>
      <div className="min-h-screen h-full flex flex-col gap-5 md:gap-10 justify-center items-start md:items-center bg-[#F6F6F6]">
        <div className="flex flex-col md:items-center">
          <h1 className="text-4xl font-bold px-5 text-gray-900">ALeN</h1>
          <h1 className="text-2xl font-bold px-5 text-gray-900">
            Project Management App
          </h1>
        </div>
        <div className="w-full flex flex-col justify-center items-start lg:items-center max-lg:px-5 max-lg:overflow-x-scroll">
          <div className="h-[450px] w-[1000px] bg-gray-900 flex p-3 gap-3 rounded-xl divide-x-2 divide-gray-600">
            <List
              data={todos}
              storage="todos"
              title="To Do"
              className="rounded-l-md"
            />
            <List data={progress} storage="progress" title="In Progress" />
            <List data={revision} storage="revision" title="In Revision" />
            <List
              data={done}
              storage="done"
              title="Done"
              className="rounded-r-md"
            />
          </div>
        </div>
      </div>
      <div className="h-10 flex flex-col justify-center items-center bg-[#F6F6F6]">
        <p className="text-base text-gray-900 font-medium">
          Farrell Matthew Lim - 5025221258
        </p>
      </div>
    </main>
  );
}

export default App;
