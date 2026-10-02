import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Printer, ArrowRight } from 'lucide-react'

export default function Storefront() {
  const [showComingSoon, setShowComingSoon] = useState(false)

  return (
    <div className="flex-1 w-full flex flex-col font-sans relative">
      
      {/* FLAGSHIP HERO SECTION - DARK PAPER */}
      <div className="bg-[#1a1917] pt-24 pb-32 px-4 text-center">
        <h1 className="text-6xl sm:text-8xl font-black text-[#d4cebd] tracking-tighter leading-tight max-w-5xl mx-auto">
          Flawless Prints.<br className="hidden sm:block" />
          <span className="text-white">Delivered to your hand.</span>
        </h1>
        <p className="text-[#a09c91] text-lg sm:text-2xl max-w-2xl mx-auto mt-8 font-medium font-serif italic">
          Premium document printing with hand-to-hand campus delivery. Skip the line forever.
        </p>
        <div className="mt-14">
          <Link 
            to="/print" 
            className="inline-flex items-center gap-3 bg-[#c25134] hover:bg-[#a6432a] text-[#d4cebd] font-bold text-xl py-5 px-10 rounded-2xl transition-all shadow-lg tracking-wide hover:scale-105"
          >
            <Printer className="w-6 h-6" />
            Print Document
          </Link>
        </div>
      </div>

      {/* TORN PAPER SVG TRANSITION */}
      <div className="w-full -mt-8 relative z-10">
        <svg viewBox="0 0 1440 48" className="w-full h-8 sm:h-12 fill-[#d4cebd] preserve-3d" preserveAspectRatio="none">
          <path d="M0 48h1440V0c-25.6 0-51.2 12-76.8 16-25.6 4-51.2-4-76.8 0-25.6 4-51.2 16-76.8 20-25.6 4-51.2-4-76.8 0-25.6 4-51.2 12-76.8 16-25.6 4-51.2-4-76.8 0-25.6 4-51.2 16-76.8 20-25.6 4-51.2-4-76.8 0-25.6 4-51.2 12-76.8 16-25.6 4-51.2-4-76.8 0v48z"></path>
        </svg>
      </div>

      {/* CATALOG GRID - LIGHT PAPER */}
      <div className="bg-[#d4cebd] flex-1 w-full text-[#1a1917] pb-32">
        <div className="max-w-6xl mx-auto px-4 pt-16">
          
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-serif text-[#1a1917] [text-shadow:-1px_-1px_1px_rgba(0,0,0,0.2),_1px_1px_1px_rgba(255,255,255,0.8)]">
              Stationery & Gear
            </h2>
            <p className="text-[#5a5750] font-medium text-lg mt-2">Essential tools for your semester.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Calculator Card */}
            <Link 
              to="/calculators" 
              className="group block bg-[#cbc4b1] rounded-3xl overflow-hidden shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),_inset_-1px_-1px_2px_rgba(255,255,255,0.7)] transition-all hover:ring-4 ring-[#c25134]/50"
            >
              <div className="h-72 overflow-hidden border-b border-black/5 bg-[#1a1917]">
                <img 
                  src="https://images.unsplash.com/photo-1587145820266-a5951ee6f620?q=80&w=800&auto=format&fit=crop" 
                  alt="Scientific Calculator" 
                  className="w-full h-full object-cover grayscale contrast-125 mix-blend-multiply opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
                />
              </div>
              <div className="p-8 flex justify-between items-end">
                <div>
                  <h3 className="text-3xl font-bold text-[#1a1917] font-serif [text-shadow:-1px_-1px_1px_rgba(0,0,0,0.2),_1px_1px_1px_rgba(255,255,255,0.8)]">
                    Calculators
                  </h3>
                  <p className="text-[#5a5750] mt-2 font-medium">Standard engineering requirement.</p>
                </div>
                <div className="text-[#c25134] p-3 rounded-full bg-[#1a1917] shadow-lg group-hover:bg-[#c25134] group-hover:text-[#d4cebd] transition-colors">
                  <ArrowRight className="w-6 h-6" />
                </div>
              </div>
            </Link>

            {/* Register Card (Modal Trigger) */}
            <div 
              onClick={() => setShowComingSoon(true)}
              className="group block cursor-pointer bg-[#cbc4b1] rounded-3xl overflow-hidden shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),_inset_-1px_-1px_2px_rgba(255,255,255,0.7)] transition-all hover:ring-4 ring-[#c25134]/50"
            >
              <div className="h-72 overflow-hidden border-b border-black/5 bg-[#1a1917]">
                <img 
                  src="https://images.unsplash.com/photo-1531346878377-a541e4ab04ce?q=80&w=800&auto=format&fit=crop" 
                  alt="Premium Registers" 
                  className="w-full h-full object-cover grayscale contrast-125 mix-blend-multiply opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
                />
              </div>
              <div className="p-8 flex justify-between items-end">
                <div>
                  <h3 className="text-3xl font-bold text-[#1a1917] font-serif [text-shadow:-1px_-1px_1px_rgba(0,0,0,0.2),_1px_1px_1px_rgba(255,255,255,0.8)]">
                    Registers
                  </h3>
                  <p className="text-[#5a5750] mt-2 font-medium">High GSM paper & durable binding.</p>
                </div>
                <div className="text-[#c25134] p-3 rounded-full bg-[#1a1917] shadow-lg group-hover:bg-[#c25134] group-hover:text-[#d4cebd] transition-colors">
                  <ArrowRight className="w-6 h-6" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* COMING SOON MODAL */}
      {showComingSoon && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1a1917]/60 backdrop-blur-sm">
          <div className="bg-[#d4cebd] text-[#1a1917] p-8 rounded-2xl max-w-sm w-full mx-4 shadow-[inset_2px_2px_5px_rgba(255,255,255,0.7),_5px_5px_15px_rgba(0,0,0,0.5)] text-center border border-black/5">
            <h2 className="text-3xl font-bold font-serif mb-4 [text-shadow:-1px_-1px_1px_rgba(0,0,0,0.1),_1px_1px_1px_rgba(255,255,255,1)]">
              Coming Soon
            </h2>
            <p className="text-[#5a5750] font-medium text-lg leading-relaxed mb-8">
              Our premium college registers are currently being restocked. Please check back soon!
            </p>
            <button 
              onClick={() => setShowComingSoon(false)}
              className="w-full bg-[#1a1917] hover:bg-[#2a2927] text-[#d4cebd] font-bold py-3.5 px-6 rounded-xl transition-all shadow-lg tracking-wide"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  )
}