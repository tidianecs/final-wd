import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PlusIcon, TrashIcon, ArrowLeftIcon, CheckIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { createItinerary, updateItinerary, getItinerary } from '../api/itineraryApi'
import { getDestinations } from '../api/destinationApi'

export default function ItineraryBuilder() {
  const { id }   = useParams()
  const navigate = useNavigate()
  const isEdit   = !!id
  const [title, setTitle]       = useState('')
  const [duration, setDuration] = useState(1)
  const [steps, setSteps]       = useState([])
  const [destinations, setDestinations] = useState([])
  const [search, setSearch]             = useState('')
  const [loading, setLoading]   = useState(isEdit)
  const [saving, setSaving]     = useState(false)
  const [error, setError]       = useState('')

  useEffect(() => {
    getDestinations().then(res => setDestinations(res.data)).catch(console.error)
  }, [])

  useEffect(() => {
    if (!isEdit) return
    getItinerary(id)
      .then(res => {
        const it = res.data
        setTitle(it.title)
        setDuration(it.duration)
        setSteps(it.steps.map(s => ({
          destinationId: s.destination.id,
          dayNumber:     s.dayNumber,
          orderIndex:    s.orderIndex,
          notes:         s.notes || '',
          _dest:         s.destination,
        })))
      })
      .catch(() => navigate('/itineraries'))
      .finally(() => setLoading(false))
  }, [id])

  const filtered = destinations.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.region?.toLowerCase().includes(search.toLowerCase())
  )

  // Add a Step
  function addStep(dest) {
    setSteps(prev => [
      ...prev,
      {
        destinationId: dest.id,
        dayNumber:     1,
        orderIndex:    prev.length + 1,
        notes:         '',
        _dest:         dest,
      },
    ])
  }

  // Modify a Step
  function updateStep(idx, key, value) {
    setSteps(prev => prev.map((s, i) => i === idx ? { ...s, [key]: value } : s))
  }

  // Delete One Step
  function removeStep(idx) {
    setSteps(prev => prev.filter((_, i) => i !== idx))
  }

  // Save it
  async function handleSave() {
    if (!title.trim()) { setError('Le titre est requis.'); return }
    if (steps.length === 0) { setError('Ajoute au moins une étape.'); return }

    setError('')
    setSaving(true)

    const payload = {
      title,
      duration: Number(duration),
      steps: steps.map((s, i) => ({
        destinationId: s.destinationId,
        dayNumber:     Number(s.dayNumber),
        orderIndex:    i + 1,
        notes:         s.notes,
      })),
    }

    try {
      if (isEdit) {
        await updateItinerary(id, payload)
      } else {
        await createItinerary(payload)
      }
      navigate('/itineraries')
    } catch {
      setError('Erreur lors de la sauvegarde.')
    } finally {
      setSaving(false)
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
    <div className="max-w-5xl mx-auto space-y-6">

      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/itineraries')}
          className="p-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeftIcon className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold text-white">
          {isEdit ? 'Modifier l\'itinéraire' : 'Nouvel itinéraire'}
        </h1>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">

          <div className="card space-y-4">
            <h2 className="text-lg font-semibold text-white">Informations</h2>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Titre de l'itinéraire
              </label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Ex: Week-end à Dakar"
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Durée (jours)
              </label>
              <input
                type="number"
                min="1"
                max="30"
                value={duration}
                onChange={e => setDuration(e.target.value)}
                className="input-field w-32"
              />
            </div>
          </div>

          <div className="card space-y-3">
            <h2 className="text-lg font-semibold text-white">
              Étapes ({steps.length})
            </h2>

            {steps.length === 0 ? (
              <p className="text-gray-500 text-sm">
                Ajoute des destinations depuis la liste à droite.
              </p>
            ) : (
              steps.map((step, idx) => (
                <div key={idx} className="bg-dark-hover rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-white text-sm">
                      {step._dest?.name}
                    </span>
                    <button
                      onClick={() => removeStep(idx)}
                      className="text-gray-500 hover:text-red-400 transition-colors"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-gray-400 mb-1 block">Jour</label>
                      <input
                        type="number"
                        min="1"
                        max={duration}
                        value={step.dayNumber}
                        onChange={e => updateStep(idx, 'dayNumber', e.target.value)}
                        className="input-field py-1.5 text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 mb-1 block">Notes</label>
                      <input
                        type="text"
                        value={step.notes}
                        onChange={e => updateStep(idx, 'notes', e.target.value)}
                        placeholder="Note optionnelle"
                        className="input-field py-1.5 text-sm"
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="btn-primary w-full py-3 flex items-center justify-center gap-2"
          >
            {saving ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <CheckIcon className="w-5 h-5" />
            )}
            {saving ? 'Sauvegarde...' : isEdit ? 'Mettre à jour' : 'Créer l\'itinéraire'}
          </button>

        </div>

        <div className="card space-y-4">
          <h2 className="text-lg font-semibold text-white">Ajouter des destinations</h2>
          <div className="relative">
            <MagnifyingGlassIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Rechercher une destination..."
              className="input-field pl-9"
            />
          </div>

          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
            {filtered.map(dest => {
              const alreadyAdded = steps.some(s => s.destinationId === dest.id)
              return (
                <div
                  key={dest.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-dark-hover hover:bg-dark-border transition-colors"
                >
                  <div>
                    <p className="text-sm font-medium text-white">{dest.name}</p>
                    <p className="text-xs text-gray-400">{dest.region} · {dest.category}</p>
                  </div>
                  <button
                    onClick={() => !alreadyAdded && addStep(dest)}
                    disabled={alreadyAdded}
                    className={`p-1.5 rounded-lg transition-colors ${
                      alreadyAdded
                        ? 'text-green-400 bg-green-500/10 cursor-default'
                        : 'text-gray-400 hover:text-brand hover:bg-brand/10'
                    }`}
                  >
                    {alreadyAdded
                      ? <CheckIcon className="w-4 h-4" />
                      : <PlusIcon className="w-4 h-4" />
                    }
                  </button>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </div>
  )
}