import API_BASE_URL from "@/config/api";
import sass from "./Profile.module.scss";
import Image from "next/image";
import {CheckAuth} from "../../utils/check/CheckAuth";

interface UserProfile {
  userName: string;
  email: string;
  avatar?: string;
}

async function Profile() {
  const token = await CheckAuth();
  let data: UserProfile | null = null;

  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const json = await res.json();
    data = json.user;
  } catch (err) {
    console.error("Ошибка загрузки профиля:", err);
  }
  

  return (
    <div className={sass.profile}>
      <div className={sass.card}>
        <div className={sass.avatarWrapper}>
          {data?.avatar ? (
            <Image
              src={data.avatar}
              alt={data.userName}
              width={120}
              height={120}
              className={sass.avatar}
            />
          ) : (
            <div className={sass.placeholder}>👤</div>
          )}
        </div>

        <h2 className={sass.userName}>{data?.userName}</h2>
        <p className={sass.email}>{data?.email}</p>
      </div>
    </div>
  );
}

export default Profile;
