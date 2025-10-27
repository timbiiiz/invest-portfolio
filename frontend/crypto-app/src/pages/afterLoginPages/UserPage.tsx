import { useEffect, useState } from "react";
import { VerifyHeader } from "../../components/header/VerifyHeader";
import {
  deleteUser,
  fetchCurrentUser,
  logout,
  updateUser,
  type AuthResponse,
} from "../../api/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function UserPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<AuthResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCurrentUser()
      .then((data) => setUser(data))
      .catch(() => toast.error("Failed to fetch user data"))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user) return;
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!user) return;

    // 空文字は送らない（部分更新対応）
    const payload: Partial<AuthResponse> = {};
    if (user.username?.trim()) payload.username = user.username.trim();
    if (user.email?.trim()) payload.email = user.email.trim();
    if (user.password?.trim()) payload.password = user.password.trim();

    try {
      await updateUser(user);
      toast.success("Profile updated successfully! redirect to login page");
      setTimeout(() => {
        logout();
        navigate("/login");
      }, 1500);
    } catch (err) {
      console.log(err);
      toast.error("Failed to update profile");
    }
  };

  const handleDelete = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    )
      return;
    try {
      await deleteUser();
      toast.success("Your account has been deleted.");
      // ログアウト&トークン削除など
      localStorage.removeItem("token");
      navigate("/login");
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete account");
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!user)
    return <div className="text-center mt-10">No user data found.</div>;

  return (
    <>
      <VerifyHeader />
      <div className="pt-18" />
      <div className="max-w-xl mx-auto mt-16 p-6 bg-white shadow-lg rounded-2xl">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          My account
        </h1>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-600 mb-1">Username</label>
            <input
              name="username"
              value={user.username}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-orange-300"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              name="email"
              value={user.email}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-orange-300"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Password</label>
            <input
              name="password"
              type="password"
              value={user.password || ""}
              onChange={handleChange}
              placeholder="Leave blank to keep current password"
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-orange-300"
            />
          </div>
        </div>

        <div className="flex justify-center items-center gap-3">
          <button
            onClick={handleSave}
            className="w-20 text-white py-2 rounded-lg bg-orange-500  hover:bg-orange-600 transition-colors mt-10"
          >
            Save
          </button>
          <div
            onClick={handleDelete}
            className="absolute bottom-10 right-10 w-40 py-2  hover:text-red-600 hover:cursor-pointer"
          >
            Delete Account
          </div>
        </div>
      </div>
    </>
  );
}
