function Card({ title, description }) {
  return (
    <div className="w-full bg-white py-1.5 px-2 rounded-md">
      <h5 className="text-base font-semibold">{title}</h5>
      <p className="text-xs">{description}</p>
    </div>
  );
}

export default Card;
