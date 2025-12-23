import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/UI/Input";
import { useLogin } from "../hooks/useLogin";

export default function Home() {
  const [credentials, setCredentials] = useState<{
    userName: string;
    password: string;
    email: string;
  }>({
    userName: "",
    password: "",
    email: "",
  });

  const { mutate } = useLogin();
  const navigate = useNavigate();

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { userName, email, password } = credentials;
    if (
      userName.trim().length < 1 ||
      email.trim().length < 1 ||
      password.length < 1
    ) {
      alert("Please fill in all fields");
      return;
    }
    const res = await fetch(
      `${
        import.meta.env.VITE_API_URL || "http://localhost:3001"
      }/users/register`,
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, email, password }),
      }
    );

    if (!res.ok) {
      alert("Registration failed");
      return;
    }

    mutate({ email, password });

    return navigate("/game");
  };

  return (
    <div className="home w-1/2 max-w-lg min-w-50">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 bg-slate-600 p-4 rounded-md"
      >
        <Input
          id="username"
          type="text"
          value={credentials?.userName || ""}
          onChange={handleChange}
          label="Username"
          placeholder="Enter your username"
          name="userName"
        />
        <Input
          id="email"
          type="email"
          value={credentials?.email || ""}
          onChange={handleChange}
          label="Email"
          placeholder="Enter your email"
          name="email"
        />
        <Input
          id="password"
          type="password"
          value={credentials?.password || ""}
          onChange={handleChange}
          label="Password"
          placeholder="Enter your password"
          name="password"
        />
        <button
          type="submit"
          className="rounded-4xl bg-pink-400 font-black text-amber-50 px-3 py-1.5 text-2xl"
        >
          Play
        </button>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
