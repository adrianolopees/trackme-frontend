import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaUser } from "react-icons/fa";

interface MenuItem {
  label: string;
  href: string;
}

interface Profile {
  avatar?: string;
}

interface NavbarProps {
  isAuthenticated?: boolean;
  loading?: boolean;
  profile?: Profile;
  brandName?: string;
  showMenuItems?: boolean;
  menuItems?: MenuItem[];
}

const Navbar: React.FC<NavbarProps> = ({
  isAuthenticated = false,
  loading = false,
  profile = null,
  brandName = "TrackMe",
  showMenuItems = true,
  menuItems = [],
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Detecta scroll para tornar navbar mais compacta
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Menu items padrão caso não sejam fornecidos
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

  // Renderização do Avatar ou ícone de usuário
  const UserAvatar = () => {
    const size = isScrolled ? 36 : 40;
    return (
      <Link to="/me" className="group relative">
        {profile?.avatar ? (
          <div className="relative">
            <img
              src={profile.avatar}
              alt="User avatar"
              className="rounded-full object-cover"
              style={{ width: `${size}px`, height: `${size}px` }}
            />
            {/* Ring hover effect */}
            <div className="absolute inset-0 rounded-full ring-2 ring-transparent group-hover:ring-blue-400 transition-all duration-200"></div>
          </div>
        ) : (
          <div
            className={`
              rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-2
              group-hover:scale-105 transition-transform duration-200
              ${isScrolled ? "w-9 h-9" : "w-10 h-10"}
            `}
          >
            <FaUser className="w-full h-full text-white" />
          </div>
        )}
      </Link>
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
              {/* Auth Buttons ou Avatar */}
              {!isAuthenticated && !loading ? (
                <div className="hidden sm:block">
                  <AuthButtons />
                </div>
              ) : (
                <UserAvatar />
              )}

              {/* Menu Mobile Hamburger */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <FaTimes className="w-6 h-6 text-gray-700" />
                ) : (
                  <FaBars className="w-6 h-6 text-gray-700" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Menu Mobile - Slide down */}
      <div
        className={`
          fixed top-0 left-0 right-0 z-40 md:hidden
          bg-white/95 backdrop-blur-md shadow-lg
          transform transition-all duration-300 ease-in-out
          ${
            isMobileMenuOpen
              ? `translate-y-${isScrolled ? "14" : "20"} opacity-100`
              : "-translate-y-full opacity-0"
          }
        `}
      >
        <div className="pt-4 pb-6 px-4 space-y-4">
          {/* Menu Items Mobile */}
          {showMenuItems &&
            navigationItems.map((item, index) => (
              <Link
                key={index}
                to={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-all duration-200"
              >
                {item.label}
              </Link>
            ))}

          {/* Auth Buttons Mobile */}
          {!isAuthenticated && !loading && (
            <div className="px-4 pt-4 border-t border-gray-200">
              <div className="flex flex-col space-y-3">
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium"
                >
                  <FaUser className="w-4 h-4" />
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="bg-gray-200 text-gray-800 px-4 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium text-center"
                >
                  Cadastre-se
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Overlay para fechar menu mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/20 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
