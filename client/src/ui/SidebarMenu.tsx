import type { SidebarAccountType } from "@/data/AccountSidebarItmes.js";
import { cn } from "@/lib/utils.js";
import { Link, useLocation } from "react-router-dom";

type Props = { sidebar: SidebarAccountType[] };

function SidebarMenu({ sidebar }: Props) {
  const { pathname } = useLocation();

  return (
    <nav>
      <ul className="space-y-4">
        {sidebar.map((item) => {
          const isActive = pathname === item.href;

          return (
            <li key={item.href}>
              <Link
                to={item.href}
                className={cn(
                  "text-grey-700 hover:bg-grey-50 hover:text-grey-900 flex items-center gap-2 px-3 py-4 font-medium transition-all duration-300",
                  isActive && "bg-grey-50 border-primary text-300 border-r-4",
                )}
              >
                <item.icon
                  className={cn(
                    "transition-colors",
                    isActive && "text-primary",
                  )}
                />
                <span className="leading-none text-300">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default SidebarMenu;
