import { createContext, useContext } from "react";

const TableContext = createContext({
  columns: "",
});

function Table({
  children,
  columns,
}: {
  children: React.ReactNode;
  columns: string;
}) {
  return (
    <TableContext.Provider value={{ columns }}>
      <div
        className="border border-grey-200 text-sm bg-white rounded-md"
        role="table"
      >
        {children}
      </div>
    </TableContext.Provider>
  );
}

function Header({ children }: { children: React.ReactNode }) {
  const { columns } = useContext(TableContext);

  return (
    <header
      style={{ gridTemplateColumns: columns }}
      className="grid gap-x-[2.4rem] place-items-start py-4 px-5 bg-gray-100/70 border-b border-grey-50 uppercase tracking-wide font-semibold text-grey-600"
      role="row"
    >
      {children}
    </header>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  const { columns } = useContext(TableContext);

  return (
    <div
      style={{ gridTemplateColumns: columns }}
      className="grid gap-x-[2.4rem] items-center py-3 px-5 border-b border-gray-100/70"
      role="row"
    >
      {children}
    </div>
  );
}

function Body({
  data,
  render,
}: {
  data: any[];
  render: (item: any, index: number) => React.ReactNode;
}) {
  if (!data || !data.length) {
    return (
      <p className="text-center text-grey-600 py-4">
        No data to show at the moment
      </p>
    );
  }

  return (
    <section className="my-1">
      {data.map((item, index) => (
        <div key={index}>{render(item, index)}</div>
      ))}
    </section>
  );
}

const Footer = ({ children }: { children: React.ReactNode }) => (
  <footer
    className="bg-gray-100/70 flex justify-center p-3"
    style={{ display: children ? "flex" : "none" }}
  >
    {children}
  </footer>
);

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;

export default Table;
