import { Link } from "react-router-dom";
import { useSession } from "../hooks/useSession";
import { useLogout } from "../hooks/useLogout";

export default function NavBar() {
  const { data } = useSession();
  const { mutate: logout } = useLogout();

  return (
    <nav className="fixed flex items-center top-0 left-0 bg-pink-950 w-full px-10 py-2 gap-4">
      <p className="text-3xl font-bold">eren yeeeega</p>
      <Link to={"/"}>Home</Link>
      <Link to={"/game"}>Chapters</Link>
      {data?.user ? (
        <button
          className="ml-auto border-pink-200 border"
          onClick={() => {
            logout();
          }}
        >
          Disconnect
        </button>
      ) : (
        <Link
          className="ml-auto bg-pink-300 text-black py-2 px-4 rounded-xl"
          to={"/login"}
        >
          Login
        </Link>
      )}
    </nav>
  );
}
