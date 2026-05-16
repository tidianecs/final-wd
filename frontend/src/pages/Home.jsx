import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getDestinations } from '../api/destinationApi'
import DestinationCard from '../components/DestinationCard'
import { MapIcon, GlobeAltIcon, UsersIcon, StarIcon, ArrowRightIcon, MapPinIcon } from '@heroicons/react/24/outline'

export default function Home() {
  const [destinations, setDestinations] = useState([])
  const [loading, setLoading]           = useState(true)

  useEffect(() => {
    getDestinations()
      .then(res => setDestinations(res.data.slice(0, 6))) // 6 premières
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="space-y-16">
      <section className="text-center py-16 px-4">
        <div className="inline-block bg-brand/10 border border-brand/20 rounded-full px-4 py-1.5 text-brand text-sm font-medium mb-6">
          Découvre le Sénégal
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
          Planifie ton voyage au{' '}
          <span className="text-brand">Sénégal</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
          Explore les plus belles destinations, crée tes itinéraires personnalisés
          et découvre la richesse culturelle du Sénégal.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/destinations" className="btn-primary px-8 py-3 text-base">
            Explorer les destinations
          </Link>
          <Link to="/itineraries" className="btn-secondary px-8 py-3 text-base">
            Voir mes itinéraires
          </Link>
        </div>
      </section>

        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
            { icon: GlobeAltIcon, label: 'Destinations', value: '50+' },
            { icon: MapIcon,      label: 'Itinéraires',  value: '100+' },
            { icon: UsersIcon,    label: 'Voyageurs',     value: '1K+' },
            { icon: StarIcon,     label: 'Avis positifs', value: '98%' },
        ].map((stat) => (
            <div key={stat.label} className="card text-center">
            <stat.icon className="w-8 h-8 text-brand mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
        ))}
        </section>

        <section>
        <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">
            Destinations populaires
            </h2>
            <Link to="/destinations" className="text-brand hover:text-brand-light text-sm transition-colors flex items-center gap-1">
            Voir tout
            <ArrowRightIcon className="w-4 h-4" />
            </Link>
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
            <div className="text-center py-12 text-gray-400">
            <MapPinIcon className="w-12 h-12 mx-auto mb-3 text-gray-600" />
            <p>Aucune destination disponible pour le moment.</p>
            </div>
        )}
        </section>
    </div>
  )
}