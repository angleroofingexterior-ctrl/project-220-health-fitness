import React from "react";
import ReactDOM from "react-dom/client";
import Project220TestingApp from "./project220-testing-app";
import "../app/globals.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Project220TestingApp />
  </React.StrictMode>,
);

// Remove older cached prototypes so testers always receive the current build.
if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    const registrations = await navigator.serviceWorker.getRegistrations();
    await Promise.all(registrations.map((registration) => registration.unregister()));
    if ("caches" in window) {
      const names = await caches.keys();
      await Promise.all(names.map((name) => caches.delete(name)));
    }
  });
}
