import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux"; // Import Provider from react-redux
import store, { persistor } from "./State/Store"; // Import the Redux store
import { PersistGate } from "redux-persist/integration/react";
import "./index.css";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
// Import Pages
import App from "./App";

// Render the app with Redux Provider and RouterProvider
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

serviceWorkerRegistration.register();
