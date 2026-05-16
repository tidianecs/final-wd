import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeftIcon, MapPinIcon, TrashIcon, ArrowTopRightOnSquareIcon, PlusCircleIcon, LeafIcon } from '@heroicons/react/24/outline'
import { BuildingLibraryIcon, BeakerIcon, TrophyIcon, CakeIcon } from '@heroicons/react/24/outline'
import { getDestination, deleteDestination } from '../api/destinationApi'
import { useAuth } from '../auth/AuthContext'

const budgetLabels = {
  LOW:    'Petit budget',
  MEDIUM: 'Budget moyen',
  HIGH:   'Premium',
}

const categoryIcons = {
  NATURE:      <BeakerIcon className="w-4 h-4" />,
  CULTURE:     <BuildingLibraryIcon className="w-4 h-4" />,
  PLAGE:       <TrophyIcon className="w-4 h-4" />,
  SPORT:       <TrophyIcon className="w-4 h-4" />,
  GASTRONOMIE: <CakeIcon className="w-4 h-4" />,
}

export default function DestinationDetail() {
  const { id }      = useParams()
  const { isAdmin } = useAuth()
  const navigate    = useNavigate()

  const [destination, setDestination] = useState(null)
  const [loading, setLoading]         = useState(true)
  const [deleting, setDeleting]       = useState(false)

  useEffect(() => {
    getDestination(id)
      .then(res => setDestination(res.data))
      .catch(() => navigate('/destinations'))
      .finally(() => setLoading(false))
  }, [id])

  async function handleDelete() {
    if (!confirm('Supprimer cette destination ?')) return
    setDeleting(true)
    try {
      await deleteDestination(id)
      navigate('/destinations')
    } catch {
      alert('Erreur lors de la suppression.')
      setDeleting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-brand border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!destination) return null

  const { name, description, region, category, imageUrl, budgetRange, latitude, longitude } = destination

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link
        to="/destinations"
        className="text-gray-400 hover:text-white text-sm flex items-center gap-1 transition-colors"
      >
        <ArrowLeftIcon className="w-4 h-4" />
        Retour aux destinations
      </Link>

      {imageUrl && (
        <div className="h-72 rounded-xl overflow-hidden">
          <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
        </div>
      )}

      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">{name}</h1>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="flex items-center gap-1 text-gray-400">
              <MapPinIcon className="w-4 h-4 text-brand" />
              {region}
            </span>
            {category && (
              <span className="flex items-center gap-1 bg-dark-card border border-dark-border px-3 py-1 rounded-full text-sm text-gray-300">
                {categoryIcons[category]}
                {category}
              </span>
            )}
            {budgetRange && (
              <span className="bg-dark-card border border-dark-border px-3 py-1 rounded-full text-sm text-gray-300">
                {budgetLabels[budgetRange]}
              </span>
            )}
          </div>
        </div>

        {isAdmin && (
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 px-4 py-2 rounded-lg text-sm transition-colors shrink-0"
          >
            <TrashIcon className="w-4 h-4" />
            {deleting ? 'Suppression...' : 'Supprimer'}
          </button>
        )}
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold text-white mb-3">À propos</h2>
        <p className="text-gray-400 leading-relaxed">{description}</p>
      </div>

      {latitude && longitude && (
        <div className="card">
          <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <MapPinIcon className="w-5 h-5 text-brand" />
            Localisation
          </h2>
          <p className="text-gray-400 text-sm mb-3">
            Lat: {latitude} | Lng: {longitude}
          </p>
          <a
            href={`https://www.google.com/maps?q=${latitude},${longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center gap-2 text-sm"
          >
            Ouvrir dans Google Maps
            <ArrowTopRightOnSquareIcon className="w-4 h-4" />
          </a>
        </div>
      )}

      <div className="card text-center bg-gradient-to-r from-brand/10 to-purple-500/10 border-brand/20">
        <p className="text-white font-medium mb-3">
          Tu veux visiter {name} ?
        </p>
        <Link
          to="/itineraries/new"
          className="btn-primary px-6 py-2 inline-flex items-center gap-2"
        >
          <PlusCircleIcon className="w-5 h-5" />
          Ajouter à un itinéraire
        </Link>
      </div>

    </div>
  )
}