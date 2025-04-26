import AdminLayout from "./AdminLayout";
import SiteLayout from "./SiteLayout";

const isAdmin = false;

export const Layout = isAdmin ? AdminLayout : SiteLayout;
