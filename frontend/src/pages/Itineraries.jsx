import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PlusIcon, MapIcon, TrashIcon, PencilSquareIcon, CalendarDaysIcon } from '@heroicons/react/24/outline'
import { getItineraries, deleteItinerary } from '../api/itineraryApi'

export default function Itineraries() {
  const [itineraries, setItineraries] = useState([])
  const [loading, setLoading]         = useState(true)
  const navigate                      = useNavigate()

  useEffect(() => {
    fetchItineraries()
  }, [])

  async function fetchItineraries() {
    try {
      const res = await getItineraries()
      setItineraries(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id) {
    if (!confirm('Supprimer cet itinéraire ?')) return
    try {
      await deleteItinerary(id)
      setItineraries(prev => prev.filter(i => i.id !== id))
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
    <div className="space-y-8">

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Mes itinéraires</h1>
          <p className="text-gray-400">
            {itineraries.length} itinéraire{itineraries.length > 1 ? 's' : ''} créé{itineraries.length > 1 ? 's' : ''}
          </p>
        </div>
        <Link to="/itineraries/new" className="btn-primary flex items-center gap-2">
          <PlusIcon className="w-5 h-5" />
          Nouvel itinéraire
        </Link>
      </div>

      {itineraries.length === 0 ? (
        <div className="text-center py-20">
          <MapIcon className="w-16 h-16 mx-auto mb-4 text-gray-600" />
          <h2 className="text-xl font-semibold text-white mb-2">
            Aucun itinéraire pour le moment
          </h2>
          <p className="text-gray-400 mb-6">
            Crée ton premier itinéraire et commence à planifier ton aventure.
          </p>
          <Link to="/itineraries/new" className="btn-primary inline-flex items-center gap-2">
            <PlusIcon className="w-5 h-5" />
            Créer un itinéraire
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {itineraries.map(itinerary => (
            <div key={itinerary.id} className="card hover:border-brand/40 transition-colors">

              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-white mb-1">
                    {itinerary.title}
                  </h2>
                  <div className="flex items-center gap-1 text-gray-400 text-sm">
                    <CalendarDaysIcon className="w-4 h-4" />
                    {itinerary.duration} jour{itinerary.duration > 1 ? 's' : ''}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigate(`/itineraries/${itinerary.id}/edit`)}
                    className="p-2 text-gray-400 hover:text-brand transition-colors rounded-lg hover:bg-dark-hover"
                  >
                    <PencilSquareIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(itinerary.id)}
                    className="p-2 text-gray-400 hover:text-red-400 transition-colors rounded-lg hover:bg-dark-hover"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {itinerary.steps && itinerary.steps.length > 0 ? (
                <div className="space-y-2">
                  {itinerary.steps.slice(0, 3).map((step, idx) => (
                    <div
                      key={step.id}
                      className="flex items-center gap-3 text-sm text-gray-400"
                    >
                      <span className="w-6 h-6 rounded-full bg-brand/20 text-brand text-xs flex items-center justify-center font-medium shrink-0">
                        {idx + 1}
                      </span>
                      <span className="truncate">
                        Jour {step.dayNumber} — {step.destination?.name}
                      </span>
                    </div>
                  ))}
                  {itinerary.steps.length > 3 && (
                    <p className="text-xs text-gray-500 pl-9">
                      +{itinerary.steps.length - 3} étape{itinerary.steps.length - 3 > 1 ? 's' : ''}
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">Aucune étape ajoutée.</p>
              )}

              <div className="mt-4 pt-4 border-t border-dark-border">
                <button
                  onClick={() => navigate(`/itineraries/${itinerary.id}/edit`)}
                  className="text-brand text-sm hover:underline flex items-center gap-1"
                >
                  <PencilSquareIcon className="w-4 h-4" />
                  Modifier l'itinéraire
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  )
}