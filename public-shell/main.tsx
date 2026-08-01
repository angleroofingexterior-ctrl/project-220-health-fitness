import React from "react";
import ReactDOM from "react-dom/client";
import Project220ConnectedAiDemo from "./project220-connected-ai-demo";
import "../app/globals.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Project220ConnectedAiDemo />
  </React.StrictMode>,
);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {
      // The app remains usable online when service-worker registration is unavailable.
    });
  });
}
