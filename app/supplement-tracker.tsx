"use client";

import { useEffect, useMemo, useState } from "react";
import {
  calculateSupplementNutrition,
  type SupplementProduct,
} from "./supplement-engine";
import {
  addSupplementEntry,
  calculateSupplementTotalsForDate,
  loadSupplementStore,
  removeSupplementEntry,
  saveSupplementStore,
  type SupplementStoreSnapshot,
} from "./supplement-store";

function formatNumber(value: number, maximumFractionDigits = 1) {
  return new Intl.NumberFormat("en-CA", { maximumFractionDigits }).format(value);
}

export default function SupplementTracker() {
  const [store, setStore] = useState<SupplementStoreSnapshot | null>(null);
  const [productId, setProductId] = useState("");
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const loaded = loadSupplementStore();
    setStore(loaded);
    setProductId(loaded.products[0]?.id ?? "");
  }, []);

  useEffect(() => {
    if (store) saveSupplementStore(store);
  }, [store]);

  const selectedProduct = useMemo(
    () => store?.products.find((product) => product.id === productId),
    [store, productId],
  );

  const preview = useMemo(() => {
    if (!selectedProduct) return null;
    const parsed = Number(amount);
    if (!Number.isFinite(parsed) || parsed <= 0) return null;
    return calculateSupplementNutrition(
      selectedProduct,
      parsed,
      selectedProduct.referenceUnit,
    );
  }, [amount, selectedProduct]);

  const totals = useMemo(
    () => (store ? calculateSupplementTotalsForDate(store) : null),
    [store],
  );

  const todayEntries = useMemo(() => {
    if (!store) return [];
    const today = new Date();
    return store.entries
      .filter((entry) => {
        const date = new Date(entry.takenAt);
        return date.toDateString() === today.toDateString();
      })
      .sort((a, b) => b.takenAt.localeCompare(a.takenAt));
  }, [store]);

  function productForEntry(productIdToFind: string): SupplementProduct | undefined {
    return store?.products.find((product) => product.id === productIdToFind);
  }

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!store || !selectedProduct) return;

    try {
      setStore(
        addSupplementEntry(store, {
          productId: selectedProduct.id,
          amount: Number(amount),
          unit: selectedProduct.referenceUnit,
          notes,
        }),
      );
      setAmount("");
      setNotes("");
      setError("");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to save supplement.");
    }
  }

  if (!store || !totals) {
    return <p aria-live="polite">Loading supplements…</p>;
  }

  return (
    <section aria-labelledby="supplement-tracker-title">
      <div>
        <p>Build 0.2</p>
        <h2 id="supplement-tracker-title">Exact-quantity supplement tracker</h2>
        <p>
          Log the exact grams, scoops, capsules, tablets, or millilitres listed for
          each product. Calories and nutrients are added automatically.
        </p>
      </div>

      <div className="dashboard-grid">
        <article><strong>{formatNumber(totals.calories, 0)}</strong><span>Calories</span></article>
        <article><strong>{formatNumber(totals.proteinG)} g</strong><span>Protein</span></article>
        <article><strong>{formatNumber(totals.carbsG)} g</strong><span>Carbohydrates</span></article>
        <article><strong>{formatNumber(totals.fatG)} g</strong><span>Fat</span></article>
        <article><strong>{formatNumber(totals.creatineMg / 1000, 2)} g</strong><span>Creatine</span></article>
        <article><strong>{formatNumber(totals.caffeineMg, 0)} mg</strong><span>Caffeine</span></article>
      </div>

      <form onSubmit={submit}>
        <label>
          Supplement
          <select value={productId} onChange={(event) => setProductId(event.target.value)}>
            {store.products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.brand} — {product.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Amount {selectedProduct ? `(${selectedProduct.referenceUnit})` : ""}
          <input
            inputMode="decimal"
            min="0"
            step="any"
            type="number"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            placeholder={selectedProduct ? String(selectedProduct.referenceAmount) : "0"}
            required
          />
        </label>

        <label>
          Notes (optional)
          <input
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="After workout, mixed with milk…"
          />
        </label>

        {preview ? (
          <p aria-live="polite">
            This entry adds {formatNumber(preview.calories, 0)} calories and {formatNumber(preview.proteinG)} g protein.
          </p>
        ) : null}

        {error ? <p role="alert">{error}</p> : null}
        <button type="submit">Log supplement</button>
      </form>

      <div>
        <h3>Today's supplement log</h3>
        {todayEntries.length === 0 ? (
          <p>No supplements logged today.</p>
        ) : (
          <ul>
            {todayEntries.map((entry) => {
              const product = productForEntry(entry.productId);
              return (
                <li key={entry.id}>
                  <div>
                    <strong>{product?.name ?? "Unknown supplement"}</strong>
                    <span>
                      {formatNumber(entry.amount)} {entry.unit} · {new Date(entry.takenAt).toLocaleTimeString("en-CA", { hour: "numeric", minute: "2-digit" })}
                    </span>
                    {entry.notes ? <small>{entry.notes}</small> : null}
                  </div>
                  <button
                    type="button"
                    onClick={() => setStore(removeSupplementEntry(store, entry.id))}
                    aria-label={`Remove ${product?.name ?? "supplement"}`}
                  >
                    Remove
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
