import { Mail, Workflow } from "lucide-react";

export const sidebarLinks = [
  {
    redirectLink: "/email",
    Icon: Mail,
    label: "all emails",
  },
  {
    redirectLink: "/workflow",
    Icon: Workflow,
    label: "all workflows",
  },
];

export const logout = () => {
  //   Cookies.remove("userToken");
};
