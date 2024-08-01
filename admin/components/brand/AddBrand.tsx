import { useState } from "react";
import { HiXMark } from "react-icons/hi2";
import AddBrandForm from "@/components/brand/AddBrandForm";

function AddBrand() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen && (
        <div className="fixed top-0 right-0 w-full h-svh bg-black/10 backdrop-blur-[4px] z-50 transition-all duration-[0.5s]">
          <div className="fixed top-0 right-[45%] translate-y-1/2 translate-x-1/2 bg-white w-[60rem] rounded-md shadow-md p-[1rem]  transition-all duration-[0.5s]">
            <button
              className="p-[0.4rem] rounded translate-x-[0.4rem] transition-all duration-[0.2s] absolute top-[0.8rem] right-[1.9rem] text-3xl"
              onClick={() => setIsOpen(false)}
            >
              <HiXMark />
            </button>

            <div>
              <AddBrandForm />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AddBrand;
