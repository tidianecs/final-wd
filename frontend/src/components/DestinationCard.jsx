import { Link } from 'react-router-dom'
import { MapPinIcon, ArrowRightIcon } from '@heroicons/react/24/outline'

// Badges colorés par catégorie
const categoryColors = {
  NATURE:      'bg-green-500/20 text-green-400',
  CULTURE:     'bg-purple-500/20 text-purple-400',
  PLAGE:       'bg-blue-500/20 text-blue-400',
  SPORT:       'bg-orange-500/20 text-orange-400',
  GASTRONOMIE: 'bg-yellow-500/20 text-yellow-400',
}

const budgetLabels = {
  LOW:    { label: 'Économique',   color: 'text-green-400' },
  MEDIUM: { label: 'Moyen',  color: 'text-yellow-400' },
  HIGH:   { label: 'Premium', color: 'text-red-400' },
}

export default function DestinationCard({ destination }) {
  const { id, name, description, region, category, imageUrl, budgetRange } = destination
  const budget = budgetLabels[budgetRange] || budgetLabels.MEDIUM

  return (
    <Link to={`/destinations/${id}`} className="group block">
      <div className="card hover:border-brand/50 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand/10 p-0 overflow-hidden">

        <div className="h-48 bg-dark-hover overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => { e.target.style.display = 'none' }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-5xl">
              -
            </div>
          )}
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-semibold text-white text-lg group-hover:text-brand transition-colors line-clamp-1">
              {name}
            </h3>
            <span className={`text-sm font-bold ${budget.color} shrink-0`}>
              {budget.label}
            </span>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <span className="text-gray-400 text-sm"><MapPinIcon className="w-4 h-4 text-brand inline mr-1" />{region}</span>
            {category && (
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryColors[category] || 'bg-gray-500/20 text-gray-400'}`}>
                {category}
              </span>
            )}
          </div>

          <p className="text-gray-400 text-sm line-clamp-2">
            {description}
          </p>

            <span className="mt-4 text-brand text-sm font-medium group-hover:underline flex items-center gap-1">
            Voir plus <ArrowRightIcon className="w-4 h-4" />
            </span>
        </div>

      </div>
    </Link>
  )
}