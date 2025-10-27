import { authApi, getToken } from "./auth";

export async function fetchStocks(
  exchange: string,
  page: number,
  size: number
) {
  const res = await fetch(
    `${authApi}/stocks?exchange=${exchange}&page=${page}&size=${size}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
    }
  );
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${await res.text()}`);
  }
  return res.json();
}

export interface SymbolItem {
  symbol: string;
  description: string;
  displaySymbol: string;
  mic: string;
}

export interface StockHolding {
  id: number;
  symbol: string;
  quantity: number;
  price: number;
}

export interface UserAsset {
  id: number;
  username: string;
  cash: number;
  stockHoldings: StockHolding[];
}

// finnhubAPI free plan allowed only us stocks.
export const exchanges = [
  { name: "US", label: "US" },
  { name: "Tokyo", label: "Tokyo" },
  { name: "Toronto", label: "Toronto" },
  { name: "HongKong", label: "HongKong" },
];
