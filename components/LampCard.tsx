export const LampCard: React.FC<{ img: string; name: string; description: string }> = ({ img, name, description }) => {
  return (
    <div className="flex flex-col items-center w-[200px] h-[300px] rounded-2xl overflow-clip shadow-xl">
      <img src={img} alt="lamp" className="w-[200px] h-[230px] object-cover" />
      <div className="my-auto px-4 font-bold flex flex-row justify-between w-full gap-2 shadow-none">
        <h3>🤍</h3>
        <h3>{name}</h3>
        <h3>🛒</h3>
      </div>
    </div>
  );
};
