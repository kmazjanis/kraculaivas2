import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ChevronRight, ChevronLeft, CreditCard, User, Package, Calendar, Waves, Loader2, Users } from 'lucide-react';
import { ROUTES } from '../constants';
import { formatPrice, cn } from '../lib/utils';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { toast } from 'sonner';

const EXTRAS = [
  { id: 'dry-bag', name: 'Papildu ūdensizturīgs maiss (20L)', price: 5 },
  { id: 'tent', name: 'Telts 2 personām', price: 15 },
  { id: 'sleeping-bag', name: 'Guļammaiss', price: 10 },
  { id: 'waterproof-phone-case', name: 'Ūdensizturīgs telefona vāciņš', price: 3 },
];

export default function Booking() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [step, setStep] = React.useState(1);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const routeId = searchParams.get('routeId');
  const initialDate = searchParams.get('date') || '';
  const initialParticipants = parseInt(searchParams.get('participants') || '2');

  const route = ROUTES.find(r => r.id === routeId);

  const [formData, setFormData] = React.useState({
    routeId: routeId || '',
    date: initialDate,
    participants: initialParticipants,
    extras: [] as string[],
    customerInfo: {
      name: '',
      email: '',
      phone: '',
    }
  });

  if (!route) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center space-y-8">
        <h1 className="text-4xl">Lūdzu, vispirms izvēlieties maršrutu</h1>
        <button onClick={() => navigate('/routes')} className="btn-primary">Skatīt maršrutus</button>
      </div>
    );
  }

  const totalPrice = (route.price * formData.participants) + 
    formData.extras.reduce((acc, extraId) => acc + (EXTRAS.find(e => e.id === extraId)?.price || 0), 0);

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const bookingData = {
        ...formData,
        totalPrice,
        status: 'confirmed',
        createdAt: serverTimestamp(),
      };
      
      await addDoc(collection(db, 'bookings'), bookingData);
      setStep(4);
      toast.success('Rezervācija apstiprināta!');
    } catch (error) {
      console.error('Booking error:', error);
      toast.error('Neizdevās apstiprināt rezervāciju. Lūdzu, mēģiniet vēlreiz.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { id: 1, name: 'Papildus', icon: Package },
    { id: 2, name: 'Dati', icon: User },
    { id: 3, name: 'Apmaksa', icon: CreditCard },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 space-y-12">
      {/* Progress Bar */}
      {step < 4 && (
        <div className="flex justify-between items-center relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 z-0" />
          {steps.map((s) => (
            <div key={s.id} className="relative z-10 flex flex-col items-center gap-2">
              <div className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center transition-all",
                step >= s.id ? "bg-primary text-white" : "bg-white border-2 border-gray-100 text-gray-400"
              )}>
                <s.icon size={20} />
              </div>
              <span className={cn(
                "text-xs font-bold uppercase tracking-widest",
                step >= s.id ? "text-primary" : "text-gray-400"
              )}>{s.name}</span>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Form Area */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <h2 className="text-3xl">Pievienot papildus</h2>
                <div className="space-y-4">
                  {EXTRAS.map((extra) => (
                    <label 
                      key={extra.id}
                      className={cn(
                        "flex items-center justify-between p-6 rounded-2xl border-2 cursor-pointer transition-all",
                        formData.extras.includes(extra.id) ? "border-accent bg-accent/5" : "border-gray-100 hover:border-gray-200"
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <input 
                          type="checkbox" 
                          className="hidden"
                          checked={formData.extras.includes(extra.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData({ ...formData, extras: [...formData.extras, extra.id] });
                            } else {
                              setFormData({ ...formData, extras: formData.extras.filter(id => id !== extra.id) });
                            }
                          }}
                        />
                        <div className={cn(
                          "w-6 h-6 rounded-md border-2 flex items-center justify-center",
                          formData.extras.includes(extra.id) ? "bg-accent border-accent text-white" : "border-gray-300"
                        )}>
                          {formData.extras.includes(extra.id) && <CheckCircle2 size={16} />}
                        </div>
                        <span className="font-bold text-lg">{extra.name}</span>
                      </div>
                      <span className="font-bold text-primary">+{formatPrice(extra.price)}</span>
                    </label>
                  ))}
                </div>
                <button onClick={handleNext} className="btn-primary w-full py-5 text-xl flex items-center justify-center gap-2">
                  Turpināt uz datiem <ChevronRight />
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <h2 className="text-3xl">Jūsu dati</h2>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Vārds, Uzvārds</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Jānis Bērziņš"
                      value={formData.customerInfo.name}
                      onChange={(e) => setFormData({ ...formData, customerInfo: { ...formData.customerInfo, name: e.target.value } })}
                      className="w-full p-4 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-accent text-lg" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">E-pasts</label>
                    <input 
                      type="email" 
                      required
                      placeholder="janis@piemers.lv"
                      value={formData.customerInfo.email}
                      onChange={(e) => setFormData({ ...formData, customerInfo: { ...formData.customerInfo, email: e.target.value } })}
                      className="w-full p-4 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-accent text-lg" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Telefona numurs</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="+371 20 000 000"
                      value={formData.customerInfo.phone}
                      onChange={(e) => setFormData({ ...formData, customerInfo: { ...formData.customerInfo, phone: e.target.value } })}
                      className="w-full p-4 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-accent text-lg" 
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <button onClick={handleBack} className="btn-secondary bg-gray-100 text-gray-600 hover:bg-gray-200">
                    Atpakaļ
                  </button>
                  <button 
                    onClick={handleNext} 
                    disabled={!formData.customerInfo.name || !formData.customerInfo.email || !formData.customerInfo.phone}
                    className="btn-primary flex-grow py-5 text-xl flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    Turpināt uz apmaksu <ChevronRight />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <h2 className="text-3xl">Apmaksa</h2>
                <div className="p-8 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 text-center space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <CreditCard className="text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Droša apmaksa ar Stripe</h3>
                  <p className="text-gray-500">Šajā demo versijā, nospiežot "Apstiprināt rezervāciju", tiks simulēta veiksmīga apmaksa un jūsu rezervācija tiks saglabāta Firestore datubāzē.</p>
                </div>
                <div className="flex gap-4">
                  <button onClick={handleBack} className="btn-secondary bg-gray-100 text-gray-600 hover:bg-gray-200">
                    Atpakaļ
                  </button>
                  <button 
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="btn-primary flex-grow py-5 text-xl flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? <Loader2 className="animate-spin" /> : <><CheckCircle2 /> Apstiprināt rezervāciju</>}
                  </button>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-8 py-12"
              >
                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 size={48} />
                </div>
                <div className="space-y-2">
                  <h2 className="text-4xl">Rezervācija apstiprināta!</h2>
                  <p className="text-xl text-gray-600">Paldies, ka izvēlējāties Krāču laivas. Apstiprinājuma e-pasts ir nosūtīts uz {formData.customerInfo.email}.</p>
                </div>
                <div className="p-8 bg-gray-50 rounded-3xl text-left space-y-4">
                  <h3 className="font-bold text-lg border-b pb-2">Rezervācijas kopsavilkums</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <p className="text-gray-500">Maršruts:</p>
                    <p className="font-bold text-right">{route.name}</p>
                    <p className="text-gray-500">Datums:</p>
                    <p className="font-bold text-right">{formData.date}</p>
                    <p className="text-gray-500">Dalībnieki:</p>
                    <p className="font-bold text-right">{formData.participants}</p>
                    <p className="text-gray-500">Kopā apmaksāts:</p>
                    <p className="font-bold text-right text-primary text-xl">{formatPrice(totalPrice)}</p>
                  </div>
                </div>
                <div className="flex flex-wrap justify-center gap-4">
                  <button onClick={() => navigate('/')} className="btn-secondary">Atgriezties sākumā</button>
                  <button onClick={() => window.print()} className="btn-primary bg-gray-800 hover:bg-gray-900">Drukāt apstiprinājumu</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sidebar Summary */}
        {step < 4 && (
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 space-y-6 sticky top-32">
              <h3 className="text-xl font-bold">Brauciena kopsavilkums</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <img src={route.images[0]} className="w-20 h-20 rounded-xl object-cover" referrerPolicy="no-referrer" />
                  <div>
                    <p className="text-xs font-bold text-accent uppercase">{route.river}</p>
                    <p className="font-bold leading-tight">{route.name}</p>
                  </div>
                </div>
                
                <div className="space-y-3 pt-4 border-t border-gray-100">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 flex items-center gap-2"><Calendar size={14} /> Datums</span>
                    <span className="font-bold">{formData.date || 'Nav izvēlēts'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 flex items-center gap-2"><Users size={14} /> Dalībnieki</span>
                    <span className="font-bold">{formData.participants}</span>
                  </div>
                </div>

                {formData.extras.length > 0 && (
                  <div className="space-y-2 pt-4 border-t border-gray-100">
                    <p className="text-xs font-bold text-gray-400 uppercase">Papildus</p>
                    {formData.extras.map(id => {
                      const extra = EXTRAS.find(e => e.id === id);
                      return (
                        <div key={id} className="flex justify-between text-sm">
                          <span className="text-gray-500">{extra?.name}</span>
                          <span className="font-bold">{formatPrice(extra?.price || 0)}</span>
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="pt-6 border-t border-gray-100">
                  <div className="flex justify-between items-end">
                    <span className="text-gray-500 font-bold">Kopā</span>
                    <span className="text-3xl font-bold text-primary">{formatPrice(totalPrice)}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-400 justify-center">
                <Waves size={14} /> Krāču laivas droša rezervācija
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
