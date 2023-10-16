import React from "react";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { createRoot } from 'react-dom/client';
import { DarkModeContextProvider } from "./context/darkModeContext";

const root = createRoot(document.getElementById('root'));

root.render(
  <DarkModeContextProvider>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
  </DarkModeContextProvider>
);