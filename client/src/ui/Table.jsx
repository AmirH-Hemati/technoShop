import { createContext, useContext } from "react";

const TableContext = createContext();
function Table({ children, columns }) {
  return (
    <TableContext.Provider value={{ columns }}>
      <div
        className="bg-grey-0 border-grey-200 w-full overflow-x-scroll rounded-md border text-base shadow-sm"
        role="table"
      >
        {children}
      </div>
    </TableContext.Provider>
  );
}

function Header({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <header
      role="row"
      style={{ gridTemplateColumns: columns }}
      className="border-grey-100 text-grey-900 bg-grey-50 grid items-center gap-x-6 border-b px-6 py-3 font-semibold tracking-tighter uppercase"
    >
      {children}
    </header>
  );
}
function Row({ children }) {
  const { columns } = useContext(TableContext);

  return (
    <div
      role="row"
      style={{ gridTemplateColumns: columns }}
      className="border-grey-100 text-grey-900 grid items-center gap-x-6 border-b px-6 py-3"
    >
      {children}
    </div>
  );
}
function Body({ render, data }) {
  if (!data?.length)
    return (
      <p className="m-4 text-center text-base font-medium">
        داده ای برای نمایش در این لحظه وجود ندارد.
      </p>
    );

  return <section className="m-2">{data.map(render)}</section>;
}
function Footer({ children }) {
  return (
    <footer className="bg-grey-2 flex justify-center p-4">{children}</footer>
  );
}

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;

export default Table;
