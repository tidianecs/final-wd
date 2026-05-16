import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline'

export default function Footer() {
  return (
    <footer className="bg-dark-card border-t border-dark-border mt-16">
      <div className="max-w-7xl mx-auto px-4 py-10">

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="font-bold text-white text-lg">
              Tourisme<span className="text-brand">SN</span>
            </span>
            <p className="text-gray-400 text-sm mt-1">
              Planifie ton voyage au Sénégal
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <a
              href="mailto:catcisse@mydaust.org"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
            >
              <EnvelopeIcon className="w-4 h-4 text-brand" />
              catcisse@mydaust.org
            </a>
            <a
              href="tel:+221784627276"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
            >
              <PhoneIcon className="w-4 h-4 text-brand" />
              78 462 72 76
            </a>
          </div>

        </div>

        <div className="border-t border-dark-border mt-8 pt-6 text-center text-gray-500 text-xs">
          {new Date().getFullYear()} TourismeSN — Tous droits réservés
        </div>

      </div>
    </footer>
  )
}