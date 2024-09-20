function ConfirmDelete({
  resourceName,
  onConfirm,
  disabled,
}: {
  resourceName: string;
  onConfirm: () => void;
  disabled: boolean;
}) {
  return (
    <div className="w-[40rem] flex flex-col gap-5 py-5">
      <h1 className="font-bold text-gray-600 text-3xl">
        Delete {resourceName}
      </h1>
      <p className="text-gray-400 ">
        Are you sure you want to delete this {resourceName} permanently? This
        action cannot be undone.
      </p>
      <div className="flex justify-end gap-5">
        <button className="bg-gray-200 text-gray-600 text-sm font-semibold px-3 py-3 rounded-md">
          Cancel
        </button>
        <button
          className="bg-red-600 text-white text-sm font-semibold px-3 py-3 rounded-md"
          onClick={onConfirm}
          disabled={disabled}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ConfirmDelete;
