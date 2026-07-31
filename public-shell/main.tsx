import React from "react";
import ReactDOM from "react-dom/client";
import Project220Demo from "./project220-demo";
import "../app/globals.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Project220Demo />
  </React.StrictMode>,
);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {
      // The app remains usable online when service-worker registration is unavailable.
    });
  });
}
