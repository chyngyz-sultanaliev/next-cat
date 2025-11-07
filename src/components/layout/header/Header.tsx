"use client";
import Image from "next/image";
import sass from "./Header.module.scss";
import logo from "../../../assets/icons/logo.icon.svg";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { CiLogout } from "react-icons/ci";
interface HeaderProps {
  token: string;
}
const Header: FC<HeaderProps> = ({ token }) => {
  const router = useRouter();

  const logout = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/v1/auth/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      console.log(data.message);
      router.push("/login");
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    }
  };

  return (
    <header className={sass.header}>
      <div className="container">
        <div className={sass.nav}>
          <Image src={logo} width={80} height={80} alt="img" />
          <div className={sass.links}>
            <Link href="/">Main</Link>
            <Link href="/gallery">Gallery</Link>
            <Link href="/news">News</Link>
            <Link href="/profile">Profile</Link>
          </div>
          <h4>
            +544 3490 00000 <br />
            <span>Звони скорее!</span>
          </h4>
        </div>

        <div className={sass.bottom}>
          <h1>Найдено 349 котов</h1>
          <a onClick={logout} className={sass.logoutBtn}>
            Logout <CiLogout />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
