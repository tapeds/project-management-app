function Card({ title, description }) {
  return (
    <div className="w-full bg-white p-1.5 rounded-md">
      <h5 className="text-base">{title}</h5>
      <p className="text-xs">{description}</p>
    </div>
  );
}

export default Card;
