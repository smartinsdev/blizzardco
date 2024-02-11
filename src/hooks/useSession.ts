import { getSession } from "@/actions/getSession";
import { useEffect, useState } from "react";

type User = {
  username: string;
};

export function useSession() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getSession().then((value) => {
      if (!value) setUser(null);
      setUser({ username: value! });
    });
  }, []);

  return { user };
}
