import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

import {
  loginPages,
  loginRestrictedPages,
  validateToken,
} from "@/utils/common";

interface LoginContextInterface {
  isLoggedIn: boolean;
  refreshLoginState: () => void;
}

const LoginContext = createContext<LoginContextInterface>({
  isLoggedIn: false,
  refreshLoginState: () => {},
});

export const LoginProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const path = router.pathname;

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLogInChecked, setIsLogInChecked] = useState<boolean>(false);

  const refreshLoginState = () => {
    const token = Cookies.get("userToken");
    const isValidToken = validateToken(token);

    setIsLoggedIn(isValidToken);
    setIsLogInChecked(true);
  };

  useEffect(() => {
    const token = Cookies.get("userToken");

    if (!router.isReady) return;

    if (!token && loginRestrictedPages.includes(path)) {
      router.push("login/?ua=" + true);
      return;
    } else if (token && loginPages.includes(path)) {
      router.push("/");
    } else {
      refreshLoginState();
    }
  }, [router.isReady, router, path]);

  if (!isLogInChecked) {
    return <div className="w-[100vw] h-[100vh] bg-app-gray-700"></div>;
  }

  return (
    <LoginContext.Provider value={{ isLoggedIn, refreshLoginState }}>
      {children}
    </LoginContext.Provider>
  );
};

export const UseLogin = () => useContext(LoginContext);
