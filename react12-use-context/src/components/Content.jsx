import React from "react";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { SimpleContext } from "../../src-01기본/context/SimpleContext";

const Content = () => {
  const { isDark } = useContext(ThemeContext);
  const userMessage = useContext(SimpleContext);

  return (
    <div className="content"
      style={{
        backgroundColor : isDark ? 'black' : 'lightgray',
        color : isDark ? 'white' : 'black',
      }}>
        <h1>{userMessage}</h1>
    </div>
  );
}

export default Content;