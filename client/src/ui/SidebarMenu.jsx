import { NavLink } from "react-router-dom";

function SidebarMenu({ sidebar, color }) {
  return (
    <nav>
      <ul className="space-y-4">
        {sidebar.map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.to}
              className={`text-grey-700 hover:bg-grey-50 aria-[current=page] :bg-grey-50 hover:text-grey-900 aria-[current=page]:text-grey-900 text-300 flex items-center gap-2 px-3 py-4 font-medium transition-all duration-300 hover:rounded-sm`}
            >
              <item.icon className="group-[.active]:text-primary group-hover:text-primary" />
              <span>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default SidebarMenu;
