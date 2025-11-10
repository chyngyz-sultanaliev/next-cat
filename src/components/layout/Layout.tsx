import { FC, ReactNode } from "react";
import sass from "./Layout.module.scss";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import { CheckAuth } from "../utils/check/CheckAuth";
import API_BASE_URL from "@/config/api";
interface LayoutProps {
  children: ReactNode;
}
const Layout: FC<LayoutProps> = async ({ children }) => {
  const token = await CheckAuth()
  
  const res = await fetch(`${API_BASE_URL}/api/v1/cats`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Ошибка при загрузке котов");
  }
  const data = await res.json();
  const cats = data.cats;
  return (
    <div className={sass.layout}>
      <Header countCat={cats.length} token={token}/>
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
