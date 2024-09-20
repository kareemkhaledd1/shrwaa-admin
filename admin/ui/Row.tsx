type RowProps = {
  type?: "horizontal" | "vertical";
  children: React.ReactNode;
};

function Row({ type = "vertical", children }: RowProps) {
  const classes = `flex ${type === "horizontal" ? "flex justify-between items-center" : "flex flex-col gap-4"}`;

  return <div className={classes}>{children}</div>;
}

export default Row;
