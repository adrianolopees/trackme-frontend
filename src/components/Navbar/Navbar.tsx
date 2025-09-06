import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaCog, FaSignOutAlt, FaHome, FaMusic } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";
import type { NavbarProps, MenuItem } from "../../types/navbar.types";

const Navbar: React.FC<NavbarProps> = ({
  isAuthenticated = false,
  loading = false,
  profile = null,
  brandName = "TrackMe",
  showMenuItems = true,
  menuItems = [],
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAvatarMenuOpen, setIsAvatarMenuOpen] = useState(false);
  const avatarMenuRef = useRef<HTMLDivElement>(null);
  const { logout } = useAuth();

  // Detecta scroll para tornar navbar mais compacta
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fecha menu do avatar ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        avatarMenuRef.current &&
        !avatarMenuRef.current.contains(event.target as Node)
      ) {
        setIsAvatarMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Menu items padrão , ainda nao fiz as outras funcionalidades !
  const defaultMenuItems: MenuItem[] = [
    { label: "Home", href: "/" },
    { label: "Features", href: "/features" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const navigationItems = menuItems.length > 0 ? menuItems : defaultMenuItems;

  // Auth Buttons integrados
  const AuthButtons = () => (
    <div className="flex items-center gap-4">
      <Link to="/login">
        <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium text-sm">
          <FaUser className="w-3 h-3" />
          Login
        </button>
      </Link>
      <Link
        to="/register"
        className="bg-gray-200 text-gray-800 px-4 py-1 lg:px-6 lg:py-2 rounded-full hover:bg-gray-300 transition-colors font-medium text-sm flex items-center justify-center h-9"
      >
        Cadastre-se
      </Link>
    </div>
  );

  // Instagram-style Avatar Menu
  const AvatarMenu = () => {
    const size = isScrolled ? 36 : 40;

    return (
      <div className="relative" ref={avatarMenuRef}>
        {/* Avatar Button */}
        <button
          onClick={() => setIsAvatarMenuOpen(!isAvatarMenuOpen)}
          className="group relative focus:outline-none"
        >
          {profile?.avatar ? (
            <div className="relative">
              <img
                src={profile.avatar}
                alt="User avatar"
                className={`rounded-full object-cover transition-all duration-200 cursor-pointer ${
                  isAvatarMenuOpen
                    ? "ring-2 ring-blue-500 ring-offset-2"
                    : "group-hover:ring-2 group-hover:ring-blue-400 group-hover:ring-offset-1"
                }`}
                style={{ width: `${size}px`, height: `${size}px` }}
              />
            </div>
          ) : (
            <div
              className={`
                rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-2
                transition-all duration-200
                ${isScrolled ? "w-9 h-9" : "w-10 h-10"}
                ${
                  isAvatarMenuOpen
                    ? "ring-2 ring-blue-500 ring-offset-2 scale-105"
                    : "group-hover:scale-105 group-hover:ring-2 group-hover:ring-blue-400 group-hover:ring-offset-1"
                }
              `}
            >
              <FaUser className="w-full h-full text-white" />
            </div>
          )}
        </button>

        {/* Dropdown Menu - Instagram Style */}
        {isAvatarMenuOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
            {/* Triangle pointer */}
            <div className="absolute -top-2 right-3 w-4 h-4 bg-white border-l border-t border-gray-200 transform rotate-45"></div>

            {isAuthenticated ? (
              <>
                {/* User Info Section - Only for authenticated users */}
                <div className="px-4 py-3 border-b border-gray-100 ">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10">
                      {profile?.avatar ? (
                        <img
                          src={profile.avatar}
                          alt="User avatar"
                          className="w-full h-full rounded-full object-cover "
                        />
                      ) : (
                        <div className="w-full h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                          <FaUser className="text-white text-sm" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {profile?.username}
                      </p>
                      <p className="text-xs text-gray-500">{profile?.name}</p>
                    </div>
                  </div>
                </div>

                {/* Menu Items - Authenticated */}
                <div className="py-1">
                  <Link
                    to="/me"
                    onClick={() => setIsAvatarMenuOpen(false)}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <FaUser className="w-4 h-4 mr-3 text-gray-400" />
                    Perfil
                  </Link>

                  <Link
                    to="/"
                    onClick={() => setIsAvatarMenuOpen(false)}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors sm:hidden"
                  >
                    <FaHome className="w-4 h-4 mr-3 text-gray-400" />
                    Home
                  </Link>

                  {showMenuItems &&
                    navigationItems.map((item, index) => (
                      <Link
                        key={index}
                        to={item.href}
                        onClick={() => setIsAvatarMenuOpen(false)}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors sm:hidden"
                      >
                        <FaMusic className="w-4 h-4 mr-3 text-gray-400" />
                        {item.label}
                      </Link>
                    ))}

                  <Link
                    to="/settings"
                    onClick={() => setIsAvatarMenuOpen(false)}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <FaCog className="w-4 h-4 mr-3 text-gray-400" />
                    Configurações
                  </Link>
                </div>

                {/* Separator */}
                <div className="border-t border-gray-100 my-1"></div>

                {/* Logout */}
                <button
                  onClick={() => {
                    setIsAvatarMenuOpen(false);
                    logout();
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                >
                  <FaSignOutAlt className="w-4 h-4 mr-3 cursor-pointer" />
                  Sair
                </button>
              </>
            ) : (
              <>
                {/* Menu Items - Not authenticated */}
                <div className="py-1">
                  <Link
                    to="/"
                    onClick={() => setIsAvatarMenuOpen(false)}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <FaHome className="w-4 h-4 mr-3 text-gray-400" />
                    Home
                  </Link>

                  {showMenuItems &&
                    navigationItems.map((item, index) => (
                      <Link
                        key={index}
                        to={item.href}
                        onClick={() => setIsAvatarMenuOpen(false)}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <FaMusic className="w-4 h-4 mr-3 text-gray-400" />
                        {item.label}
                      </Link>
                    ))}
                </div>

                {/* Separator */}
                <div className="border-t border-gray-100 my-1"></div>

                {/* Auth Buttons - Not authenticated */}
                <div className="px-4 py-2 space-y-2">
                  <Link
                    to="/login"
                    onClick={() => setIsAvatarMenuOpen(false)}
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium text-sm w-full"
                  >
                    <FaUser className="w-4 h-4" />
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsAvatarMenuOpen(false)}
                    className="bg-gray-200 text-gray-800 px-4 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium text-sm text-center block w-full"
                  >
                    Cadastre-se
                  </Link>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <nav
        className={`
          fixed top-0 left-0 right-0 z-50 
          transition-all duration-300 ease-in-out
          ${
            isScrolled
              ? "bg-white/95 backdrop-blur-md shadow-lg py-2"
              : "bg-white/80 backdrop-blur-sm shadow-sm py-4"
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo/Brand - Melhorado com transição de tamanho */}
            <Link
              to="/"
              className={`
                flex items-center space-x-2 group
                transition-all duration-300
                ${isScrolled ? "scale-95" : "scale-100"}
              `}
            >
              <div className="relative lg:ml-8 lg:mr-8">
                <h1
                  className={`
                    font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 
                    bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-200
                    ${
                      isScrolled
                        ? "text-xl lg:text-2xl"
                        : "text-2xl lg:text-3xl"
                    }
                  `}
                >
                  {brandName}
                </h1>
                {/* Underline animado no hover */}
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></div>
              </div>
            </Link>

            {/* Menu Desktop - Itens de navegação centralizados */}
            {showMenuItems && (
              <div className="hidden md:flex items-center space-x-8">
                {navigationItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.href}
                    className="relative px-3 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 group"
                  >
                    {item.label}
                    {/* Underline animado */}
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></div>
                  </Link>
                ))}
              </div>
            )}

            {/* Área direita - Auth/Profile */}
            <div className="flex items-center space-x-4">
              {/* Auth Buttons ou Avatar Menu */}
              {!isAuthenticated && !loading ? (
                <>
                  {/* Desktop Auth Buttons */}
                  <div className="hidden sm:block">
                    <AuthButtons />
                  </div>
                  {/* Mobile Avatar Menu para usuários não autenticados */}
                  <div className="sm:hidden">
                    <AvatarMenu />
                  </div>
                </>
              ) : (
                <AvatarMenu />
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
