import API_BASE_URL from "@/config/api";
import sass from "./Profile.module.scss";
import Image from "next/image";
import { CheckAuth } from "../../utils/check/CheckAuth";
import CatsCard from "../../ui/catsCard/CatsCard";
import Link from "next/link";

interface UserProfile {
  userName: string;
  email: string;
  avatar?: string;
  isAdmin: boolean;
}

interface FavoriteResponseItem {
  id: string;
  userId: string;
  catId: string;
  createdAt: string;
  cat: Cat;
}

interface Cat {
  id: string;
  name: string;
  color: string;
  age: number;
  paws: number;
  price: number;
  sale: number;
  image: string;
  isFavorite?: boolean;
}

async function Profile() {
  const token = await CheckAuth();
  let profile: UserProfile | null = null;
  let favorites: Cat[] = [];

  try {
    const resProfile = await fetch(`${API_BASE_URL}/api/v1/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    const jsonProfile = await resProfile.json();
    profile = jsonProfile.user;

    // Избранные коты
    const resFav = await fetch(`${API_BASE_URL}/api/v1/favorite`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    const jsonFav = await resFav.json();
    favorites = Array.isArray(jsonFav)
      ? (jsonFav as FavoriteResponseItem[]).map((fav) => fav.cat)
      : [];
  } catch (err) {
    console.error("Ошибка загрузки профиля или избранных:", err);
  }

  if (!profile) return <p>Ошибка загрузки профиля</p>;

  return (
    <div className={sass.profile}>
      <div className={sass.card}>
        <div className={sass.avatarWrapper}>
          {profile.avatar ? (
            <Image
              src={profile.avatar}
              alt={profile.userName}
              width={120}
              height={120}
              className={sass.avatar}
            />
          ) : (
            <div className={sass.placeholder}>👤</div>
          )}
        </div>

        <h2 className={sass.userName}>{profile.userName}</h2>
        <p className={sass.email}>{profile.email}</p>

        <span
          className={`${sass.role} ${profile.isAdmin ? sass.admin : sass.user}`}
        >
          {profile.isAdmin ? "Администратор" : "Пользователь"}
        </span>
      </div>

      {!profile.isAdmin ? (
        <div className={sass.adminPanel}>
          <h3>Панель администратора</h3>
          <p>
            Здесь будут функции управления котами, пользователями и контентом.
          </p>
          <Link href={"/admin"} className={sass.btn}>
            Перейти в админ-панель
          </Link>
        </div>
      ) : (
        <div className={sass.favorites}>
          <h3>Избранные коты</h3>
          {favorites.length > 0 ? (
            <div className={sass.cards}>
              {favorites.map((cat) => (
                <CatsCard token={token} key={cat.id} cat={cat} />
              ))}
            </div>
          ) : (
            <p className={sass.empty}>У вас нет избранных котов 🐾</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Profile;
