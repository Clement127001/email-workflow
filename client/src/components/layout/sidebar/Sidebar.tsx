import { Fragment, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { LogOut, Workflow } from "lucide-react";
import Link from "next/link";
import SidebarLink from "@/components/layout/sidebar/SidebarLink";
import { logout, sidebarLinks } from "@/utils/common";
import { UseLogin } from "@/context/LoginProvider";
import { Button } from "@/components/ui/button";

const LogoutConfirmationModal = dynamic(
  import("@/components/ConfirmationModal").then((mod) => mod.default),
  { ssr: false }
);

const Sidebar = () => {
  const [logoutConfirmationModalOpened, setLogoutConfirmationModalOpened] =
    useState<boolean>(false);
  const router = useRouter();
  const { isLoggedIn } = UseLogin();

  const handleCloseLogoutConfirmationModal = () => {
    setLogoutConfirmationModalOpened(false);
  };

  const handleLogout = () => {
    logout();
    router.push("/login?ua=false");
  };

  return (
    <>
      <section className="flex flex-col gap-4 justify-between p-4 h-screen">
        <section aria-description="sidebar" className="space-y-5">
          <Link
            href={"/"}
            className="flex max-h-20 items-center gap-2 py-5 border-b-[1px] border-dashed border-app-gray-200 cursor-pointer"
          >
            <Workflow />
            <h1 className="text-[24px] font-semibold text-app-admin-primary-700">
              Email Workflow
            </h1>
          </Link>

          <nav className="space-y-3">
            {sidebarLinks.map((linkData) => (
              <Fragment key={linkData.label}>
                <SidebarLink {...linkData} />
              </Fragment>
            ))}
          </nav>
        </section>
        {isLoggedIn && (
          <Button
            className="bg-app-accent-error-500 hover:bg-app-accent-error-600 text-white w-full"
            onClick={() => {
              setLogoutConfirmationModalOpened(true);
            }}
          >
            <LogOut
              size={32}
              strokeWidth={2.4}
              onClick={() => {
                setLogoutConfirmationModalOpened(true);
              }}
            />
            Logout
          </Button>
        )}
      </section>

      {logoutConfirmationModalOpened && (
        <LogoutConfirmationModal
          opened={logoutConfirmationModalOpened}
          onClose={handleCloseLogoutConfirmationModal}
          title="Log Out"
          description="Are you sure you want to log out? You will need to sign in again to access your account."
          confirmText="Yes, Logout"
          onClickConfirm={handleLogout}
        />
      )}
    </>
  );
};

export default Sidebar;
