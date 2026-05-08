import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [currentState, setCurrentState] = useState("login"); //"login" ወይም"register"
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === "register") {
        // --- Sign Up Logic ---
        const response = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success("Account created!");
        } else {
          toast.error(response.data.message);
        }
      } else {
        // --- Login Logic ---
        const response = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success("Logged in successfully!");
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // ተጠቃሚው ሎግኢን ካደረገ በራሱ ወደ Home እንዲሄድ
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <form
        onSubmit={onSubmitHandler}
        className="w-[90%] sm:max-w-md bg-white p-8 rounded-lg shadow-sm border text-gray-700"
      >
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold">
            {currentState === "login" ? "Sign In" : "Create Account"}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {currentState === "login"
              ? "Welcome back, please sign in"
              : "Create your account to continue"}
          </p>
        </div>

        {/* Full Name - የምንጠቀመው በ Register ጊዜ ብቻ ነው */}
        {currentState === "register" && (
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Full Name"
            className="w-full px-3 py-2 border border-gray-300 rounded mb-4 outline-none"
            required
          />
        )}

        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          placeholder="Email address"
          className="w-full px-3 py-2 border border-gray-300 rounded mb-4 outline-none"
          required
        />

        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          placeholder="Password"
          className="w-full px-3 py-2 border border-gray-300 rounded mb-4 outline-none"
          required
        />

        <div className="w-full flex justify-between text-sm mt-[-8px] mb-4">
          <p className="cursor-pointer">Forgot your password?</p>
          {currentState === "login" ? (
            <p
              onClick={() => setCurrentState("register")}
              className="cursor-pointer text-black font-medium"
            >
              Create account
            </p>
          ) : (
            <p
              onClick={() => setCurrentState("login")}
              className="cursor-pointer text-black font-medium"
            >
              Login Here
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition"
        >
          {currentState === "login" ? "Sign In" : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default Login;
