// src/App.tsx
import { AnimatePresence } from "framer-motion";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider } from "./auth/contexts/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ProfileSetup from "./pages/ProfileSetup";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />~
        <Route path="/profile-setup" element={<ProfileSetup />} />
        {/* Redireciona para o perfil se já estiver autenticado */}
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen">
          <AnimatedRoutes />

          {/* Toast Container para notificações globais */}
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            className="!z-50"
          />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
