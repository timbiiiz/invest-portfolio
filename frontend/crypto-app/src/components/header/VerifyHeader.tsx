import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { fetchCurrentUser, logout, type AuthResponse } from "../../api/auth";
import { toast } from "react-toastify";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

export function VerifyHeader() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<AuthResponse | null>(null);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    fetchCurrentUser()
      .then((fetchedUser) => setUser(fetchedUser))
      .catch(() => setUser(null));
  }, []);

  const handleLogout = async () => {
    if (!user) return;
    try {
      logout();
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error("Logout function failed. contact to our team.");
      setTimeout(() => {
        logout();
        navigate("/usercontact");
      }, 1500);
    }
  };

  return (
    <header className="bg-white fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex item-center justify-between">
        <div className="text-2xl font-bold text-black-800">Black Bloc</div>

        <nav className="hidden md:flex space-x-10 mt-2 text-black font-medium">
          <NavLink
            to="/stocklist"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} // クリックされたらページ先頭に遷移
            className={({ isActive }) =>
              isActive
                ? "text-orange-600 font-semibold"
                : "hover:text-orange-500"
            }
          >
            Stocks
          </NavLink>
          <NavLink
            to="/myasset"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={({ isActive }) =>
              isActive
                ? "text-orange-600 font-semibold"
                : "hover:text-orange-500"
            }
          >
            My Assets
          </NavLink>
          <NavLink
            to="/usercontact"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="hover:text-orange-500 transition-colors"
          >
            Contact
          </NavLink>
        </nav>
        <div className="hidden md:flex items-center space-x-6">
          {user ? (
            <NavLink
              to="/userpage"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="hover:text-orange-500 transition-colors"
            >
              {user.username}
            </NavLink>
          ) : (
            <span className="text-gray-500 cursor-not-allowed">Guest</span>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-x-1 w-20 text-white text-sm py-1 rounded-lg bg-orange-500  hover:bg-orange-600 transition-colors justify-center"
          >
            Logout
            <PowerSettingsNewIcon fontSize="small" />
          </button>
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
              to="/stocklist"
              onClick={() => {
                closeMenu();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="hover:text-orange-500"
            >
              Stocks
            </NavLink>
            <NavLink
              to="/myasset"
              onClick={() => {
                closeMenu();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="hover:text-orange-500"
            >
              My Assets
            </NavLink>
            <NavLink
              to="/usercontact"
              onClick={() => {
                closeMenu();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="hover:text-orange-500 transition-colors"
            >
              Contact
            </NavLink>

            <div className="w-full border-t pt-6 mt-10 flex flex-col items-center space-y-2">
              {user ? (
                <NavLink
                  to="/userpage"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="hover:text-orange-500 transition-colors"
                >
                  {user.username}
                </NavLink>
              ) : (
                <span className="text-gray-500 cursor-not-allowed">Guest</span>
              )}
              <button
                onClick={handleLogout}
                className="flex items-center gap-x-1 w-20 text-white text-sm py-1 rounded-lg bg-orange-500  hover:bg-orange-600 transition-colors justify-center"
              >
                Logout
                <PowerSettingsNewIcon fontSize="small" />
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
