import { ReactNode } from "react";
import Sidebar from "@/components/layout/sidebar/Sidebar";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="grid grid-cols-11 w-full">
      <aside className="col-span-2">
        <Sidebar />
      </aside>
      <div className="col-span-9 min-h-screen shadow-xl p-[32px__24px]">
        {children}
      </div>
    </main>
  );
};

export default Layout;
