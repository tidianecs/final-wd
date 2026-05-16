import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './auth/AuthContext'
import { PrivateRoute, AdminRoute } from './auth/PrivateRoute'
import Navbar from './components/Navbar'
// Pages publiques
import Home            from './pages/Home'
import Login           from './pages/Login'
import Register        from './pages/Register'
import Destinations    from './pages/Destinations'
import DestinationDetail from './pages/DestinationDetail'
// Pages protégées (connecté)
import Itineraries     from './pages/Itineraries'
import ItineraryBuilder from './pages/ItineraryBuilder'
import Profile         from './pages/Profile'
// Pages admin
import AdminDashboard  from './pages/admin/AdminDashboard'
import AdminUsers      from './pages/admin/AdminUsers'

export default function App() {
  const { isLogged } = useAuth()

  return (
    <div className="min-h-screen bg-dark-bg">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <Routes>
          {/* ── Routes publiques ──*/}
          <Route path="/"               element={<Home />} />
          <Route path="/destinations"   element={<Destinations />} />
          <Route path="/destinations/:id" element={<DestinationDetail />} />

          {/* Auth — redirige si déjà connecté */}
          <Route path="/login"    element={isLogged ? <Navigate to="/" /> : <Login />} />
          <Route path="/register" element={isLogged ? <Navigate to="/" /> : <Register />} />

          {/* ── Routes protégées (connecté) ── */}
          <Route path="/itineraries" element={
            <PrivateRoute><Itineraries /></PrivateRoute>
          } />
          <Route path="/itineraries/new" element={
            <PrivateRoute><ItineraryBuilder /></PrivateRoute>
          } />
          <Route path="/itineraries/:id/edit" element={
            <PrivateRoute><ItineraryBuilder /></PrivateRoute>
          } />
          <Route path="/profile" element={
            <PrivateRoute><Profile /></PrivateRoute>
          } />

          {/* ── Routes admin ──*/}
          <Route path="/admin" element={
            <AdminRoute><AdminDashboard /></AdminRoute>
          } />
          <Route path="/admin/users" element={
            <AdminRoute><AdminUsers /></AdminRoute>
          } />

          {/* 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}