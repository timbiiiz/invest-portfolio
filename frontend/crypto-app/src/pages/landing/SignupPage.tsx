import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../api/auth";
import { toast } from "react-toastify";
import { WelcomePageHeader } from "../../components/header/WelcomePageheader";

export function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const result = await registerUser(username, email, password);

      if (!result) {
        toast.error("Registration failed");
        return;
      }

      toast.success("Account created successfully");
      setTimeout(() => navigate("/login"), 1000);
    } catch (error) {
      console.error(error);
      toast.error("Failed to create account");
    }
  };

  return (
    <>
      <WelcomePageHeader />
      <div className="pt-18" />
      <div className="max-w-md mx-auto mt-20 p-10 shadow-lg rounded">
        <h1 className="text-2xl font-bold text-center mb-10">Sign up</h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border rounded mb-5"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          onClick={handleSignup}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Sign up
        </button>
        <div className="flex justify justify-center text-sm gap-3">
          <p>if you have an account</p>
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </div>
      </div>
    </>
  );
}
