import { useEffect, useMemo, useState } from "react";
import { fetchStocks, type SymbolItem } from "../../api/stocks";
import { VerifyHeader } from "../../components/header/VerifyHeader";

export function StockList() {
  const [symbols, setSymbols] = useState<SymbolItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [exchange, setExchange] = useState("US");
  const [page, setPage] = useState(0);
  const size = 100;

  useEffect(() => {
    setLoading(true);
    setError("");

    fetchStocks(exchange, page, size)
      .then(setSymbols)
      .catch((e) => setError(String(e)))
      .finally(() => setLoading(false));
  }, [exchange, page, size]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return symbols.filter(
      (s) =>
        s.symbol.toLowerCase().includes(q) ||
        s.description?.toLowerCase().includes(q)
    );
  }, [symbols, query]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">error: {error}</div>;

  return (
    <>
      <VerifyHeader />
      <div className="pt-18" />
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">
          eStocks List ({exchange})
        </h1>

        <div className="flex gap-3 mb-4">
          <input
            type="text"
            placeholder="Search with symbol or company name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border p-2 rounded-lg w-full"
          />
          <select
            value={exchange}
            onChange={(e) => {
              setExchange(e.target.value);
              setPage(0); // 取引所切替でページリセット
            }}
            className="border p-2 rounded-lg"
          >
            <option value="US">US</option>
            <option value="TO">Toronto (Canada)</option>
            <option value="HK">Hong Kong</option>
            <option value="T">Tokyo</option>
          </select>
        </div>

        {loading && <div>Loading...</div>}
        {error && <div className="text-red-500">error: {error}</div>}

        <ul className="divide-y border-b rounded-xl shadow-sm">
          {filtered.map((s) => (
            <li
              key={s.symbol}
              className="p-3 flex justify-between hover:bg-gray-50 hover:cursor-pointer transition"
            >
              <div>
                <div className="font-medium">{s.symbol}</div>
                <div className="text-sm text-gray-600">
                  {s.description || "-"}
                </div>
              </div>
              <div className="text-sm text-gray-500">{s.mic}</div>
            </li>
          ))}
        </ul>

        <div className="flex justify-between mt-4">
          <button
            disabled={page === 0}
            onClick={() => setPage((p) => Math.max(p - 1, 0))}
            className="px-4 py-1 border font-semibold rounded-lg disabled:opacity-50"
          >
            Previous Page
          </button>
          <span>page {page + 1}</span>
          <button
            disabled={symbols.length < size} // 最後のページ
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-1 border font-semibold rounded-lg disabled:opacity-50"
          >
            Next Page
          </button>
        </div>
      </div>
    </>
  );
}
