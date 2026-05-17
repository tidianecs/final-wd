import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { UsersIcon, MapPinIcon, ArrowRightIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'
import { getAllUsers } from '../../api/userApi'
import { getDestinations } from '../../api/destinationApi'

export default function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, destinations: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([getAllUsers(), getDestinations()])
      .then(([usersRes, destRes]) => {
        setStats({
          users:        usersRes.data.length,
          destinations: destRes.data.length,
        })
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <ShieldCheckIcon className="w-8 h-8 text-brand" />
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard Admin</h1>
          <p className="text-gray-400 text-sm">Gestion de la plateforme TourismeSN</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Utilisateurs</p>
              <p className="text-4xl font-bold text-white">
                {loading ? '...' : stats.users}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-brand/20 flex items-center justify-center">
              <UsersIcon className="w-6 h-6 text-brand" />
            </div>
          </div>
          <Link
            to="/admin/users"
            className="mt-4 text-brand text-sm flex items-center gap-1 hover:underline"
          >
            Gérer les utilisateurs
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Destinations</p>
              <p className="text-4xl font-bold text-white">
                {loading ? '...' : stats.destinations}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
              <MapPinIcon className="w-6 h-6 text-green-400" />
            </div>
          </div>
          <Link
            to="/destinations"
            className="mt-4 text-green-400 text-sm flex items-center gap-1 hover:underline"
          >
            Voir les destinations
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold text-white mb-4">Actions rapides</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            to="/admin/users"
            className="flex items-center gap-3 p-4 bg-dark-hover rounded-lg hover:bg-dark-border transition-colors"
          >
            <UsersIcon className="w-5 h-5 text-brand" />
            <span className="text-white text-sm font-medium">Gérer les utilisateurs</span>
            <ArrowRightIcon className="w-4 h-4 text-gray-400 ml-auto" />
          </Link>
          <Link
            to="/destinations"
            className="flex items-center gap-3 p-4 bg-dark-hover rounded-lg hover:bg-dark-border transition-colors"
          >
            <MapPinIcon className="w-5 h-5 text-green-400" />
            <span className="text-white text-sm font-medium">Voir les destinations</span>
            <ArrowRightIcon className="w-4 h-4 text-gray-400 ml-auto" />
          </Link>
        </div>
      </div>

    </div>
  )
}