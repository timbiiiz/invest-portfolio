import { useState } from "react";
import { WelcomePageHeader } from "../../components/header/WelcomePageheader";
import { toast } from "react-toastify";
import { loginUser } from "../../api/auth";
import { Link, useNavigate } from "react-router-dom";

export function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const data = await loginUser(identifier, password);

      if (!data?.token) {
        toast.error("Invalid access");
        return;
      }
      toast.success("Login successful");
      navigate("/userpage");
    } catch (error) {
      console.error(error);
      toast.error("Login Failed");
    }
  };

  return (
    <>
      <WelcomePageHeader />
      <div className="pt-18" />
      <div className="max-w-md mx-auto mt-30 p-10 shadow-lg rounded">
        <h1 className="text-2xl font-bold text-center mb-10">Login</h1>

        <input
          type="text"
          placeholder="Username or Email"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          className="w-full p-2 border rounded mb-5"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded mb-10"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-orange-400 text-white py-2 rounded hover:bg-orange-500"
        >
          Log in
        </button>
        <div className="flex justify justify-center text-sm gap-3">
          <p className="">Create account</p>
          <Link to="/signup" className="text-blue-600">
            Sign Up
          </Link>
        </div>
      </div>
    </>
  );
}
