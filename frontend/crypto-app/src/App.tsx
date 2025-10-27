import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/landing/LoginPage";
import { SignupPage } from "./pages/landing/SignupPage";
import { WelcomePage } from "./pages/landing/WelcomePage";
import "./index.css";
import { WelcomeAssetPage } from "./pages/landing/WelcomeAssetPage";
import { AboutPage } from "./pages/landing/AboutPage";
import { ContactPage } from "./pages/landing/ContactPage";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { StockList } from "./pages/afterLoginPages/StockList";
import { ToastContainer } from "react-toastify";
import { UserPage } from "./pages/afterLoginPages/UserPage";
import { MyAssetPage } from "./pages/afterLoginPages/MyAssetPage";
import { UserContactPage } from "./pages/afterLoginPages/UserContactPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<WelcomePage />} />
        <Route path="/welcome-assets" element={<WelcomeAssetPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* 以下ログイン時のみ遷移可能ページ */}
        <Route element={<ProtectedRoute />}>
          <Route path="/stocklist" element={<StockList />} />
          <Route path="/myasset" element={<MyAssetPage />} />
          <Route path="/usercontact" element={<UserContactPage />} />
          <Route path="/userpage" element={<UserPage />} />
        </Route>
      </Routes>
      {/* toastのui */}
      <ToastContainer
        position="top-right"
        autoClose={500} // 0.5秒で自動消去
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
      />
    </>
  );
}

export default App;
