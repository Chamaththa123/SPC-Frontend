import React, { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";
import PropTypes from "prop-types";

const StateContext = createContext({
  user: null,
  token: null,
  color: "#00FF00",
  showSalesman: true,
  setUser: () => {},
  setToken: () => {},
  setShowSalesman: () => {},
});

export const ContextProvider = ({ children }) => {
  const storedUser = Cookies.get("_user");
  const [user, _setUser] = useState(storedUser ? JSON.parse(storedUser) : null);
  const [token, _setToken] = useState(Cookies.get("_auth"));
  const [color, setColor] = useState("#00FF00");
  const [showSalesman, setShowSalesman] = useState(true);

  const setToken = (token) => {
    _setToken(token);
    if (token) {
      Cookies.set("_auth", token, { expires: 0.5 });
    } else {
      Cookies.remove("_auth");
    }
  };

  const setUser = (user) => {
    _setUser(user);
    if (user) {
      Cookies.set("_user", JSON.stringify(user), { expires: 0.5 });
    } else {
      Cookies.remove("_user");
    }
  };

  return (
    <StateContext.Provider
      value={{
        user,
        token,
        color,
        showSalesman,
        setUser,
        setToken,
        setShowSalesman,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useStateContext = () => useContext(StateContext);