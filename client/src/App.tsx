import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './main';
import { useState } from 'react';
import { Menu } from 'lucide-react';
import { BrowserRouter } from 'react-router-dom';

// Import pages
import LoginPage from './pages/auth/Login';
import RegisterPage from './pages/auth/Register';
import DashboardPage from './pages/dashboard/Dashboard';
import EditorPage from './pages/menu/Editor';
import React from 'react';

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

// Navigation component
const Navigation = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  if (!isAuthenticated) return null;

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-gray-800">Menu Builder</h1>
            </div>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <a href="/dashboard" className="inline-flex items-center px-1 pt-1 text-gray-900">
                Dashboard
              </a>
              <a href="/menu/editor" className="inline-flex items-center px-1 pt-1 text-gray-900">
                Create Menu
              </a>
            </div>
          </div>
          
          <div className="hidden md:ml-6 md:flex md:items-center">
            <span className="text-gray-700 mr-4">Welcome, {user?.username}</span>
            <button
              onClick={logout}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
            >
              Logout
            </button>
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <a
              href="/dashboard"
              className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700"
            >
              Dashboard
            </a>
            <a
              href="/menu/editor"
              className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700"
            >
              Create Menu
            </a>
            <button
              onClick={logout}
              className="block w-full text-left pl-3 pr-4 py-2 text-base font-medium text-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/menu/editor" element={<EditorPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/menu/editor"
            element={
              <ProtectedRoute>
                <EditorPage />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
      </main>
    </div>
  );
};

export default App;