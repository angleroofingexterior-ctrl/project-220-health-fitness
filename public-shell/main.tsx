import React from "react";
import ReactDOM from "react-dom/client";
import Project220ConnectedAiDemo from "./project220-connected-ai-demo";
import "../app/globals.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Project220ConnectedAiDemo />
  </React.StrictMode>,
);

// Remove older cached plan-generator builds before registering this Alpha.
if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      const registrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(registrations.map((registration) => registration.unregister()));
      if ("caches" in window) {
        const names = await caches.keys();
        await Promise.all(names.map((name) => caches.delete(name)));
      }
      await navigator.serviceWorker.register("./sw.js?v=project220-v03-alpha-connected");
    } catch {
      // The online Alpha remains usable if service-worker setup is unavailable.
    }
  });
}
