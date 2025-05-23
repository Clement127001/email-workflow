import { UseLogin } from "@/context/LoginProvider";
import { IconType } from "@/types/common";
import Link from "next/link";
import { useRouter } from "next/router";

const SidebarLink = ({
  Icon,
  label,
  redirectLink,
}: {
  Icon: IconType;
  label: string;
  redirectLink: string;
}) => {
  const { isLoggedIn } = UseLogin();
  const router = useRouter();
  const isActive = router.asPath.includes(redirectLink);

  return (
    <Link
      href={isLoggedIn ? redirectLink : "/login?ua=true"}
      className={`p-3 flex items-center gap-4  ${
        isActive
          ? "hover:bg-app-primary-700 bg-app-primary-700"
          : "hover:bg-gray-100"
      } rounded-lg group`}
    >
      <Icon
        className={` ${
          isActive ? "text-white" : "text-app-gray-300 group-hover:text-black"
        }`}
        strokeWidth={1.7}
      />
      <p
        className={`capitalize font-medium ${
          isActive ? "text-white" : "text-black"
        }`}
      >
        {label}
      </p>
    </Link>
  );
};

export default SidebarLink;
