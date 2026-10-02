import React from 'react'
import { Link } from 'react-router-dom'
import { Printer, Users, Truck, Clock, IndianRupee, MapPin, Mail, MessageCircle, ArrowLeft } from 'lucide-react'

export default function AboutUs() {
  return (
    <div className="flex-1 w-full flex flex-col font-sans">
      
      {/* HERO SECTION - DARK PAPER */}
      <div className="bg-[#1a1917] pt-24 pb-32 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#d4cebd] via-[#1a1917] to-[#1a1917]"></div>
        <div className="relative z-10">
          <h1 className="text-5xl sm:text-7xl font-black text-[#d4cebd] tracking-tighter leading-tight max-w-4xl mx-auto">
            The Story Behind<br className="hidden sm:block" />
            <span className="text-white">Print Studio.</span>
          </h1>
          <p className="text-[#a09c91] text-lg sm:text-2xl max-w-2xl mx-auto mt-8 font-medium font-serif italic">
            Built by students, for students. Redefining campus convenience.
          </p>
        </div>
      </div>

      {/* TORN PAPER SVG TRANSITION */}
      <div className="w-full -mt-8 relative z-20">
        <svg viewBox="0 0 1440 48" className="w-full h-8 sm:h-12 fill-[#d4cebd] preserve-3d" preserveAspectRatio="none">
          <path d="M0 48h1440V0c-25.6 0-51.2 12-76.8 16-25.6 4-51.2-4-76.8 0-25.6 4-51.2 16-76.8 20-25.6 4-51.2-4-76.8 0-25.6 4-51.2 12-76.8 16-25.6 4-51.2-4-76.8 0-25.6 4-51.2 16-76.8 20-25.6 4-51.2-4-76.8 0-25.6 4-51.2 12-76.8 16-25.6 4-51.2-4-76.8 0v48z"></path>
        </svg>
      </div>

      {/* MAIN CONTENT - LIGHT PAPER */}
      <div className="bg-[#d4cebd] flex-1 w-full text-[#1a1917] pb-24">
        <div className="max-w-5xl mx-auto px-4 pt-12">
          
          <Link to="/" className="inline-flex items-center gap-2 text-[#5a5750] hover:text-[#1a1917] font-bold mb-12 transition-colors">
            <ArrowLeft className="w-5 h-5" /> Back to Store
          </Link>

          {/* NARRATIVE & ORIGIN */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold font-serif text-[#1a1917] mb-8 [text-shadow:-1px_-1px_1px_rgba(0,0,0,0.2),_1px_1px_1px_rgba(255,255,255,0.8)] border-b border-black/10 pb-4">
              Narrative & Origin
            </h2>
            <div className="bg-[#cbc4b1] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),_inset_-1px_-1px_2px_rgba(255,255,255,0.7)] rounded-3xl p-8 sm:p-12 text-lg text-[#3a3832] font-medium leading-relaxed space-y-6 border border-black/5">
              <p>
                Print Studio is a self-funded, independent initiative started by <strong className="text-[#1a1917]">Anant Thakkur</strong> and <strong className="text-[#1a1917]">Sribendu Prasad Muduli</strong> to solve a daily frustration faced by every engineering student: the sheer hassle of overpriced, slow, and inconvenient printing.
              </p>
              <p>
                We noticed students wasting precious time standing in long queues, paying premium rates for basic assignments, and struggling to procure essential gear like registers and scientific calculators during peak submission weeks. We knew there had to be a better, more unified way.
              </p>
              <p className="text-xl font-serif italic text-[#c25134] pt-4 font-bold border-t border-black/10">
                "Our mission is simple: Provide fellow engineering students with a seamless, highly affordable alternative that delivers straight to their hands."
              </p>
            </div>
          </section>

          {/* UNIQUE SELLING PROPOSITION (USP) */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold font-serif text-[#1a1917] mb-8 [text-shadow:-1px_-1px_1px_rgba(0,0,0,0.2),_1px_1px_1px_rgba(255,255,255,0.8)] border-b border-black/10 pb-4">
              The Print Studio Advantage
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-[#cbc4b1] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),_inset_-1px_-1px_2px_rgba(255,255,255,0.7)] rounded-3xl p-8 text-center flex flex-col items-center gap-4">
                <div className="bg-[#1a1917] p-4 rounded-full text-[#d4cebd] shadow-lg"><Truck className="w-8 h-8" /></div>
                <h3 className="text-xl font-bold text-[#1a1917] font-serif">Hand-to-Hand</h3>
                <p className="text-[#5a5750] font-medium text-sm leading-relaxed">Direct campus delivery. Order from your hostel bed, and we’ll bring it straight to your hands.</p>
              </div>
              <div className="bg-[#cbc4b1] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),_inset_-1px_-1px_2px_rgba(255,255,255,0.7)] rounded-3xl p-8 text-center flex flex-col items-center gap-4">
                <div className="bg-[#1a1917] p-4 rounded-full text-[#d4cebd] shadow-lg"><Clock className="w-8 h-8" /></div>
                <h3 className="text-xl font-bold text-[#1a1917] font-serif">Zero Wait Times</h3>
                <p className="text-[#5a5750] font-medium text-sm leading-relaxed">No more standing in crowded campus shop lines. Pre-order online and track your batch.</p>
              </div>
              <div className="bg-[#cbc4b1] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),_inset_-1px_-1px_2px_rgba(255,255,255,0.7)] rounded-3xl p-8 text-center flex flex-col items-center gap-4">
                <div className="bg-[#c25134] p-4 rounded-full text-[#d4cebd] shadow-lg"><IndianRupee className="w-8 h-8" /></div>
                <h3 className="text-xl font-bold text-[#1a1917] font-serif">Aggressive Pricing</h3>
                <p className="text-[#5a5750] font-medium text-sm leading-relaxed">We undercut standard market rates to pass the maximum savings directly to students.</p>
              </div>
            </div>
          </section>

          {/* TEAM INTRODUCTIONS */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold font-serif text-[#1a1917] mb-8 [text-shadow:-1px_-1px_1px_rgba(0,0,0,0.2),_1px_1px_1px_rgba(255,255,255,0.8)] border-b border-black/10 pb-4">
              The Founders
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-[#cbc4b1] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),_inset_-1px_-1px_2px_rgba(255,255,255,0.7)] rounded-3xl p-8 flex items-center gap-6">
                <div className="w-20 h-20 bg-[#1a1917] rounded-full flex shrink-0 items-center justify-center shadow-lg">
                  <span className="text-3xl font-serif text-[#d4cebd] font-black">AT</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#1a1917] font-serif">Anant Thakkur</h3>
                  <p className="text-[#c25134] font-bold text-sm tracking-wide uppercase mt-1">Co-Founder & Developer</p>
                  <p className="text-[#5a5750] text-sm font-medium mt-2 leading-relaxed">Architects the digital storefront, ensuring the ordering pipeline is completely frictionless.</p>
                </div>
              </div>
              <div className="bg-[#cbc4b1] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),_inset_-1px_-1px_2px_rgba(255,255,255,0.7)] rounded-3xl p-8 flex items-center gap-6">
                <div className="w-20 h-20 bg-[#1a1917] rounded-full flex shrink-0 items-center justify-center shadow-lg">
                  <span className="text-3xl font-serif text-[#d4cebd] font-black">SM</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#1a1917] font-serif">Sribendu P. Muduli</h3>
                  <p className="text-[#c25134] font-bold text-sm tracking-wide uppercase mt-1">Co-Founder & Operations</p>
                  <p className="text-[#5a5750] text-sm font-medium mt-2 leading-relaxed">Manages inventory, supplier logistics, and oversees the hand-to-hand delivery network.</p>
                </div>
              </div>
            </div>
          </section>

          {/* SOCIAL PROOF & MILESTONES */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold font-serif text-[#1a1917] mb-8 [text-shadow:-1px_-1px_1px_rgba(0,0,0,0.2),_1px_1px_1px_rgba(255,255,255,0.8)] border-b border-black/10 pb-4">
              Our Journey
            </h2>
            <div className="bg-[#1a1917] rounded-3xl p-8 sm:p-12 shadow-2xl">
              <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                <div className="bg-[#c25134] p-5 rounded-2xl shrink-0 shadow-lg">
                  <Printer className="w-10 h-10 text-[#d4cebd]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold font-serif text-[#d4cebd]">From a  room idea to our first 100 orders.</h3>
                  <p className="text-[#a09c91] mt-3 leading-relaxed font-medium">
                    What started as a late-night discussion over expensive lab manual prints and long queues has quickly scaled into a campus-wide network. Print Studio is actively growing, constantly pushing to expand our catalog and slash prices even further.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CONTACT INFO */}
          <section className="mb-24">
            <h2 className="text-4xl font-bold font-serif text-[#1a1917] mb-8 [text-shadow:-1px_-1px_1px_rgba(0,0,0,0.2),_1px_1px_1px_rgba(255,255,255,0.8)] border-b border-black/10 pb-4">
              Get In Touch
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <a href="https://wa.me/917982350793" target="_blank" rel="noreferrer" className="flex items-center gap-4 bg-[#cbc4b1] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),_inset_-1px_-1px_2px_rgba(255,255,255,0.7)] p-6 rounded-2xl hover:ring-2 ring-[#c25134] transition-all">
                <MessageCircle className="w-8 h-8 text-[#1a1917]" />
                <div>
                  <p className="text-sm text-[#5a5750] font-bold uppercase tracking-wider">WhatsApp Us</p>
                  <p className="text-lg font-bold text-[#1a1917]">+91 79823 50793</p>
                </div>
              </a>
              <div className="flex items-center gap-4 bg-[#cbc4b1] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),_inset_-1px_-1px_2px_rgba(255,255,255,0.7)] p-6 rounded-2xl">
                <Mail className="w-8 h-8 text-[#1a1917]" />
                <div>
                  <p className="text-sm text-[#5a5750] font-bold uppercase tracking-wider">Email Us</p>
                  <p className="text-lg font-bold text-[#1a1917]">support@printstudio.in</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-[#cbc4b1] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),_inset_-1px_-1px_2px_rgba(255,255,255,0.7)] p-6 rounded-2xl">
                <MapPin className="w-8 h-8 text-[#1a1917]" />
                <div>
                  <p className="text-sm text-[#5a5750] font-bold uppercase tracking-wider">Location</p>
                  <p className="text-lg font-bold text-[#1a1917]">Sweet Homes</p>
                </div>
              </div>
            </div>
          </section>

          {/* SECRET QUOTE */}
          <div className="text-center pb-8 border-t border-black/10 pt-12">
            <p className="text-[#5a5750]/70 font-serif italic text-sm font-semibold tracking-wide">
              🤫 "Legend says if the faculty finds out about these prices, the matrix will collapse. Let's keep this our little secret."
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}