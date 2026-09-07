// src/hooks/useUser.js
import { useState } from 'react';
import { getUser, setUser as saveUser, clearUser } from '../lib/storage';

export function useUser() {
  const [user, setUserState] = useState(() => getUser());

  function login(name, email) {
    const newUser = { name, email };
    saveUser(newUser);
    setUserState(newUser);
  }

  function logout() {
    clearUser();
    setUserState(null);
  }

  return { user, login, logout };
}