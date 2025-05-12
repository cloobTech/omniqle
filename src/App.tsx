import React from "react";
import { RouterProvider } from "react-router-dom";
import { routers } from "./router/router";

const App: React.FC = () => {
  return (
    <>
      <RouterProvider router={routers} />
    </>
  );
};

export default App;
