import API_BASE_URL from "@/config/api";
import Admin from "@/src/components/page/admin/Admin";
import { CheckAuth } from "@/src/components/utils/check/CheckAuth";

export default async function Page() {
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
  return <Admin token={token} cats={cats}/>;
}
