import React, { createContext, useState } from "react";
export const Context = createContext(null);
export const ContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [userToken, setUserToken] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const value = {
    token,
    setToken,
    userToken,
    setUserToken,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
