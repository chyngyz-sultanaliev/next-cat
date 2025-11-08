import Layout from "@/src/components/layout/Layout";
import { FC, ReactNode } from "react";
interface LayoutProps {
  children: ReactNode;
}
const layout: FC<LayoutProps> = ({ children }) => {
  return <Layout>{children}</Layout>;
};

export default layout;
