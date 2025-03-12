import "@mantine/core/styles.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import { MantineProvider } from "@mantine/core";

import store from "./redux/store.ts";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </MantineProvider>
  </StrictMode>
);
