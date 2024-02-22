function Card() {
  return (
    <div
      className="w-full bg-white p-1.5 rounded-md widget"
      draggable
      onDragStart={(e) => e.handleOnDrag(e, "Widget A")}
    >
      <h5 className="text-base">Title</h5>
      <p className="text-xs">Description</p>
    </div>
  );
}

export default Card;
