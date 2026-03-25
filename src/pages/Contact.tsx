import React from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, MessageSquare, Send } from 'lucide-react';

export default function Contact() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-24">
      <div className="text-center space-y-4">
        <h1 className="text-5xl md:text-7xl">Get in Touch</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">Have questions about a route or need a custom group booking? We're here to help.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <a href="tel:+37120000000" className="p-8 bg-gray-50 rounded-3xl space-y-4 hover:bg-primary hover:text-white transition-all group">
              <Phone className="text-accent group-hover:text-white" size={32} />
              <h3 className="text-xl font-bold">Call Us</h3>
              <p className="opacity-70">+371 20 000 000</p>
            </a>
            <a href="mailto:info@kraculaivas.lv" className="p-8 bg-gray-50 rounded-3xl space-y-4 hover:bg-primary hover:text-white transition-all group">
              <Mail className="text-accent group-hover:text-white" size={32} />
              <h3 className="text-xl font-bold">Email Us</h3>
              <p className="opacity-70">info@kraculaivas.lv</p>
            </a>
          </div>

          <div className="p-8 bg-gray-50 rounded-3xl space-y-6">
            <h3 className="text-2xl font-bold flex items-center gap-2">
              <MapPin className="text-accent" /> Our Base Location
            </h3>
            <div className="aspect-video rounded-2xl overflow-hidden bg-gray-200">
              {/* Simulated Map */}
              <div className="w-full h-full flex items-center justify-center text-gray-400 font-medium italic">
                Interactive Google Map would be here
              </div>
            </div>
            <p className="text-gray-600">Sigulda, Peldu iela 2. Open daily 09:00 - 20:00 during the season (May - September).</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 md:p-12 space-y-8">
          <h2 className="text-3xl">Send us a message</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Name</label>
                <input type="text" className="w-full p-4 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-accent" placeholder="Your name" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Email</label>
                <input type="email" className="w-full p-4 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-accent" placeholder="Your email" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Message</label>
              <textarea rows={5} className="w-full p-4 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-accent" placeholder="How can we help?"></textarea>
            </div>
            <button type="submit" className="btn-primary w-full py-5 text-xl flex items-center justify-center gap-2">
              Send Message <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
