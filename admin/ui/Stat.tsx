function Stat({
  color,
  icon,
  title,
  value,
}: {
  color: string;
  icon: JSX.Element;
  title: string;
  value: string;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-md p-4 grid grid-cols-[auto_1fr] grid-rows-[auto_auto] gap-x-4 gap-y-1">
      <div
        className={`row-span-full aspect-square rounded-full flex items-center justify-center ${
          color === "blue"
            ? "bg-blue-100"
            : color === "yellow"
              ? "bg-yellow-100"
              : color === "green"
                ? "bg-green-100"
                : ""
        }`}
      >
        {icon}
      </div>
      <h5 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
        {title}
      </h5>
      <p className="text-xl font-medium text-gray-700">{value}</p>
    </div>
  );
}

export default Stat;
