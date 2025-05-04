import React from "react";
import { MantineProvider } from "@mantine/core";
import { RouterProvider } from "react-router";
import { routers } from "./router/router";

const App: React.FC = () => {
  return (
    <>
      <MantineProvider>
        <RouterProvider router={routers} />
      </MantineProvider>
    </>
  );
};

export default App;
