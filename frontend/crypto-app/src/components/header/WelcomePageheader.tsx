import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export function WelcomePageHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="bg-white fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex item-center justify-between">
        <Link
          to="/"
          onClick={() => {
            closeMenu();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="text-2xl font-bold text-black-800"
        >
          Black Bloc
        </Link>

        <nav className="hidden md:flex space-x-10 mt-2 text-black font-medium">
          <NavLink
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} // クリックされたらページ先頭に遷移
            className={({ isActive }) =>
              isActive
                ? "text-orange-600 font-semibold"
                : "hover:text-orange-500"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/welcome-assets"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={({ isActive }) =>
              isActive
                ? "text-orange-600 font-semibold"
                : "hover:text-orange-500"
            }
          >
            Assets
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="hover:text-orange-500 transition-colors"
          >
            About eStock
          </NavLink>
          <NavLink
            to="/contact"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="hover:text-orange-500 transition-colors"
          >
            Contact
          </NavLink>
        </nav>

        <div className="hidden md:flex items-center space-x-6">
          <Link
            to="/login"
            className="text-gray-700 hover:text-orange-500 font-medium"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-black text-white px-2 py-1.5 rounded-lg hover:bg-orange-400 transition"
          >
            Sign up
          </Link>
        </div>

        {/* モバイルハンバーガー */}
        <button
          className="md:hidden text-grey-700 hover:cursor-pointer"
          onClick={toggleMenu}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* モバイルメニュー */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t">
          <nav className="flex flex-col items-center py-7 space-y-5 text-grey-700 font-medium">
            <NavLink
              to="/"
              onClick={() => {
                closeMenu();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="hover:text-orange-500"
            >
              Home
            </NavLink>
            <NavLink
              to="/welcome-assets"
              onClick={() => {
                closeMenu();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="hover:text-orange-500"
            >
              Assets
            </NavLink>
            <NavLink
              to="/about"
              onClick={() => {
                closeMenu();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="hover:text-orange-500 transition-colors"
            >
              About eStock
            </NavLink>
            <NavLink
              to="/contact"
              onClick={() => {
                closeMenu();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="hover:text-orange-500 transition-colors"
            >
              Contact
            </NavLink>

            <div className="w-full border-t pt-6 mt-10 flex flex-col items-center space-y-2">
              <Link
                to="/login"
                onClick={() => {
                  closeMenu();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="text-gray-700 hover:text-orange-500"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => {
                  closeMenu();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="bg-black text-white px-2 py-1 rounded-lg hover:bg-orange-400"
              >
                Sign up
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
