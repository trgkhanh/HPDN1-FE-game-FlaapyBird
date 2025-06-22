import React, { createContext, useContext, useState } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // user sẽ chứa telegram_id, name, v.v.

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
/// Hook để tiện sử dụng
export const useUser = () => useContext(UserContext);
