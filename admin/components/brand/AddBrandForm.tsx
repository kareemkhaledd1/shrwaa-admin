function AddBrandForm() {
  return (
    <div>
      <form className="overflow-hidden p-5">
        <div className="grid grid-cols-[10rem,1fr,1.2fr] place-items-center py-[1.2rem] border-b border-gray-200">
          <label
            htmlFor="name"
            className="text-[17px] font-semibold text-slate-500"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full py-1.5 px-3 border rounded border-gray-300  outline-none focus:border-orange-500 transition-all duration-300"
          />
        </div>

        <div className="grid grid-cols-[10rem,1fr,1.2fr] place-items-center py-[1.2rem] border-b border-gray-200">
          <label
            htmlFor="name"
            className="text-[17px] font-semibold text-slate-500"
          >
            published
          </label>

          <select
            id="published"
            className="w-full py-1.5 text-lg px-3 border rounded border-gray-300 outline-none transition-all duration-300"
          >
            <option value="published">Published</option>
            <option value="not-published">Not-published</option>
          </select>
        </div>
        <div className="grid grid-cols-[10rem,1fr,1.2fr] place-items-center py-[1.2rem] border-b border-gray-200">
          <label
            htmlFor="name"
            className="text-[17px] font-semibold text-slate-500"
          >
            Image
          </label>

          <input
            type="file"
            id="image"
            className="w-full  rounded  outline-none focus:border-orange-500 transition-all duration-300"
          />
        </div>
      </form>
      <div className="flex justify-end gap-3 mt-5">
        <button className="bg-orange-500 text-white font-semibold px-4 py-2 rounded">
          Add
        </button>
        <button className="bg-gray-200 text-gray-600 font-semibold px-4 py-2 rounded">
          Cancel
        </button>
      </div>
    </div>
  );
}

export default AddBrandForm;
