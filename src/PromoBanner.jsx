import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from './supabaseClient'
import { X, Sparkles, HelpCircle, ArrowRight, CheckCircle2 } from 'lucide-react'

export default function PromoBanner() {
  const [spotsLeft, setSpotsLeft] = useState(75)
  const [isDismissed, setIsDismissed] = useState(false)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    fetchSpots()
  }, [])

  const fetchSpots = async () => {
    try {
      const { count, error } = await supabase
        .from('distributors')
        .select('*', { count: 'exact', head: true })

      if (!error && count !== null) {
        setSpotsLeft(Math.max(0, 75 - count))
      }
    } catch (err) {
      console.error('Error fetching distributor count:', err)
    }
  }

  if (isDismissed) return null

  return (
    <>
      {/* FLOATING PROMO BANNER (Bottom Right) */}
      <aside 
        aria-label="Campus Distributor Announcement"
        className="fixed bottom-5 right-5 z-40 max-w-sm w-[calc(100vw-2.5rem)] bg-[#1a1917]/95 text-[#d4cebd] backdrop-blur-md border border-[#d4cebd]/20 rounded-2xl p-5 shadow-[0_10px_30px_rgba(0,0,0,0.5)] font-sans transition-all animate-in fade-in slide-in-from-bottom-4 duration-500"
      >
        <button
          onClick={() => setIsDismissed(true)}
          className="absolute top-3 right-3 text-[#a09c91] hover:text-[#d4cebd] p-1 rounded-lg transition-colors"
          title="Dismiss banner"
          aria-label="Dismiss banner"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-3 pr-6">
          <div className="bg-[#c25134] text-[#d4cebd] p-2 rounded-xl shrink-0 shadow-md">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider bg-[#c25134]/20 text-[#c25134] px-2 py-0.5 rounded-full border border-[#c25134]/30">
                💸 Earn Pocket Money
              </span>
            </div>
            <p className="text-sm font-bold text-white leading-snug">
              Cheapest Prints on Campus + Earn ₹5 per 20 Pages!
            </p>
            <p className="text-xs text-[#a09c91] mt-1 font-medium">
              Limited to 75 Distributors —{' '}
              <span className="text-[#c25134] font-bold">
                [{spotsLeft > 0 ? `${spotsLeft}/75 Spots Left` : 'All 75 Spots Claimed'}]
              </span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-[#d4cebd]/10">
          <Link
            to="/partner"
            className="flex-1 bg-[#c25134] hover:bg-[#a6432a] text-[#d4cebd] text-xs font-bold py-2.5 px-3 rounded-xl transition-all text-center flex items-center justify-center gap-1 shadow-md tracking-wide"
          >
            Get Your Code <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={() => setShowModal(true)}
            className="bg-[#d4cebd]/10 hover:bg-[#d4cebd]/20 text-[#d4cebd] text-xs font-bold py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-1 border border-[#d4cebd]/10"
          >
            <HelpCircle className="w-3.5 h-3.5" /> How It Works
          </button>
        </div>
      </aside>

      {/* HOW IT WORKS MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1a1917]/70 backdrop-blur-sm p-4 font-sans animate-in fade-in duration-300">
          <div className="bg-[#d4cebd] text-[#1a1917] p-8 md:p-10 rounded-3xl max-w-lg w-full shadow-[inset_2px_2px_5px_rgba(255,255,255,0.7),_5px_5px_25px_rgba(0,0,0,0.5)] border border-black/5 relative max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-5 right-5 text-[#5a5750] hover:text-[#1a1917] p-1.5 rounded-full hover:bg-black/5 transition-colors"
              title="Close modal"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center mb-6">
              <span className="text-xs font-bold uppercase tracking-wider bg-[#1a1917] text-[#d4cebd] px-3 py-1 rounded-full shadow-sm">
                Campus Partner Program
              </span>
              <h2 className="text-3xl font-black font-serif text-[#1a1917] mt-3 [text-shadow:-1px_-1px_1px_rgba(0,0,0,0.1),_1px_1px_1px_rgba(255,255,255,1)]">
                How It Works
              </h2>
              <p className="text-[#5a5750] text-sm font-medium mt-1">
                Help friends skip print shop queues while earning pocket money on every single order.
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="bg-[#cbc4b1] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),_inset_-1px_-1px_2px_rgba(255,255,255,0.7)] p-4 rounded-2xl flex items-start gap-3 border border-black/5">
                <div className="bg-[#1a1917] text-[#d4cebd] w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">1</div>
                <div>
                  <h4 className="font-bold text-[#1a1917] text-sm">Claim Your 6-Char Partner Code</h4>
                  <p className="text-xs text-[#5a5750] mt-0.5 font-medium">Register with your name & roll number. Free, instant, and strictly capped at 75 partners.</p>
                </div>
              </div>

              <div className="bg-[#cbc4b1] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),_inset_-1px_-1px_2px_rgba(255,255,255,0.7)] p-4 rounded-2xl flex items-start gap-3 border border-black/5">
                <div className="bg-[#1a1917] text-[#d4cebd] w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">2</div>
                <div>
                  <h4 className="font-bold text-[#1a1917] text-sm">Share on WhatsApp & Class Groups</h4>
                  <p className="text-xs text-[#5a5750] mt-0.5 font-medium">Use the one-click WhatsApp button to share your code with classmates & hostel wingmates.</p>
                </div>
              </div>

              <div className="bg-[#cbc4b1] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),_inset_-1px_-1px_2px_rgba(255,255,255,0.7)] p-4 rounded-2xl flex items-start gap-3 border border-black/5">
                <div className="bg-[#1a1917] text-[#d4cebd] w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">3</div>
                <div>
                  <h4 className="font-bold text-[#1a1917] text-sm">Earn ₹5 for Every 20 Pages</h4>
                  <p className="text-xs text-[#5a5750] mt-0.5 font-medium">Whenever anyone completes an order with your code, you earn ₹5 cash per 20 pages printed.</p>
                </div>
              </div>

              <div className="bg-[#cbc4b1] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),_inset_-1px_-1px_2px_rgba(255,255,255,0.7)] p-4 rounded-2xl flex items-start gap-3 border border-black/5">
                <div className="bg-[#1a1917] text-[#d4cebd] w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">4</div>
                <div>
                  <h4 className="font-bold text-[#1a1917] text-sm">Direct UPI Payouts & Live Tracker</h4>
                  <p className="text-xs text-[#5a5750] mt-0.5 font-medium">Check your live unpaid balance anytime on the portal. Payouts are transferred directly via UPI.</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/partner"
                onClick={() => setShowModal(false)}
                className="flex-1 bg-[#c25134] hover:bg-[#a6432a] text-[#d4cebd] font-bold py-3.5 px-6 rounded-xl transition-all text-center shadow-lg tracking-wide text-sm"
              >
                Join Now ({spotsLeft} Spots Left)
              </Link>
              <button
                onClick={() => setShowModal(false)}
                className="bg-[#1a1917] hover:bg-[#2a2927] text-[#d4cebd] font-bold py-3.5 px-6 rounded-xl transition-all text-sm"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
