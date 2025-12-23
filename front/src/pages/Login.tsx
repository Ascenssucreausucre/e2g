import { useState, type FormEvent } from "react";
import { useLogin } from "../hooks/useLogin";
import Input from "../components/UI/Input";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { mutateAsync, isPending } = useLogin();

  const [credentials, setCredentials] = useState<{
    email: string;
    password: string;
  }>({ email: "", password: "" });

  const navigate = useNavigate();

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await mutateAsync(credentials);
      return navigate("/game");
    } catch (error) {
      console.error(error);
      alert("Login failed");
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-baseline gap-4 p-10 rounded-md bg-slate-600"
      >
        <h2 className="text-xl font-bold text-center w-full">Login form</h2>
        <Input
          type="email"
          name="email"
          value={credentials.email}
          onChange={handleChange}
          label="E-mail"
        />
        <Input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          label="Password"
        />
        <button
          type="submit"
          disabled={isPending}
          className="bg-amber-500 px-4 py-2 rounded-md w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Login
        </button>
      </form>
    </div>
  );
}
