export default function Spinner() {
  return (
    <div className="min-h-60 flex flex-col h-full border shadow-sm rounded-xl ">
      <div className="flex flex-auto flex-col justify-center items-center p-4 md:p-5">
        <div className="flex justify-center">
          <div className="animate-spin inline-block w-[6.4rem] h-[6.4rem] border-[10px] border-current border-t-transparent text-orange-500 rounded-full "></div>
        </div>
      </div>
    </div>
  );
}
