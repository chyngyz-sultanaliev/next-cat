import Admin, { Cat } from "@/src/components/page/admin/Admin";
import token from "@/config/api";

export default async function Page() {
  const res = await fetch("http://localhost:5000/api/v1/cats", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  // если API возвращает объект с массивом cats
  const cats: Cat[] = Array.isArray(data) ? data : data.cats || [];

  return <Admin initialCats={cats} />;
}
