import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function DefaultLayout() {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main className="mt-15 flex justify-center">
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
}
