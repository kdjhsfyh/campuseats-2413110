import { Outlet } from "react-router";
import Header from "../components/Header.jsx";

function Layout() {
  return (
    <>
      <Header />

      <main className="container">
        <Outlet />
      </main>

      <footer className="footer">© 2026 CampusEats BICS 3301, IIUM</footer>
    </>
  );
}

export default Layout;
