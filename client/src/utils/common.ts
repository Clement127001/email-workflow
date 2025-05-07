import { Mail, Workflow } from "lucide-react";

export const baseApiUrl = "http://localhost:3000/api";

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

export function get(obj: any, path: any, defaultValue?: any) {
  const pathArray = Array.isArray(path) ? path : path.split(".");

  const result = pathArray.reduce((acc: any, key: any) => acc && acc[key], obj);

  return result === undefined ? defaultValue : result;
}
