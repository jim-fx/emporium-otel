"use client";

import { useEffect } from "react";
import { getCookie, setCookie } from "../lib/clientCookies";
import { generateRandomUser } from "../lib/user";

export function UserInitializer() {
  useEffect(() => {
    const userId = getCookie("userId");
    const username = getCookie("username");

    if (!userId || !username) {
      const newUser = generateRandomUser();
      setCookie("userId", newUser.userId);
      setCookie("username", newUser.username);
    }
  }, []);

  return null;
}
