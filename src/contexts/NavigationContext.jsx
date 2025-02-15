// NavigationContext.js
import React, { createContext, useRef } from "react";

const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
  const homeRef = useRef(null);
  const aboutMeRef = useRef(null);
  const technicalRef = useRef(null);
  const servicesRef = useRef(null);
  const contactRef = useRef(null);
  

  return (
    <NavigationContext.Provider
      value={{
        home: homeRef,
        aboutMe: aboutMeRef,
        technical: technicalRef,
        services: servicesRef,
        contact: contactRef,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export default NavigationContext;