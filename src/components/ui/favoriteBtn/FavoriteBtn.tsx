"use client";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import API_BASE_URL from "@/config/api";
import sass from "./FavoriteBtn.module.scss";

interface Props {
  catId: string;
  token?: string;
  isFavorite?: boolean;
}

interface FavoriteResponse {
  id: string;
  catId: string;
}

const FavoriteBtn = ({
  catId,
  token,
  isFavorite: initialFavorite = false,
}: Props) => {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);
  const [favId, setFavId] = useState<string | null>(null);

  useEffect(() => {
    const checkFavorite = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/v1/favorite`, {
          headers: { Authorization: `Bearer ${token}` },
          cache: "no-store",
        });
        const data: FavoriteResponse[] = await res.json();
        const favItem = data.find((f) => f.catId === catId);

        if (favItem) {
          setIsFavorite(true);
          setFavId(favItem.id);
        } else {
          setIsFavorite(false);
          setFavId(null);
        }
      } catch (err) {
        console.error("Ошибка проверки избранного:", err);
      }
    };
    checkFavorite();
  }, [catId, token]);
  const toggleFavorite = async () => {
    if (!token) return alert("Войдите в аккаунт ❤️");

    const previousFavorite = isFavorite;
    const previousFavId = favId;

    setIsFavorite(!isFavorite);
    if (!isFavorite) setFavId("temp");

    try {
      if (previousFavorite) {
        if (!favId) return;
        await fetch(`${API_BASE_URL}/api/v1/favorite/${favId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        setFavId(null);
      } else {
        const res = await fetch(`${API_BASE_URL}/api/v1/favorite`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ catId }),
        });
        const data: FavoriteResponse = await res.json();
        setFavId(data.id);
      }
    } catch (err) {
      console.error("Ошибка избранного:", err);
      alert("Не удалось изменить статус избранного");

      setIsFavorite(previousFavorite);
      setFavId(previousFavId);
    }
  };

  return (
    <div
      className={`${sass.icon} ${isFavorite ? sass.active : ""}`}
      onClick={toggleFavorite}
    >
      <FaHeart />
    </div>
  );
};

export default FavoriteBtn;
