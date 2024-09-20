function FormRow({
  children,
  label,
  error,
}: {
  children: any;
  label?: string;
  error?: string | undefined;
}) {
  return (
    <div className="grid items-center grid-cols-[10rem,1fr,1fr] py-[1.2rem] gap-5 first:pt-0 last:pb-0 border-b border-gray-100 last:border-b-0">
      {label && (
        <label
          htmlFor={children.props.id}
          className="text-[17px] font-semibold text-slate-500"
        >
          {label}
        </label>
      )}
      {children}
      {error && <span className="text-[14px] text-red-600">{error}</span>}
    </div>
  );
}

export default FormRow;
