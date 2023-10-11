import React, { Suspense } from "react";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import { createRoot } from 'react-dom/client';
import styled from "styled-components";
import Spinner from "./utility/spinner";

const Container = styled.div`
  overflow-x: hidden;
`;

//Localisaton
i18n
.use(HttpApi)
.use(initReactI18next) // passes i18n down to react-i18next
.use(LanguageDetector)
.init({
  supportedLngs: ['en','ua'],
  fallbackLng: "en",
  detection: {
    order: ['localStorage', 'htmlTag', 'path', 'subdomain'],
    caches: ['localStorage', 'cookie']
  },
  backend: {
   loadPath: '/assets/locales/{{lng}}/translation.json',
  },
  

});

const root = createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <Suspense fallback={<div><Spinner/></div>}>
      <Container>
        <App />
      </Container>
      </Suspense>
    </PersistGate>
  </Provider>
);