import { createContext } from "react";

const TableContext = createContext({});

function Table({ children }: { children: React.ReactNode }) {
  return (
    <TableContext.Provider value={{}}>
      <div className="flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-6xl">{children}</div>
      </div>
    </TableContext.Provider>
  );
}

function Header({ children }: { children: React.ReactNode }) {
  return (
    <div className="border border-gray-200 rounded-lg">
      <div className="grid grid-cols-5 place-items-start py-4 px-5 bg-gray-50 border-b border-gray-200 text-gray-600 uppercase">
        {children}
      </div>
    </div>
  );
}

function Body({ children }: { children: React.ReactNode }) {
  return <section className="space-y-2.5 bg-gray-50 px-5">{children}</section>;
}

function Footer() {
  return (
    <footer className="bg-slate-100 flex justify-center p-[1.2rem]"></footer>
  );
}

Table.Header = Header;
Table.Body = Body;
Table.Footer = Footer;

export default Table;
