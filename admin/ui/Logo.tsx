import Image from "next/image";

function Logo() {
  return (
    <div className="pt-10">
      <div className="bg-orange-500 p-3 rounded-md">
        <Image
          src={"/shrwaa-logo-white.png"}
          alt={""}
          width={150}
          height={200}
          className="rounded-full object-cover w-auto h-auto"
          priority
        />
      </div>
      {/*<div className="flex items-center gap-1 bg-orange-500 p-3 rounded-md">*/}
      {/*  <span className="text-5xl text-white">*/}
      {/*    <HiShoppingBag />*/}
      {/*  </span>*/}
      {/*  <h1 className="text-4xl font-bold text-white">shrwaa</h1>*/}
      {/*</div>*/}
    </div>
  );
}

export default Logo;
