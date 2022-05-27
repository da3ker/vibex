import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App";
import GlobalStyles from "./styles/GlobalStyles";
import { BrowserRouter } from "react-router-dom";
import { store, persistor } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { AnimatePresence } from "framer-motion";
import ScrollToTop from "./components/scrollToTop";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AnimatePresence>
          <BrowserRouter>
            <ScrollToTop />
            <GlobalStyles />
            <App />
          </BrowserRouter>
        </AnimatePresence>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
