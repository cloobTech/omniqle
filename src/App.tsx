import { MantineProvider } from "@mantine/core";
import { RouterProvider } from "react-router";
import { routers } from "./router/router";

function App() {
  return (
    <>
      <MantineProvider>
        <RouterProvider router={routers} />
      </MantineProvider>
    </>
  );
}

export default App;
