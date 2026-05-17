import { useState, useEffect } from 'react'
import { UsersIcon, TrashIcon, ShieldCheckIcon, UserIcon } from '@heroicons/react/24/outline'
import { getAllUsers, deleteUser } from '../../api/userApi'
import { useAuth } from '../../auth/AuthContext'

export default function AdminUsers() {
  const { user: currentUser } = useAuth()
  const [users, setUsers]     = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllUsers()
      .then(res => setUsers(res.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  async function handleDelete(id) {
    if (!confirm('Supprimer cet utilisateur ?')) return
    try {
      await deleteUser(id)
      setUsers(prev => prev.filter(u => u.id !== id))
    } catch {
      alert('Erreur lors de la suppression.')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-brand border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <UsersIcon className="w-7 h-7 text-brand" />
        <div>
          <h1 className="text-3xl font-bold text-white">Utilisateurs</h1>
          <p className="text-gray-400 text-sm">{users.length} utilisateur{users.length > 1 ? 's' : ''} inscrit{users.length > 1 ? 's' : ''}</p>
        </div>
      </div>

      <div className="card p-0 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-dark-border">
              <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">Utilisateur</th>
              <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">Email</th>
              <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">Rôle</th>
              <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">Inscription</th>
              <th className="px-6 py-4" />
            </tr>
          </thead>
          <tbody className="divide-y divide-dark-border">
            {users.map(u => (
              <tr key={u.id} className="hover:bg-dark-hover transition-colors">

                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-brand/20 flex items-center justify-center text-brand font-medium text-sm shrink-0">
                      {u.firstName?.[0]?.toUpperCase() || u.email?.[0]?.toUpperCase()}
                    </div>
                    <span className="text-white text-sm font-medium">
                      {u.firstName || '—'} {u.lastName || ''}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-4 text-gray-400 text-sm">{u.email}</td>

                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium ${
                    u.role === 'ADMIN'
                      ? 'bg-brand/20 text-brand'
                      : 'bg-green-500/20 text-green-400'
                  }`}>
                    {u.role === 'ADMIN'
                      ? <ShieldCheckIcon className="w-3 h-3" />
                      : <UserIcon className="w-3 h-3" />
                    }
                    {u.role}
                  </span>
                </td>

                <td className="px-6 py-4 text-gray-400 text-sm">
                  {u.createdAt
                    ? new Date(u.createdAt).toLocaleDateString('fr-FR')
                    : '—'
                  }
                </td>

                <td className="px-6 py-4 text-right">
                  {u.id !== currentUser?.id && u.role !== 'ADMIN' && (
                    <button
                      onClick={() => handleDelete(u.id)}
                      className="p-2 text-gray-500 hover:text-red-400 transition-colors rounded-lg hover:bg-red-500/10"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  )}
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}