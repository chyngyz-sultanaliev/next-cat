import { FC, ReactNode } from "react";
import sass from "./Layout.module.scss";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import { CheckAuth } from "../utils/check/CheckAuth";
interface LayoutProps {
  children: ReactNode;
}
const Layout: FC<LayoutProps> = async ({ children }) => {
  const token = await CheckAuth()
  return (
    <div className={sass.layout}>
      <Header token={token}/>
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
