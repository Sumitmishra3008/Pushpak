import React, { createContext, useState } from "react";
import { email } from "zod/v4";

export const CaptainDataContext = createContext();

const CaptainContext = ({ children }) => {
  const [captainData, setCaptainData] = useState({
    email: "",
    fullname: {
      firstname: "",
      lastname: "",
    },
    vehicle: {
      vehicletype: "",
      vehiclecapacity: "",
      vehiclebrand: "",
      vehiclemodel: "",
      vehiclenumber: "",
      vehiclecolor: "",
    },
  });

  return (
    <CaptainDataContext.Provider value={{ captainData, setCaptainData }}>
      {children}
    </CaptainDataContext.Provider>
  );
};

export default CaptainContext;
