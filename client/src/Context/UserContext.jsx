import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const value = {
    auth,
    user,
    loading,
    error,
    setAuth,
    setUser,
    setLoading,
    setError,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
