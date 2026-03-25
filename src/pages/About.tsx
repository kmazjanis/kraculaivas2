import React from 'react';
import { motion } from 'motion/react';
import { Shield, Star, Users, MapPin, Waves } from 'lucide-react';

export default function About() {
  return (
    <div className="space-y-24 pb-24">
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=2000" 
            alt="Par mums" 
            className="w-full h-full object-cover brightness-50"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10 text-center text-white space-y-4">
          <h1 className="text-5xl md:text-7xl">Par Krāču laivām</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">Uzticamība, drošība un vietējā pieredze kopš 2010. gada.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <h2 className="text-4xl">Kas ir Krāču laivas?</h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Krāču laivas dibināja kaislīgi upju entuziasti, un gadu gaitā mēs esam izauguši no nelielas vietējās nomas par vienu no Latvijas uzticamākajiem laivošanas pakalpojumu sniedzējiem. Mēs ticam, ka ikvienam ir jāizbauda mūsu upju miers un spēks.
          </p>
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-2">
              <p className="text-4xl font-bold text-primary">15k+</p>
              <p className="text-gray-500 font-medium">Noorganizēti braucieni</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold text-primary">100+</p>
              <p className="text-gray-500 font-medium">Premium laivas</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <img src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=400" className="rounded-2xl shadow-lg mt-12" referrerPolicy="no-referrer" />
          <img src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=400" className="rounded-2xl shadow-lg" referrerPolicy="no-referrer" />
        </div>
      </section>

      <section className="bg-primary text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-16">
          <h2 className="text-4xl">Mūsu vērtības</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto">
                <Shield className="text-accent" />
              </div>
              <h3 className="text-2xl">Drošība pirmajā vietā</h3>
              <p className="text-gray-300">Mēs nekad nepieļaujam kompromisus attiecībā uz drošību. Katrs brauciens ietver instruktāžu un sertificētu ekipējumu.</p>
            </div>
            <div className="space-y-4">
              <div className="bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto">
                <Waves className="text-accent" />
              </div>
              <h3 className="text-2xl">Cieņa pret upi</h3>
              <p className="text-gray-300">Mēs veicinām videi draudzīgu tūrismu un mācām saviem klientiem neatstāt pēdas dabā.</p>
            </div>
            <div className="space-y-4">
              <div className="bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto">
                <Users className="text-accent" />
              </div>
              <h3 className="text-2xl">Kopiena</h3>
              <p className="text-gray-300">Mēs atbalstām vietējās kopienas pie upēm, kurās darbojamies.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
