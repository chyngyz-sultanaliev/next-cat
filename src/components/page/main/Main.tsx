import API_BASE_URL from "@/config/api";
import Cats from "./cats/Cats";
import { CheckAuth } from "../../utils/check/CheckAuth";


const Main = async () => {
  const token = await CheckAuth();

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
  return <Cats cats={cats} token={token} />;
};

export default Main;
