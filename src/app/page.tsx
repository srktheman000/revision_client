import { redirect } from "next/navigation";
import { getToken, verifyToken } from "@/lib/backend/auth";
import { cookies } from "next/headers";

export default function Home() {
  const cookieStore = cookies();
  const token = getToken({ cookies: cookieStore });
  const payload = token ? verifyToken(token) : null;

  if (payload) {
    redirect("/home");
  } else {
    redirect("/login");
  }
}
