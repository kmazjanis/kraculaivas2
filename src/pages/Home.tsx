import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Star, Shield, Truck, Map, CheckCircle2, ChevronDown, Waves } from 'lucide-react';
import { toast } from 'sonner';
import { ROUTES } from '../constants';
import { formatPrice, cn } from '../lib/utils';

export default function Home() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);

  const faqs = [
    { q: "Kas notiek, ja līst lietus?", a: "Mēs nodrošinām ūdensnecaurlaidīgus maisus jūsu mantām. Ja laikapstākļi ir bīstami (negaiss/zibens), mēs piedāvājam pilnu atmaksu vai brauciena pārcelšanu." },
    { q: "Vai nepieciešama iepriekšēja pieredze?", a: "Lielākā daļa mūsu maršrutu ir piemēroti iesācējiem. Pirms brauciena sākuma mēs sniedzam pilnu drošības instruktāžu un norādījumus." },
    { q: "Vai transports ir iekļauts?", a: "Jā, mēs nodrošinām transportu no finiša punkta atpakaļ pie jūsu automašīnas starta punktā visiem standarta maršrutiem." },
    { q: "Ko man ņemt līdzi?", a: "Ērtu apģērbu, ūdeni, uzkodas un maiņas drēbes katram gadījumam. Par pārējo parūpēsimies mēs!" }
  ];

  const [quickBooking, setQuickBooking] = React.useState({
    routeId: ROUTES[0].id,
    date: '',
    participants: 2
  });

  const handleQuickBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickBooking.date) {
      toast.error('Lūdzu, izvēlieties datumu');
      return;
    }
    navigate(`/booking?routeId=${quickBooking.routeId}&date=${quickBooking.date}&participants=${quickBooking.participants}`);
  };

  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=2000" 
            alt="Laivošana pa Gauju" 
            className="w-full h-full object-cover brightness-50"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl space-y-8"
          >
            <h1 className="text-5xl md:text-7xl leading-tight">
              Laivu braucieni pa Gauju — <span className="text-accent">ērta rezervācija</span>, bez raizēm.
            </h1>
            <p className="text-xl text-gray-200 max-w-xl">
              Atklājiet Latvijas upju skaistumu ar premium ekipējumu un pārdomātu loģistiku. Mēs parūpēsimies par transportu, jūs — par airēšanu.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/routes" className="btn-primary flex items-center gap-2 text-lg">
                Rezervēt braucienu <ArrowRight size={20} />
              </Link>
              <Link to="/routes" className="btn-secondary bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-lg">
                Skatīt maršrutus
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Quick Booking Widget */}
        <div className="absolute bottom-0 left-0 right-0 z-20 translate-y-1/2 px-4">
          <form 
            onSubmit={handleQuickBooking}
            className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 items-end border border-gray-100"
          >
            <div className="space-y-2">
              <label htmlFor="quick-route" className="text-xs font-bold uppercase tracking-wider text-gray-500">Maršruts</label>
              <select 
                id="quick-route"
                value={quickBooking.routeId}
                onChange={(e) => setQuickBooking({ ...quickBooking, routeId: e.target.value })}
                className="w-full p-3 bg-gray-50 rounded-lg border-none focus:ring-2 focus:ring-accent text-sm md:text-base"
              >
                {ROUTES.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="quick-date" className="text-xs font-bold uppercase tracking-wider text-gray-500">Datums</label>
              <input 
                id="quick-date"
                type="date" 
                value={quickBooking.date}
                onChange={(e) => setQuickBooking({ ...quickBooking, date: e.target.value })}
                className="w-full p-3 bg-gray-50 rounded-lg border-none focus:ring-2 focus:ring-accent text-sm md:text-base" 
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="quick-participants" className="text-xs font-bold uppercase tracking-wider text-gray-500">Dalībnieki</label>
              <input 
                id="quick-participants"
                type="number" 
                min="1" 
                value={quickBooking.participants}
                onChange={(e) => setQuickBooking({ ...quickBooking, participants: parseInt(e.target.value) })}
                className="w-full p-3 bg-gray-50 rounded-lg border-none focus:ring-2 focus:ring-accent text-sm md:text-base" 
              />
            </div>
            <button type="submit" className="btn-primary w-full text-center py-4 text-sm md:text-base font-bold">
              Pārbaudīt pieejamību
            </button>
          </form>
        </div>
      </section>

      {/* Social Proof */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-48 md:pt-32">
        <div className="flex flex-wrap justify-center gap-12 items-center opacity-60 grayscale hover:grayscale-0 transition-all">
          <div className="flex items-center gap-2 text-2xl font-bold"><Star className="text-accent fill-accent" /> 4.9/5 Google</div>
          <div className="flex items-center gap-2 text-2xl font-bold"><CheckCircle2 className="text-primary" /> 5000+ Laimīgi braucēji</div>
          <div className="flex items-center gap-2 text-2xl font-bold"><Shield className="text-primary" /> Drošības sertifikāts</div>
        </div>
      </section>

      {/* Top Routes */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl">Mūsu populārākie maršruti</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Rūpīgi izvēlēti braucieni katrai gaumei. No mierīgas atpūtas ģimenei līdz aizraujošām krācēm.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ROUTES.map((route) => (
            <motion.div 
              key={route.id}
              whileHover={{ y: -10 }}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={route.images[0]} 
                  alt={route.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-primary">
                  {route.difficulty}
                </div>
              </div>
              <div className="p-8 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-accent font-bold text-sm uppercase tracking-wider">{route.river}</p>
                    <h3 className="text-xl mt-1">{route.name}</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 text-xs uppercase">No</p>
                    <p className="text-2xl font-bold text-primary">{formatPrice(route.price)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1"><Map size={16} /> {route.duration}</span>
                </div>
                <Link to={`/routes/${route.id}`} className="btn-secondary w-full text-center block">
                  Rezervēt braucienu
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl">Kāpēc izvēlēties mūs?</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="bg-primary/10 p-3 rounded-xl h-fit">
                    <Truck className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl mb-2">Pārdomāta loģistika</h3>
                    <p className="text-gray-600">Mēs sagaidām jūs finišā un nogādājam atpakaļ pie jūsu auto. Jums nav jāuztraucas par atgriešanos.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-primary/10 p-3 rounded-xl h-fit">
                    <Shield className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl mb-2">Premium ekipējums</h3>
                    <p className="text-gray-600">Mēs izmantojam tikai augstākās kvalitātes laivas, kas ir stabilas, ērtas un regulāri koptas.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-primary/10 p-3 rounded-xl h-fit">
                    <Star className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl mb-2">Vietējā pieredze</h3>
                    <p className="text-gray-600">Mūsu komanda pārzina katru upes līkumu. Mēs sniegsim labākos padomus jūsu braucienam.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=1000" 
                alt="Mūsu ekipējums" 
                className="rounded-3xl shadow-2xl"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-8 -left-8 bg-accent text-white p-8 rounded-2xl shadow-xl hidden md:block">
                <p className="text-4xl font-bold">15+</p>
                <p className="font-medium">Gadu pieredze</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl text-center mb-12">Biežāk uzdotie jautājumi</h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-gray-200 rounded-2xl overflow-hidden">
              <button 
                className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              >
                <span className="font-bold text-lg">{faq.q}</span>
                <ChevronDown className={cn("transition-transform", openFaq === idx && "rotate-180")} />
              </button>
              {openFaq === idx && (
                <div className="p-6 pt-0 text-gray-600 border-t border-gray-100">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary rounded-3xl p-12 md:p-24 text-center text-white space-y-8 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <Waves className="w-full h-full scale-150" />
          </div>
          <h2 className="text-4xl md:text-6xl relative z-10">Gatavi nākamajam piedzīvojumam?</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto relative z-10">
            Rezervējiet laivu braucienu jau šodien un izbaudiet Latvijas upju dabisko skaistumu.
          </p>
          <div className="relative z-10">
            <Link to="/routes" className="btn-primary inline-flex items-center gap-2 text-xl px-12 py-5">
              Rezervēt tūlīt <ArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
