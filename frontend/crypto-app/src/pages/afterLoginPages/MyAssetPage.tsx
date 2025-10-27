import { useCallback, useEffect, useState } from "react";
import { VerifyHeader } from "../../components/header/VerifyHeader";
import type { UserAsset } from "../../api/stocks";
import { api, fetchCurrentUser } from "../../api/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function MyAssetPage() {
  const navigate = useNavigate();
  const [asset, setAsset] = useState<UserAsset | null>(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<number | null>(null);

  // ログイン中ユーザ取得
  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await fetchCurrentUser();
        setUserId(user.id);
      } catch (err) {
        console.error("Failed to fetch user", err);
        toast.error("Failed to get user data");
        navigate("/login");
      }
    };
    loadUser();
  }, [navigate]);

  // 資産取得
  const fetchAsset = useCallback(async () => {
    if (!userId) return;
    try {
      const res = await api.get(`/assets/${userId}`);
      setAsset(res.data);
    } catch (err) {
      console.error("Failed to fetch assets", err);
      toast.error("Failed to get assets data");
      navigate("/login");
    } finally {
      setLoading(false);
    }
  }, [navigate, userId]);

  useEffect(() => {
    if (userId) fetchAsset();
  }, [userId, fetchAsset]);

  // 入金
  const handleDeposit = async () => {
    const amount = parseFloat(prompt("Deposit amount") || "0");
    if (amount > 0 && userId) {
      await api.post(`/assets/${userId}/deposit`, null, { params: { amount } });
      fetchAsset();
    }
  };

  // 出金
  const handleWithdraw = async () => {
    const amount = parseFloat(prompt("Withdraw amount") || "0");
    if (amount > 0 && userId) {
      await api.post(`/assets/${userId}/withdraw`, null, {
        params: { amount },
      });
      fetchAsset();
    }
  };

  // 株追加
  const handleAddStock = async () => {
    const symbol = prompt("Stock symbol") || "";
    const quantity = parseInt(prompt("Quantity") || "0");
    const price = parseFloat(prompt("Price") || "0");

    if (symbol && quantity > 0 && price > 0 && userId) {
      await api.post(`/assets/${userId}/stocks`, { symbol, quantity, price });
      fetchAsset();
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!asset) return <div>No asset data found</div>;

  return (
    <>
      <VerifyHeader />
      <div className="pt-18" />
      <div className="p-6 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6">My Asset</h1>

        {/* 現金表示 */}
        <div className="bg-blue-100 rounded-full w-48 h-48 flex flex-col justify-center items-center mb-8 shadow-md">
          <span className="text-lg font-semibold text-gray-700">Cash</span>
          <span className="text-2xl font-bold text-blue-600">
            €{asset.cash.toFixed(2)}
          </span>
        </div>

        {/* 保有株を泡っぽく表示 */}
        <div className="flex flex-wrap gap-4 justify-center">
          {asset.stockHoldings?.map((stock) => (
            <div
              key={stock.id}
              className="bg-green-100 rounded-full w-32 h-32 flex flex-col justify-center items-center shadow-sm"
            >
              <span className="text-sm font-semibold text-gray-700">
                {stock.symbol}
              </span>
              <span className="text-md text-green-600">
                {stock.quantity} shares
              </span>
              <span className="text-sm text-gray-500">
                @{stock.price.toFixed(2)}€
              </span>
            </div>
          ))}
        </div>

        {/* 操作ボタン */}
        <div className="flex gap-4 mt-10">
          <button
            onClick={handleDeposit}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl"
          >
            Deposit
          </button>
          <button
            onClick={handleWithdraw}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl"
          >
            Withdraw
          </button>
          <button
            onClick={handleAddStock}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl"
          >
            Add Stock
          </button>
        </div>
      </div>
    </>
  );
}
