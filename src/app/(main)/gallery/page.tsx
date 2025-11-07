import API_BASE_URL from "@/config/api";
import Gallery from "@/src/components/page/gallery/Gallery";
import { CheckAuth } from "@/src/components/utils/check/CheckAuth";

interface Cat {
  id: string;
  name: string;
  color: string;
  age: number;
  paws: number;
  price: number;
  image: string;
}

const page = async () => {
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

  const data: { cats: Cat[] } = await res.json();

  return <Gallery cats={data.cats} />;
};

export default page;
