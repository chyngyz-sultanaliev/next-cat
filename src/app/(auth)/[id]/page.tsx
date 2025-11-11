import API_BASE_URL from '@/config/api';
import Update from '@/src/components/page/update/Update';
import { CheckAuth } from '@/src/components/utils/check/CheckAuth';

const page =  async () => {
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
    return <Update token={token} cats={cats}/>
};

export default page;