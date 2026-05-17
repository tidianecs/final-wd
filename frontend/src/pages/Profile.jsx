import { useState } from 'react'
import { useAuth } from '../auth/AuthContext'
import { updateProfile } from '../api/userApi'
import { UserCircleIcon, PencilSquareIcon, CheckIcon, XMarkIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'

export default function Profile() {
  const { user, login } = useAuth()

  const [editing, setEditing]   = useState(false)
  const [saving, setSaving]     = useState(false)
  const [success, setSuccess]   = useState(false)
  const [error, setError]       = useState('')
  const [form, setForm]         = useState({
    firstName: user?.firstName || '',
    lastName:  user?.lastName  || '',
  })

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSave() {
    setSaving(true)
    setError('')
    setSuccess(false)
    try {
      await updateProfile(form)
      // Met à jour le localStorage
      const updated = { ...user, ...form }
      localStorage.setItem('user', JSON.stringify(updated))
      setSuccess(true)
      setEditing(false)
      window.location.reload()
    } catch {
      setError('Erreur lors de la mise à jour.')
    } finally {
      setSaving(false)
    }
  }

  function handleCancel() {
    setForm({ firstName: user?.firstName || '', lastName: user?.lastName || '' })
    setEditing(false)
    setError('')
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-white">Mon profil</h1>

      <div className="card">
        <div className="flex items-center gap-5 mb-6">
          <div className="w-16 h-16 rounded-full bg-brand flex items-center justify-center text-white text-2xl font-bold shrink-0">
            {user?.firstName?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase()}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">
              {user?.firstName} {user?.lastName}
            </h2>
            <p className="text-gray-400 text-sm">{user?.email}</p>
            <span className={`inline-flex items-center gap-1 mt-1 text-xs px-2 py-0.5 rounded-full font-medium ${
              user?.role === 'ADMIN'
                ? 'bg-brand/20 text-brand'
                : 'bg-green-500/20 text-green-400'
            }`}>
              {user?.role === 'ADMIN' && <ShieldCheckIcon className="w-3 h-3" />}
              {user?.role}
            </span>
          </div>
        </div>

        {success && (
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg px-4 py-3 mb-4">
            <p className="text-green-400 text-sm flex items-center gap-2">
              <CheckIcon className="w-4 h-4" />
              Profil mis à jour avec succès.
            </p>
          </div>
        )}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 mb-4">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {editing ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Prénom</label>
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Nom</label>
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                disabled={saving}
                className="btn-primary flex items-center gap-2"
              >
                {saving
                  ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  : <CheckIcon className="w-4 h-4" />
                }
                {saving ? 'Sauvegarde...' : 'Sauvegarder'}
              </button>
              <button onClick={handleCancel} className="btn-secondary flex items-center gap-2">
                <XMarkIcon className="w-4 h-4" />
                Annuler
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="btn-secondary flex items-center gap-2"
          >
            <PencilSquareIcon className="w-4 h-4" />
            Modifier mon profil
          </button>
        )}
      </div>

      <div className="card space-y-3">
        <h2 className="text-lg font-semibold text-white mb-4">Informations du compte</h2>
        {[
          { label: 'Email',      value: user?.email },
          { label: 'Rôle',      value: user?.role },
          { label: 'Prénom',    value: user?.firstName || '—' },
          { label: 'Nom',       value: user?.lastName  || '—' },
        ].map(({ label, value }) => (
          <div key={label} className="flex justify-between items-center py-2 border-b border-dark-border last:border-0">
            <span className="text-gray-400 text-sm">{label}</span>
            <span className="text-white text-sm font-medium">{value}</span>
          </div>
        ))}
      </div>

    </div>
  )
}