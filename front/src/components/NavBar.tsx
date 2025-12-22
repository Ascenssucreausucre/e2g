import { Link, useNavigate } from "react-router-dom";
import { useSession } from "../hooks/useSession";
import { useLogout } from "../hooks/useLogout";

export default function NavBar() {
  const navigate = useNavigate();
  const { data } = useSession();
  const { mutate: logoutMutate } = useLogout();

  return (
    <nav className="fixed flex items-center top-0 left-0 bg-pink-950 w-full px-10 py-2 gap-4">
      <p className="text-3xl font-bold">eren yeeeega</p>
      <Link to={"/"}>Home</Link>
      <Link to={"/play"}>Chapters</Link>
      <Link
        className="ml-auto bg-pink-300 text-black py-2 px-4 rounded-xl"
        to={"/login"}
      >
        Login
      </Link>
      {data && (
        <button
          className="ml-auto border-pink-200 border"
          onClick={() => {
            logoutMutate();
            return navigate("/");
          }}
        >
          Disconnect
        </button>
      )}
    </nav>
  );
}
