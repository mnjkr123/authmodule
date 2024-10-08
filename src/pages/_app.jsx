import AOS from "aos";
import "aos/dist/aos.css";
import "@/src/styles/index.css";
import store from "../redux/strore";
import { Provider } from "react-redux";
import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "../context/AuthContext";

if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap");
}

export default function App({ Component, pageProps }) {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Provider store={store}>
      <AuthProvider>
        <Component {...pageProps} />
        <ToastContainer />
      </AuthProvider>
    </Provider>
  );
}
