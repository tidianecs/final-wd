import { useState, useEffect } from 'react'
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { getDestinations } from '../api/destinationApi'
import DestinationCard from '../components/DestinationCard'

const REGIONS    = ['Dakar', 'Saint-Louis', 'Casamance', 'Thiès', 'Tambacounda', 'Ziguinchor']
const CATEGORIES = ['NATURE', 'CULTURE', 'PLAGE', 'SPORT', 'GASTRONOMIE']
const BUDGETS    = ['LOW', 'MEDIUM', 'HIGH']
const BUDGET_LABELS = { LOW: 'Petit budget', MEDIUM: 'Moyen', HIGH: 'Premium' }

export default function Destinations() {
  const [destinations, setDestinations] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({ region: '', category: '', budget: '' })

  useEffect(() => {
    fetchDestinations()
  }, [filters])

  async function fetchDestinations() {
    setLoading(true)
    try {
      const params = Object.fromEntries(
        Object.entries(filters).filter(([, v]) => v !== '')
      )
      const res = await getDestinations(params)
      setDestinations(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  function handleFilter(key, value) {
    setFilters(prev => ({ ...prev, [key]: prev[key] === value ? '' : value }))
  }

  function resetFilters() {
    setFilters({ region: '', category: '', budget: '' })
  }

  const hasFilters = Object.values(filters).some(v => v !== '')

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Destinations</h1>
        <p className="text-gray-400">
          Explore {destinations.length} destination{destinations.length > 1 ? 's' : ''} au Sénégal
        </p>
      </div>

      <div className="card space-y-4">
        <div>
          <p className="text-sm font-medium text-gray-300 mb-2">Région</p>
          <div className="flex flex-wrap gap-2">
            {REGIONS.map(r => (
              <button
                key={r}
                onClick={() => handleFilter('region', r)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  filters.region === r
                    ? 'bg-brand text-white'
                    : 'bg-dark-hover text-gray-400 hover:text-white'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-300 mb-2">Catégorie</p>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(c => (
              <button
                key={c}
                onClick={() => handleFilter('category', c)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  filters.category === c
                    ? 'bg-brand text-white'
                    : 'bg-dark-hover text-gray-400 hover:text-white'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-300 mb-2">Budget</p>
          <div className="flex flex-wrap gap-2">
            {BUDGETS.map(b => (
              <button
                key={b}
                onClick={() => handleFilter('budget', b)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  filters.budget === b
                    ? 'bg-brand text-white'
                    : 'bg-dark-hover text-gray-400 hover:text-white'
                }`}
              >
                {BUDGET_LABELS[b]}
              </button>
            ))}
          </div>
        </div>

        {hasFilters && (
          <button
            onClick={resetFilters}
            className="flex items-center gap-1 text-sm text-red-400 hover:text-red-300 transition-colors"
          >
            <XMarkIcon className="w-4 h-4" />
            Réinitialiser les filtres
          </button>
        )}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="card h-72 animate-pulse">
              <div className="h-48 bg-dark-hover rounded-lg mb-4" />
              <div className="h-4 bg-dark-hover rounded w-3/4 mb-2" />
              <div className="h-3 bg-dark-hover rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : destinations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map(dest => (
            <DestinationCard key={dest.id} destination={dest} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-400">
          <MagnifyingGlassIcon className="w-12 h-12 mx-auto mb-4 text-gray-600" />
          <p className="text-lg">Aucune destination trouvée avec ces filtres.</p>
          <button
            onClick={resetFilters}
            className="mt-4 text-brand hover:underline text-sm"
          >
            Réinitialiser les filtres
          </button>
        </div>
      )}
    </div>
  )
}