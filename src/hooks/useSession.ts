// import { getSession } from "@/actions/getSession"
import { getSession } from "@/lib/auth";
import { useEffect, useState } from "react";

type User = {
  username: string;
};

export function useSession() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    //  getSession().then(data => )
  }, []);

  return { user };
}
