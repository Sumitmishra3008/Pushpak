import React, { createContext, useState } from "react";
export const Userdatacontext = createContext();

const Usercontext = ({ children }) => {
  const [user, setUser] = useState({
    email: "",
    fullname: {
      firstname: "",
      lastname: "",
    },
  });
  return (
    <Userdatacontext.Provider value={{ user, setUser }}>
      {children}
    </Userdatacontext.Provider>
  );
};

export default Usercontext;
