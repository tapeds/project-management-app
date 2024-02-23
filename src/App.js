import "./App.css";
import List from "./List";
import { DragDropContext } from "react-beautiful-dnd";

function App() {
  const todos = JSON.parse(localStorage.getItem("To Do"));
  const progress = JSON.parse(localStorage.getItem("In Progress"));
  const revision = JSON.parse(localStorage.getItem("In Revision"));
  const done = JSON.parse(localStorage.getItem("Done"));

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    const sourceList = JSON.parse(localStorage.getItem(source.droppableId));
    const card = sourceList[source.index];

    sourceList.splice(source.index, 1);
    localStorage.setItem(source.droppableId, JSON.stringify(sourceList));

    const destinationList =
      JSON.parse(localStorage.getItem(destination.droppableId)) || [];

    destinationList.splice(destination.index, 0, card);

    localStorage.setItem(
      destination.droppableId,
      JSON.stringify(destinationList)
    );

    window.location.reload();
  };

  return (
    <main className="h-full overflow-hidden">
      <title>ALeN</title>
      <div className="min-h-screen h-full flex flex-col gap-5 md:gap-10 justify-center items-start md:items-center bg-[#F6F6F6]">
        <div className="flex flex-col md:items-center">
          <h1 className="text-4xl font-bold px-5 text-gray-900">SHAV</h1>
          <h1 className="text-2xl font-bold px-5 text-gray-900">
            Project Management App
          </h1>
        </div>
        <div className="w-full flex flex-col justify-center items-start lg:items-center max-lg:px-5 max-lg:overflow-x-scroll">
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="h-[450px] w-[1000px] bg-gray-900 flex p-3 gap-3 rounded-xl divide-x-2 divide-gray-600">
              <List data={todos} title="To Do" className="rounded-l-md" />
              <List data={progress} title="In Progress" />
              <List data={revision} title="In Revision" />
              <List data={done} title="Done" className="rounded-r-md" />
            </div>
          </DragDropContext>
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
