function Sidebar({ children }) {
  return (
    <aside className="bg-grey-0 hidden overflow-hidden rounded-lg shadow-md lg:row-span-full lg:flex lg:w-full lg:flex-col lg:gap-6 lg:px-4 lg:py-5">
      {children}
    </aside>
  );
}

export default Sidebar;
