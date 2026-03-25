import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Map, Clock, Zap, CheckCircle2, ChevronRight, Calendar, Users, Info, ArrowLeft, Waves } from 'lucide-react';
import { ROUTES } from '../constants';
import { formatPrice, cn } from '../lib/utils';

export default function RouteDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const route = ROUTES.find(r => r.id === id);

  if (!route) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center space-y-8">
        <h1 className="text-4xl">Maršruts nav atrasts</h1>
        <Link to="/routes" className="btn-primary inline-flex items-center gap-2">
          <ArrowLeft size={20} /> Atpakaļ uz maršrutiem
        </Link>
      </div>
    );
  }

  const [bookingData, setBookingData] = React.useState({
    date: '',
    participants: 2,
  });

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingData.date) {
      alert('Lūdzu, izvēlieties datumu');
      return;
    }
    navigate(`/booking?routeId=${route.id}&date=${bookingData.date}&participants=${bookingData.participants}`);
  };

  return (
    <div className="pb-24">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-end">
        <div className="absolute inset-0 z-0">
          <img 
            src={route.images[0]} 
            alt={route.name} 
            className="w-full h-full object-cover brightness-50"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 text-white space-y-4">
          <Link to="/routes" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-4">
            <ArrowLeft size={18} /> Atpakaļ uz maršrutiem
          </Link>
          <p className="text-accent font-bold uppercase tracking-widest">{route.river}</p>
          <h1 className="text-4xl md:text-6xl">{route.name}</h1>
          <div className="flex flex-wrap gap-6 text-lg font-medium pt-4">
            <span className="flex items-center gap-2"><Clock /> {route.duration}</span>
            <span className="flex items-center gap-2"><Zap /> {route.difficulty}</span>
            <span className="flex items-center gap-2"><Map /> {route.river}</span>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-16">
            <section className="space-y-6">
              <h2 className="text-3xl">Ko sagaidīt</h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                {route.description}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <CheckCircle2 className="text-primary" />
                  <span className="font-medium">Transports iekļauts</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <CheckCircle2 className="text-primary" />
                  <span className="font-medium">Drošības ekipējums</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <CheckCircle2 className="text-primary" />
                  <span className="font-medium">Ūdensizturīgi maisi</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <CheckCircle2 className="text-primary" />
                  <span className="font-medium">Pilna instruktāža</span>
                </div>
              </div>
            </section>

            {route.schedule && (
              <section className="space-y-8">
                <h2 className="text-3xl">Brauciena plāns</h2>
                <div className="space-y-4">
                  {route.schedule.map((step, idx) => (
                    <div key={idx} className="flex gap-6 items-start">
                      <div className="flex flex-col items-center">
                        <div className="w-4 h-4 rounded-full bg-primary" />
                        {idx !== route.schedule!.length - 1 && <div className="w-0.5 h-12 bg-gray-200" />}
                      </div>
                      <p className="text-lg font-medium text-gray-700">{step}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {route.faq && (
              <section className="space-y-8">
                <h2 className="text-3xl">BUJ par maršrutu</h2>
                <div className="space-y-4">
                  {route.faq.map((item, idx) => (
                    <div key={idx} className="p-6 bg-gray-50 rounded-2xl space-y-2">
                      <h3 className="text-lg font-bold">{item.q}</h3>
                      <p className="text-gray-600">{item.a}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sticky Booking Module */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 space-y-8">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-gray-400 text-xs uppercase font-bold tracking-wider">Cena no personas</p>
                  <p className="text-4xl font-bold text-primary">{formatPrice(route.price)}</p>
                </div>
                <div className="text-right">
                  <p className="text-green-600 font-bold text-sm flex items-center gap-1">
                    <CheckCircle2 size={16} /> Tūlītēja apstiprināšana
                  </p>
                </div>
              </div>

              <form onSubmit={handleBooking} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                    <Calendar size={18} className="text-accent" /> Izvēlieties datumu
                  </label>
                  <input 
                    type="date" 
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={bookingData.date}
                    onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                    className="w-full p-4 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-accent text-lg" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                    <Users size={18} className="text-accent" /> Dalībnieku skaits
                  </label>
                  <div className="flex items-center gap-4 bg-gray-50 rounded-xl p-2">
                    <button 
                      type="button"
                      onClick={() => setBookingData({ ...bookingData, participants: Math.max(1, bookingData.participants - 1) })}
                      className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center font-bold text-xl hover:bg-gray-100"
                    >-</button>
                    <span className="flex-grow text-center text-xl font-bold">{bookingData.participants}</span>
                    <button 
                      type="button"
                      onClick={() => setBookingData({ ...bookingData, participants: bookingData.participants + 1 })}
                      className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center font-bold text-xl hover:bg-gray-100"
                    >+</button>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 space-y-4">
                  <div className="flex justify-between text-lg">
                    <span className="text-gray-500">Kopā</span>
                    <span className="font-bold text-2xl text-primary">{formatPrice(route.price * bookingData.participants)}</span>
                  </div>
                  <button type="submit" className="btn-primary w-full py-5 text-xl flex items-center justify-center gap-2">
                    Rezervēt tūlīt <ChevronRight />
                  </button>
                </div>
              </form>

              <div className="p-4 bg-accent/5 rounded-xl flex gap-3">
                <Info size={20} className="text-accent shrink-0" />
                <p className="text-sm text-gray-600">
                  Bezmaksas atcelšana līdz 48 stundām pirms brauciena. Nav slēptu izmaksu.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
