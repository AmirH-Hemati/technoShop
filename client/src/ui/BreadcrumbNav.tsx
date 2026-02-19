import React from "react";

import { useLocation, Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb.js";
import { ChevronLeft } from "lucide-react";

const routeLabels: Record<string, string> = {
  "/": "خانه",
  "/products": "محصولات",
  "/cart": "سبد خرید",
  "/checkout": "پرداخت",
  "/profile": "پروفایل",
  "/profile/orders": "سفارش‌ها",
  "/dashboard": "داشبورد",
  "/aboutUs": "درباره ما",
  "/ContactUs": "ارتباط با ما",
};

export default function BreadcrumbNav() {
  const location = useLocation();
  const pathSegments = location.pathname
    .split("/")
    .filter((segment) => segment !== "");
  if (location.pathname === "/") {
    return null;
  }

  const crumbs = pathSegments.map((segment, index) => {
    const path = "/" + pathSegments.slice(0, index + 1).join("/");
    const label =
      routeLabels[path] || decodeURIComponent(segment).replace(/-/g, " ");

    const isLast = index === pathSegments.length - 1;
    return { path, label, isLast };
  });

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">خانه</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          {crumbs.map((crumb) => (
            <React.Fragment key={crumb.path}>
              <BreadcrumbSeparator>
                <ChevronLeft className="text-primary" />
              </BreadcrumbSeparator>

              <BreadcrumbItem>
                {crumb.isLast ? (
                  <BreadcrumbPage className="font-medium">
                    {crumb.label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={crumb.path}>{crumb.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
