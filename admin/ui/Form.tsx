type FormProps = {
  type?: "modal" | "regular";
  children: React.ReactNode;
  onSubmit?: (data: any) => void;
};

function Form({ type = "regular", children, onSubmit }: FormProps) {
  const classes = `${
    type === "modal"
      ? "w-[60rem]"
      : "px-10 py-6 rounded-md bg-white overflow-hidden text-sm"
  }`;

  return (
    <form className={classes} onSubmit={onSubmit} encType="multipart/form-data">
      {children}
    </form>
  );
}

export default Form;
