import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Map, Clock, Zap, Filter } from 'lucide-react';
import { ROUTES } from '../constants';
import { formatPrice, cn } from '../lib/utils';

export default function Routes() {
  const [filter, setFilter] = React.useState<'All' | 'Viegli' | 'Vidēji' | 'Izaicinoši'>('All');

  const filteredRoutes = filter === 'All' ? ROUTES : ROUTES.filter(r => r.difficulty === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-end gap-8">
        <div className="space-y-4">
          <h1 className="text-5xl">Izvēlieties savu maršrutu</h1>
          <p className="text-gray-600 max-w-xl">Mēs piedāvājam dažādus maršrutus pa skaistākajām Latvijas upēm. Filtrējiet pēc sarežģītības, lai atrastu sev piemērotāko.</p>
        </div>
        
        <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-xl">
          {(['All', 'Viegli', 'Vidēji', 'Izaicinoši'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-6 py-2 rounded-lg font-bold transition-all",
                filter === f ? "bg-white text-primary shadow-sm" : "text-gray-500 hover:text-primary"
              )}
            >
              {f === 'All' ? 'Visi' : f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredRoutes.map((route) => (
          <motion.div 
            layout
            key={route.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all flex flex-col"
          >
            <div className="relative h-64 overflow-hidden">
              <img 
                src={route.images[0]} 
                alt={route.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className={cn(
                "absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-bold",
                route.difficulty === 'Viegli' ? "bg-green-100 text-green-700" :
                route.difficulty === 'Vidēji' ? "bg-yellow-100 text-yellow-700" :
                "bg-red-100 text-red-700"
              )}>
                {route.difficulty}
              </div>
            </div>
            <div className="p-8 space-y-6 flex-grow flex flex-col">
              <div className="space-y-2">
                <p className="text-accent font-bold text-sm uppercase tracking-wider">{route.river}</p>
                <h3 className="text-2xl">{route.name}</h3>
                <p className="text-gray-600 line-clamp-2">{route.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-50">
                <div className="flex items-center gap-2 text-gray-500">
                  <Clock size={18} className="text-primary" />
                  <span>{route.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <Zap size={18} className="text-primary" />
                  <span>{route.difficulty}</span>
                </div>
              </div>

              <div className="flex justify-between items-center mt-auto pt-4">
                <div>
                  <p className="text-gray-400 text-xs uppercase">Cena no personas</p>
                  <p className="text-3xl font-bold text-primary">{formatPrice(route.price)}</p>
                </div>
                <Link to={`/routes/${route.id}`} className="btn-primary">
                  Skatīt detaļas
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredRoutes.length === 0 && (
        <div className="text-center py-24 space-y-4">
          <Filter size={48} className="mx-auto text-gray-300" />
          <h2 className="text-2xl text-gray-500">Nav atrasts neviens maršruts.</h2>
          <button onClick={() => setFilter('All')} className="text-accent font-bold underline">Rādīt visus maršrutus</button>
        </div>
      )}
    </div>
  );
}
