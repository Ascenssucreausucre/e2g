import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [userName, setUserName] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  const gameStart = (e: FormEvent) => {
    e.preventDefault();
    if (userName && userName?.length > 0) {
      localStorage.setItem("userName", userName);
      navigate("/game");
    } else {
      setErrorMessage("You need a username in order to start.");
      return;
    }
  };
  return (
    <div className="home w-1/2 max-w-lg min-w-50">
      {errorMessage && (
        <div className="bg-red-500 text-amber-50 font-bold py-2 px-4 rounded-md">
          <p>{errorMessage}</p>
        </div>
      )}
      <form
        onSubmit={gameStart}
        className="flex flex-col gap-2 bg-slate-600 p-4 rounded-md"
      >
        <label htmlFor="username">Username</label>
        <input
          className="py-1 px-2 bg-amber-50 rounded-lg text-black"
          id="username"
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Select your username"
        />
        <button
          type="submit"
          className="rounded-4xl bg-pink-400 font-black text-amber-50 px-3 py-1.5 text-2xl"
        >
          Play
        </button>
      </form>
    </div>
  );
}
