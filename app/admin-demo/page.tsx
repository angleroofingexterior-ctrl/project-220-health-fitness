"use client";

import { useMemo, useState } from "react";

type Service = {
  id: string;
  name: string;
  description: string;
  output: string[];
};

const services: Service[] = [
  { id: "pantry", name: "Pantry AI", description: "Demonstrates receipt, barcode, pantry, refrigerator and freezer analysis using sample data only.", output: ["12 inventory items recognized", "3 items nearing expiry", "2 possible duplicates", "User confirmation required before inventory changes"] },
  { id: "coach", name: "AI Wellness Coach", description: "Demonstrates general wellness reminders and private subscriber coaching.", output: ["Hydration reminder prepared", "Workout consistency suggestion prepared", "Medical and emergency disclaimer displayed", "Private coaching content hidden from administrators"] },
  { id: "basket", name: "Smart Basket Optimizer", description: "Demonstrates cost, nutrition, supplement, budget, recipe and waste optimization.", output: ["Estimated basket savings: $18.40", "4 pantry duplicates avoided", "6 recipes unlocked", "Basket remains within sample budget"] },
  { id: "cookbook", name: "Premium Cookbook", description: "Demonstrates private in-app recipes tailored to household preferences.", output: ["Family-size meal plan generated", "Kid-friendly snack options included", "Yogurt and frozen-yogurt options included", "Export, publishing and resale disabled"] },
  { id: "marketplace", name: "Marketplace AI", description: "Demonstrates unified grocery and supplement ordering workflows.", output: ["Preferred store, cheapest basket and fastest delivery options available", "Substitution approval required", "Driver food-safety checklist required", "No live payment or retailer purchase occurs in demo mode"] },
  { id: "score", name: "Smart Pantry Score", description: "Demonstrates an explainable household pantry score.", output: ["Sample score: 84/100", "Freshness: 17/20", "Meal readiness: 12/15", "Waste prevention: 8/10"] },
];

export default function AdminDemoPage() {
  const [selected, setSelected] = useState(services[0].id);
  const [events, setEvents] = useState<string[]>([]);
  const current = useMemo(() => services.find((service) => service.id === selected) ?? services[0], [selected]);

  function runDemo() {
    const timestamp = new Date().toLocaleTimeString("en-CA", { hour: "numeric", minute: "2-digit", second: "2-digit" });
    setEvents((previous) => [`${timestamp} — ${current.name} demo completed using synthetic data.`, ...previous].slice(0, 12));
  }

  return (
    <main style={{ maxWidth: 1050, margin: "0 auto", padding: 24, fontFamily: "Arial, sans-serif" }}>
      <header style={{ marginBottom: 24 }}>
        <p style={{ fontWeight: 700, color: "#b91c1c" }}>PROJECT 220 MASTER ADMIN</p>
        <h1>AI Services Demonstration Console</h1>
        <p>This console shows how each planned AI service will behave using synthetic sample data. It does not expose subscriber pantry photos, progress photos, nutrition logs, fitness data, household data or private coaching conversations.</p>
      </header>

      <section style={{ padding: 18, border: "2px solid #111", borderRadius: 12, marginBottom: 20 }}>
        <h2>Administrator privacy boundary</h2>
        <p><strong>Administrators may access:</strong> first name, last name, subscription status, billing status, delivery address, order status, support history, retailer operations, driver operations and platform analytics.</p>
        <p><strong>Administrators may not access:</strong> pantry photos, refrigerator or freezer photos, progress photos, private AI conversations, private nutrition plans, fitness goals, weight, height, household profiles, personal inventory or private progress records unless a subscriber deliberately shares specific information for support.</p>
        <p>Payment card details must remain with the payment processor. Project 220 stores only approved billing references and status information.</p>
      </section>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
        {services.map((service) => (
          <button key={service.id} onClick={() => setSelected(service.id)} style={{ padding: 16, textAlign: "left", borderRadius: 10, border: selected === service.id ? "3px solid #b91c1c" : "1px solid #888", background: selected === service.id ? "#fff1f2" : "white" }}>
            <strong>{service.name}</strong>
            <span style={{ display: "block", marginTop: 6 }}>{service.description}</span>
          </button>
        ))}
      </div>

      <section style={{ marginTop: 20, padding: 20, background: "#111", color: "white", borderRadius: 12 }}>
        <h2>{current.name}</h2>
        <p>{current.description}</p>
        <ul>{current.output.map((line) => <li key={line}>{line}</li>)}</ul>
        <button onClick={runDemo} style={{ padding: "12px 18px", borderRadius: 8, border: 0, fontWeight: 700, cursor: "pointer" }}>Run sample demonstration</button>
      </section>

      <section style={{ marginTop: 20 }}>
        <h2>Demo activity log</h2>
        {events.length ? <ul>{events.map((event) => <li key={event}>{event}</li>)}</ul> : <p>No demonstrations run yet.</p>}
      </section>

      <section style={{ marginTop: 28, padding: 18, background: "#f3f4f6", borderRadius: 12 }}>
        <h2>Important status</h2>
        <p>This page is a working administrative demonstration interface. The real AI services still require production AI providers, secure databases, private file storage, retailer and barcode data sources, payment processing, permissions, testing and deployment.</p>
      </section>
    </main>
  );
}
