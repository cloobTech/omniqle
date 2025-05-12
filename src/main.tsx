import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "./index.css";
import App from "./App.tsx";
import { store, persistor } from "./context/store.ts";
import { theme } from "./theme";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MantineProvider withCssVariables theme={theme}>
          <App />
        </MantineProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);
