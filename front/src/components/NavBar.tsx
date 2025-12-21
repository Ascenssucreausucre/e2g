import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function NavBar() {
  const [userName, setUserName] = useState<string | null>(null);
  const [disconnectFlag, setDisconnectFlag] = useState<Boolean>(true);

  const navigate = useNavigate();

  useEffect(() => {
    const storageName = localStorage.getItem("userName");
    if (storageName) {
      setUserName(storageName);
    } else {
      setUserName(null);
    }
    console.log("refresh");
  }, [disconnectFlag]);

  const disconnect = () => {
    localStorage.removeItem("userName");
    setDisconnectFlag(!disconnectFlag);
    navigate("/");
  };

  return (
    <nav className="fixed flex items-center top-0 left-0 bg-pink-950 w-full px-10 py-2 gap-4">
      <p className="text-3xl font-bold">eren yeeeega</p>
      <Link to={"/"}>Home</Link>
      <Link to={"/play"}>Chapters</Link>
      {/* <button className="ml-auto border-pink-200 border">Sign-in</button>
      <button className="bg-pink-200 text-pink-950 border border-pink-200">
        Sign-up
      </button> */}
      {userName && userName.length > 0 && (
        <button className="ml-auto border-pink-200 border" onClick={disconnect}>
          Disconnect
        </button>
      )}
    </nav>
  );
}
