import AuthLayout from "@/src/components/layout/AuthLayout";
import { FC, ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthGroupLayout: FC<AuthLayoutProps> = ({ children }) => {
  return <AuthLayout>{children}</AuthLayout>;
};

export default AuthGroupLayout;
