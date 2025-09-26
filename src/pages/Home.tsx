import { useAuth } from "../hooks/useAuth";
import { useAuthModal } from "../hooks/useAuthModal";
import {
  AuthModalContainer,
  FullPageSpinner,
  AnimatedWrapper,
  Navbar,
} from "../components";
import {
  FiShare2,
  FiUsers,
  FiUser,
  FiMusic,
  FiArrowRight,
  FiStar,
  FiHeart,
} from "react-icons/fi";
function Home() {
  const { isAuthenticated, initialLoading, loginLoading, profile } = useAuth();
  const {
    authModalType,
    isAuthModalOpen,
    openLoginModal,
    openRegisterModal,
    closeAuthModal,
    switchToLogin,
    switchToRegister,
  } = useAuthModal();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {initialLoading && <FullPageSpinner />}

      {/* Navbar */}
      <Navbar
        isAuthenticated={isAuthenticated}
        loading={loginLoading}
        profile={profile || undefined}
        onOpenLogin={openLoginModal}
        onOpenRegister={openRegisterModal}
      />

      <AnimatedWrapper className="relative">
        {/* Hero Section */}
        <section className="relative px-4 pt-24 pb-20 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              {/* Main tagline */}
              <p className="text-xl sm:text-2xl lg:text-3xl text-gray-700 mb-4 font-medium">
                Transforme sua música em conexões
              </p>
              <p className="text-base sm:text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
                Descubra pessoas com o mesmo gosto musical que você. Sua vibe
                atrai sua tribo.
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-4 pb-20 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Por que escolher o TrackMe?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Uma nova forma de descobrir e se conectar com pessoas através da
                música
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 cursor-pointer">
              {/* Feature 1 */}
              <div className="group ">
                <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 h-full">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <FiShare2 className="text-white" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Compartilhe Playlists
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Transforme suas playlists favoritas em pontes para novas
                    conexões e amizades.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="group">
                <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-purple-200 h-full">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <FiUsers className="text-white" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Encontre Sua Tribo
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Descubra pessoas com gostos musicais similares e forme
                    conexões autênticas.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="group">
                <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-green-200 h-full">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <FiMusic className="text-white" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Descobrir Música
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Explore novos artistas e estilos através das descobertas de
                    outros usuários.
                  </p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="group">
                <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-pink-200 h-full">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <FiUser className="text-white" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Perfil Personalizado
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Crie um perfil que representa sua personalidade e paixão
                    musical.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof Section */}
        <section className="px-4 pb-20 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 md:p-12">
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className="w-6 h-6 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                </div>

                <blockquote className="text-xl md:text-2xl text-gray-700 font-medium mb-6 italic">
                  "Finalmente encontrei pessoas que realmente entendem minha
                  música. O TrackMe mudou completamente como eu descubro novos
                  sons!"
                </blockquote>

                <div className="flex items-center justify-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <FiHeart className="text-white" size={20} />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">Maria Silva</p>
                    <p className="text-sm text-gray-600">Usuária desde 2024</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Bottom */}
        <section className="px-4 pb-20 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Pronto para começar?
              </h2>
              <p className="text-xl mb-8 text-blue-100">
                Junte-se à comunidade que conecta através da música
              </p>

              {!isAuthenticated && !loginLoading && (
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <button
                    onClick={openRegisterModal}
                    className="bg-white text-blue-600 px-8 py-4 rounded-full cursor-pointer font-semibold hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-2 shadow-lg"
                  >
                    <span>Criar conta grátis</span>
                    <FiArrowRight size={20} />
                  </button>
                  <p className="text-sm text-blue-200">
                    Sem compromisso • Sempre gratuito
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Floating Elements */}
        <div className="fixed top-20 left-10 w-20 h-20 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob hidden lg:block"></div>
        <div className="fixed top-40 right-10 w-20 h-20 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000 hidden lg:block"></div>
        <div className="fixed bottom-20 left-20 w-20 h-20 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000 hidden lg:block"></div>
      </AnimatedWrapper>

      {/* Auth Modal */}
      <AuthModalContainer
        authType={authModalType}
        isAuthModalOpen={isAuthModalOpen}
        onAuthModalClose={closeAuthModal}
        onSwitchToLogin={switchToLogin}
        onSwitchToRegister={switchToRegister}
      />
    </div>
  );
}

export default Home;
