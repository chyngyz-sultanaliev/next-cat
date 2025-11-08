import Login from "@/src/components/page/auth/login/Login";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function page() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (token) redirect("/");

  return <Login />;
}

export default page;
