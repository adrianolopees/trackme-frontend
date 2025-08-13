import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider } from "./contexts/AuthContext";
import { FollowProvider } from "./contexts/FollowContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ProfileSetup from "./pages/ProfileSetup";
import Register from "./pages/Register";
import FollowersPage from "./pages/FollowersPage";
import FollowingPage from "./pages/FollowingPage";

import { ProtectedRoute } from "./routes/ProtectedRoute";
import { PublicRoute } from "./routes/PublicRoute";
import ProfileView from "./pages/ProfileView";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route path="/users/:id" element={<ProfileView />} />

        {/* 🔒 Rotas protegidas individualmente */}
        <Route
          path="/profile-setup"
          element={
            <ProtectedRoute>
              <ProfileSetup />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/:profileId/followers"
          element={
            <ProtectedRoute>
              <FollowersPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile/:profileId/following"
          element={
            <ProtectedRoute>
              <FollowingPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <FollowProvider>
          <div className="min-h-screen">
            <AnimatedRoutes />

            {/* Toast Container para notificações globais */}
            <ToastContainer
              position="top-right"
              autoClose={3000}
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
        </FollowProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
