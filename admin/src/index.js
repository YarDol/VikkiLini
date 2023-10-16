import React, { Suspense } from "react";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { createRoot } from 'react-dom/client';
import Spinner from "./utility/spinner";

const root = createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Suspense fallback={<div><Spinner/></div>}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Suspense>
    </PersistGate>
  </Provider>
);