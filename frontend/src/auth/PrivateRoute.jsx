import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export function PrivateRoute({ children }) {
  const { isLogged, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-2 border-brand border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return isLogged ? children : <Navigate to="/login" replace />;
}

export function AdminRoute({ children }) {
  const { isLogged, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-2 border-brand border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isLogged) return <Navigate to="/login" replace />;
  if (!isAdmin)  return <Navigate to="/" replace />;

  return children;
}