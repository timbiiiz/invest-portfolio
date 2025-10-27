import axios from "axios";

export const authApi = "http://localhost:8080/api";

// localStorageにjwt保存・削除
export const saveToken = (token: string) =>
  localStorage.setItem("accessToken", token);
export const getToken = () => localStorage.getItem("accessToken");
export const logout = () => localStorage.removeItem("accessToken");

export const api = axios.create({
  baseURL: authApi,
});

// リクエスト時: ヘッダーにトークン付与
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// レスポンス時: トークン有効期限切れを検知
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("Token Valid");
      logout();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// バックエンド側で指定しているresponseをフロントで使うためのツール
export type AuthResponse = {
  id: number;
  username: string;
  email: string;
  password?: string;
};

// サインアップ
export const registerUser = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    const res = await api.post("/auth/register", {
      username,
      email,
      password,
    });
    return res.data;
  } catch (err) {
    console.error("Registration failed:", err);
    throw err;
  }
};

// ログイン
export const loginUser = async (usernameOrEmail: string, password: string) => {
  try {
    const res = await api.post("/auth/login", {
      usernameOrEmail,
      password,
    });

    saveToken(res.data.token);
    return res.data;
  } catch (err) {
    console.error("Login failed:", err);
    throw err;
  }
};

// 現在ログイン中のユーザ情報取得
export const fetchCurrentUser = async () => {
  try {
    const token = getToken();
    const res = await api.get("/user/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    console.error("Fetch current user failed:", err);
    throw err;
  }
};

// ユーザ更新
export const updateUser = async (userData: {
  username: string;
  email: string;
  password?: string;
}) => {
  const res = await api.put("/user/update", userData);
  return res.data;
};

// アカウント削除
export const deleteUser = async () => {
  const res = await api.delete("/user/delete");
  logout();
  return res.data;
};
