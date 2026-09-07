// src/hooks/useUser.js
import { useState, useEffect } from 'react';
import { getUser, setUser as saveUser, clearUser } from '../lib/storage';
export function useUser() {
 const [user, setUserState] = useState(null);
 useEffect(() => {
 setUserState(getUser());
 }, []);
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