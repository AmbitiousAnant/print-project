import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from './supabaseClient'
import { 
  ArrowLeft, User, FileText, Phone, Sparkles, Copy, Check, 
  Share2, IndianRupee, Layers, Clock, AlertCircle, CheckCircle2, MessageCircle 
} from 'lucide-react'

// Replace with your personal WhatsApp number if you prefer a different admin line
const ADMIN_WHATSAPP_NUMBER = '917982350793'

export default function PartnerPortal() {
  // Live spots count
  const [distributorCount, setDistributorCount] = useState(0)
  const [loadingCount, setLoadingCount] = useState(true)

  // Section A: Registration state
  const [regForm, setRegForm] = useState({
    owner_name: '',
    owner_roll_no: '',
    owner_contact: ''
  })
  const [regLoading, setRegLoading] = useState(false)
  const [regError, setRegError] = useState('')
  const [generatedPartner, setGeneratedPartner] = useState(null)
  const [copiedCode, setCopiedCode] = useState(false)

  // Section B: Two-Factor Earnings tracker state
  const [trackCode, setTrackCode] = useState('')
  const [trackPhone, setTrackPhone] = useState('')
  const [trackLoading, setTrackLoading] = useState(false)
  const [trackError, setTrackError] = useState('')
  const [partnerStats, setPartnerStats] = useState(null)
  const [copiedTrackCode, setCopiedTrackCode] = useState(false)

  useEffect(() => {
    fetchCount()
  }, [])

  const fetchCount = async () => {
    try {
      setLoadingCount(true)
      const { count, error } = await supabase
        .from('distributors')
        .select('*', { count: 'exact', head: true })

      if (!error && count !== null) {
        setDistributorCount(count)
      }
    } catch (err) {
      console.error('Error fetching distributor count:', err)
    } finally {
      setLoadingCount(false)
    }
  }

  // --- 6-Character Code Generator ---
  const generateUniqueCode = async (fullName) => {
    const firstName = fullName.trim().split(' ')[0].replace(/[^a-zA-Z]/g, '').toUpperCase()
    let prefix = firstName.slice(0, 4)
    while (prefix.length < 4) {
      prefix += 'X'
    }

    let code = ''
    let isUnique = false
    let attempts = 0

    while (!isUnique && attempts < 10) {
      attempts++
      const randomDigits = Math.floor(10 + Math.random() * 90) // 10 to 99
      code = `${prefix}${randomDigits}`

      const { data } = await supabase
        .from('distributors')
        .select('id')
        .eq('referral_code', code)
        .maybeSingle()

      if (!data) {
        isUnique = true
      }
    }

    return code
  }

  // --- One-Click Promotional WhatsApp Share ---
  const handlePromoteOnWhatsApp = (code) => {
    const siteUrl = window.location.origin
    const shareText = `📄 *Need Lab Manuals, Assignments, or Calculators?*\nSkip the print shop queue and get the cheapest prints on campus delivered hand-to-hand via *Print Studio*! 🚀\n\n🎟️ Use my code *${code}* at checkout:\n🔗 ${siteUrl}`
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank')
  }

  // --- Direct WhatsApp Claim Payout ---
  const handleClaimPayout = (partner) => {
    const claimText = `Hi Print Studio Admin! 👋\nI would like to claim my distributor earnings.\n\n👤 *Name:* ${partner.owner_name}\n🎓 *Roll No:* ${partner.owner_roll_no}\n🎟️ *Referral Code:* ${partner.referral_code}\n📄 *Total Pages Referred:* ${partner.total_pages_referred || 0}\n💰 *Unpaid Balance to Claim:* ₹${partner.pending_earnings || 0}`
    window.open(`https://wa.me/${ADMIN_WHATSAPP_NUMBER}?text=${encodeURIComponent(claimText)}`, '_blank')
  }

  // --- Copy Code to Clipboard ---
  const handleCopyCode = async (code, isTrack = false) => {
    try {
      await navigator.clipboard.writeText(code)
      if (isTrack) {
        setCopiedTrackCode(true)
        setTimeout(() => setCopiedTrackCode(false), 2500)
      } else {
        setCopiedCode(true)
        setTimeout(() => setCopiedCode(false), 2500)
      }
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  // --- Registration Handler ---
  const handleRegister = async (e) => {
    e.preventDefault()
    setRegError('')
    setGeneratedPartner(null)

    if (distributorCount >= 75) {
      setRegError('All 75 distributor spots are already taken! Registrations are currently closed.')
      return
    }

    const name = regForm.owner_name.trim()
    const rollNo = regForm.owner_roll_no.trim().toUpperCase()
    const contact = regForm.owner_contact.trim()

    if (contact.length !== 10) {
      setRegError('Please enter a valid 10-digit WhatsApp number.')
      return
    }

    setRegLoading(true)

    try {
      // 1. Check if Roll Number already registered
      const { data: existingRoll } = await supabase
        .from('distributors')
        .select('owner_name, referral_code')
        .eq('owner_roll_no', rollNo)
        .maybeSingle()

      if (existingRoll) {
        throw new Error(`Roll Number ${rollNo} is already registered with code "${existingRoll.referral_code}". Use the Earnings Tracker below to see your stats!`)
      }

      // 2. Check if Contact already registered
      const formattedContact = `+91${contact}`
      const { data: existingContact } = await supabase
        .from('distributors')
        .select('referral_code')
        .eq('owner_contact', formattedContact)
        .maybeSingle()

      if (existingContact) {
        throw new Error(`WhatsApp number is already registered with code "${existingContact.referral_code}".`)
      }

      // 3. Generate unique 6-character code
      const newCode = await generateUniqueCode(name)

      // 4. Insert into Supabase
      const { data: inserted, error: insertError } = await supabase
        .from('distributors')
        .insert([
          {
            owner_name: name,
            owner_roll_no: rollNo,
            owner_contact: formattedContact,
            referral_code: newCode,
            total_pages_referred: 0,
            pending_earnings: 0,
            lifetime_earnings: 0
          }
        ])
        .select()
        .single()

      if (insertError) throw insertError

      setGeneratedPartner(inserted)
      setRegForm({ owner_name: '', owner_roll_no: '', owner_contact: '' })
      fetchCount()
    } catch (err) {
      console.error(err)
      setRegError(err.message || 'Failed to generate code. Please try again.')
    } finally {
      setRegLoading(false)
    }
  }

  // --- Two-Factor Earnings Tracker Handler (Code + Phone) ---
  const handleTrackEarnings = async (e) => {
    e.preventDefault()
    setTrackError('')
    setPartnerStats(null)

    const cleanCode = trackCode.trim().toUpperCase()
    const cleanPhone = trackPhone.replace(/\D/g, '')

    if (!cleanCode || cleanCode.length !== 6) {
      setTrackError('Please enter a valid 6-character referral code (e.g., ANAN48).')
      return
    }

    if (cleanPhone.length !== 10) {
      setTrackError('Please enter your registered 10-digit phone number.')
      return
    }

    setTrackLoading(true)
    try {
      const { data, error } = await supabase
        .from('distributors')
        .select('*')
        .eq('referral_code', cleanCode)
        .maybeSingle()

      if (error) throw error

      // Verify BOTH code and phone number combination for privacy
      if (!data) {
        setTrackError('Invalid code or phone number combination.')
        return
      }

      const storedPhoneDigits = (data.owner_contact || '').replace(/\D/g, '')
      if (!storedPhoneDigits.endsWith(cleanPhone)) {
        setTrackError('Invalid code or phone number combination.')
        return
      }

      setPartnerStats(data)
    } catch (err) {
      console.error(err)
      setTrackError('Error verifying earnings lookup. Please try again.')
    } finally {
      setTrackLoading(false)
    }
  }

  const spotsRemaining = Math.max(0, 75 - distributorCount)

  return (
    <div className="flex-1 w-full bg-[#d4cebd] text-[#1a1917] font-sans pb-32 pt-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-8">
        
        <Link to="/" className="inline-flex items-center gap-2 text-[#5a5750] hover:text-[#1a1917] font-bold mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5" /> Back to Store
        </Link>

        {/* HERO HEADER */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#1a1917] text-[#d4cebd] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-[#c25134]" />
            Official Campus Distributor Scheme
          </div>
          <h1 className="text-4xl sm:text-6xl font-black font-serif text-[#1a1917] [text-shadow:-1px_-1px_1px_rgba(0,0,0,0.2),_1px_1px_1px_rgba(255,255,255,0.8)] tracking-tight">
            Earn ₹5 per 20 Pages Printed.
          </h1>
          <p className="text-[#5a5750] font-medium text-lg max-w-2xl mx-auto mt-3 leading-relaxed">
            Help students access the cheapest prints on campus. Hand out your 6-char referral code and get weekly pocket money payouts directly to your UPI.
          </p>

          {/* LIVE SPOTS BADGE */}
          <div className="mt-6 inline-flex items-center gap-3 bg-[#cbc4b1] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),_inset_-1px_-1px_2px_rgba(255,255,255,0.7)] px-6 py-3 rounded-2xl border border-black/5">
            <div className={`w-3 h-3 rounded-full ${spotsRemaining > 0 ? 'bg-green-600 animate-pulse' : 'bg-red-600'}`} />
            <span className="font-bold text-sm text-[#1a1917]">
              {loadingCount ? (
                'Checking live availability...'
              ) : spotsRemaining > 0 ? (
                <span>
                  <strong className="text-[#c25134] text-base">{spotsRemaining} / 75</strong> Distributor Spots Available
                </span>
              ) : (
                <strong className="text-red-700">All 75 Partner Spots Are Claimed!</strong>
              )}
            </span>
          </div>
        </div>

        {/* MAIN 2-COLUMN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          
          {/* SECTION A: GENERATE REFERRAL CODE */}
          <div className="bg-[#cbc4b1] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),_inset_-1px_-1px_2px_rgba(255,255,255,0.7)] rounded-3xl p-8 sm:p-10 border border-black/5">
            <div className="border-b border-black/10 pb-4 mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#c25134]">Step 1</span>
              <h2 className="text-2xl font-bold font-serif text-[#1a1917] [text-shadow:-1px_-1px_1px_rgba(0,0,0,0.1),_1px_1px_1px_rgba(255,255,255,0.8)]">
                Claim Your Partner Code
              </h2>
              <p className="text-[#5a5750] text-sm font-medium mt-1">
                Enter your details to generate your unique 6-character code.
              </p>
            </div>

            {regError && (
              <div className="p-4 bg-red-900/10 border border-red-900/30 rounded-xl text-red-800 text-sm font-bold mb-6 flex items-start gap-2">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <span>{regError}</span>
              </div>
            )}

            {/* GENERATED PARTNER TICKET */}
            {generatedPartner ? (
              <div className="bg-[#1a1917] text-[#d4cebd] rounded-2xl p-6 shadow-2xl space-y-5 animate-in fade-in duration-500 border border-[#d4cebd]/10">
                <div className="flex items-center justify-between border-b border-[#d4cebd]/10 pb-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-green-400">Partner Code Active</span>
                  </div>
                  <span className="text-xs text-[#a09c91] font-mono">Spot #{distributorCount}/75</span>
                </div>

                <div className="text-center py-2">
                  <p className="text-xs text-[#a09c91] uppercase tracking-wider font-bold">Your Unique Code</p>
                  <p className="text-4xl font-mono font-black tracking-widest mt-1 text-[#c25134] bg-white/5 py-2 px-4 rounded-xl inline-block border border-white/10">
                    {generatedPartner.referral_code}
                  </p>
                  <p className="text-xs text-[#a09c91] mt-2 font-medium">Registered to: <strong className="text-white">{generatedPartner.owner_name}</strong> ({generatedPartner.owner_roll_no})</p>
                </div>

                {/* Actions */}
                <div className="space-y-3 pt-2">
                  <button
                    onClick={() => handleCopyCode(generatedPartner.referral_code)}
                    className="w-full bg-[#d4cebd] hover:bg-white text-[#1a1917] font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 text-sm shadow-md"
                  >
                    {copiedCode ? <Check className="w-4 h-4 text-green-700" /> : <Copy className="w-4 h-4" />}
                    {copiedCode ? 'Code Copied to Clipboard!' : 'Copy Referral Code'}
                  </button>

                  <button
                    onClick={() => handlePromoteOnWhatsApp(generatedPartner.referral_code)}
                    className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 text-sm shadow-lg tracking-wide"
                  >
                    <Share2 className="w-4 h-4" /> Promote on WhatsApp
                  </button>
                </div>

                <button
                  onClick={() => setGeneratedPartner(null)}
                  className="w-full text-center text-xs text-[#a09c91] hover:text-[#d4cebd] pt-1 underline font-medium"
                >
                  Register another person
                </button>
              </div>
            ) : (
              <form onSubmit={handleRegister} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#3a3832] uppercase tracking-wider">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-4 w-4 text-[#1a1917]/50" />
                    </div>
                    <input
                      required
                      type="text"
                      disabled={spotsRemaining <= 0 || regLoading}
                      value={regForm.owner_name}
                      onChange={(e) => setRegForm(prev => ({ ...prev, owner_name: e.target.value }))}
                      className="w-full bg-[#d4cebd] border-none rounded-xl py-3 pl-10 pr-4 font-medium text-sm focus:ring-2 focus:ring-[#c25134] outline-none shadow-sm disabled:opacity-50"
                      placeholder="Anant Thakkur"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#3a3832] uppercase tracking-wider">Roll Number</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FileText className="h-4 w-4 text-[#1a1917]/50" />
                    </div>
                    <input
                      required
                      type="text"
                      disabled={spotsRemaining <= 0 || regLoading}
                      value={regForm.owner_roll_no}
                      onChange={(e) => setRegForm(prev => ({ ...prev, owner_roll_no: e.target.value }))}
                      className="w-full bg-[#d4cebd] border-none rounded-xl py-3 pl-10 pr-4 font-medium text-sm focus:ring-2 focus:ring-[#c25134] outline-none shadow-sm uppercase disabled:opacity-50"
                      placeholder="2023CS01"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#3a3832] uppercase tracking-wider">WhatsApp Contact Number</label>
                  <div className="flex items-stretch bg-[#d4cebd] rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[#c25134] shadow-sm">
                    <div className="flex items-center pl-3.5 pr-2.5 border-r border-black/10">
                      <Phone className="h-4 w-4 text-[#1a1917]/50 mr-1.5" />
                      <span className="text-[#1a1917] font-bold text-sm">+91</span>
                    </div>
                    <input
                      required
                      type="tel"
                      pattern="[0-9]{10}"
                      maxLength="10"
                      disabled={spotsRemaining <= 0 || regLoading}
                      value={regForm.owner_contact}
                      onChange={(e) => {
                        const digits = e.target.value.replace(/\D/g, '')
                        if (digits.length <= 10) setRegForm(prev => ({ ...prev, owner_contact: digits }))
                      }}
                      className="w-full bg-transparent border-none py-3 px-3 font-medium text-sm focus:outline-none disabled:opacity-50"
                      placeholder="9876543210"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={spotsRemaining <= 0 || regLoading}
                  className="w-full mt-2 bg-[#1a1917] hover:bg-[#2a2927] text-[#d4cebd] font-bold py-3.5 px-6 rounded-xl transition-all shadow-lg tracking-wide text-sm disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {regLoading ? 'Registering...' : spotsRemaining > 0 ? 'Generate My Referral Code' : 'Registrations Full (75/75)'}
                </button>
              </form>
            )}
          </div>

          {/* SECTION B: TWO-FACTOR LIVE EARNINGS TRACKER (CODE + PHONE) */}
          <div className="bg-[#cbc4b1] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),_inset_-1px_-1px_2px_rgba(255,255,255,0.7)] rounded-3xl p-8 sm:p-10 border border-black/5">
            <div className="border-b border-black/10 pb-4 mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#c25134]">Step 2</span>
              <h2 className="text-2xl font-bold font-serif text-[#1a1917] [text-shadow:-1px_-1px_1px_rgba(0,0,0,0.1),_1px_1px_1px_rgba(255,255,255,0.8)]">
                Live Earnings Tracker
              </h2>
              <p className="text-[#5a5750] text-sm font-medium mt-1">
                Enter your 6-char code and registered contact number to verify and check your balance.
              </p>
            </div>

            <form onSubmit={handleTrackEarnings} className="space-y-4 mb-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#3a3832] uppercase tracking-wider">6-Character Referral Code</label>
                <input
                  required
                  type="text"
                  maxLength="6"
                  value={trackCode}
                  onChange={(e) => setTrackCode(e.target.value.toUpperCase())}
                  className="w-full bg-[#d4cebd] border-none rounded-xl py-3 px-4 font-mono font-bold text-base focus:ring-2 focus:ring-[#c25134] outline-none shadow-sm uppercase placeholder:font-sans placeholder:font-normal placeholder:text-sm"
                  placeholder="e.g. ANAN48"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#3a3832] uppercase tracking-wider">Registered 10-Digit Contact Number</label>
                <div className="flex items-stretch bg-[#d4cebd] rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[#c25134] shadow-sm">
                  <div className="flex items-center pl-3.5 pr-2.5 border-r border-black/10">
                    <Phone className="h-4 w-4 text-[#1a1917]/50 mr-1.5" />
                    <span className="text-[#1a1917] font-bold text-sm">+91</span>
                  </div>
                  <input
                    required
                    type="tel"
                    pattern="[0-9]{10}"
                    maxLength="10"
                    value={trackPhone}
                    onChange={(e) => {
                      const digits = e.target.value.replace(/\D/g, '')
                      if (digits.length <= 10) setTrackPhone(digits)
                    }}
                    className="w-full bg-transparent border-none py-3 px-3 font-medium text-sm focus:outline-none"
                    placeholder="9876543210"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={trackLoading}
                className="w-full bg-[#c25134] hover:bg-[#a6432a] text-[#d4cebd] font-bold py-3.5 px-5 rounded-xl transition-all shadow-md text-sm whitespace-nowrap disabled:opacity-50"
              >
                {trackLoading ? 'Verifying...' : 'Verify & Track Earnings'}
              </button>
            </form>

            {trackError && (
              <div className="p-4 bg-red-900/10 border border-red-900/30 rounded-xl text-red-800 text-sm font-bold mb-6 flex items-start gap-2">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <span>{trackError}</span>
              </div>
            )}

            {partnerStats && (
              <div className="bg-[#1a1917] text-[#d4cebd] rounded-2xl p-6 shadow-2xl space-y-6 border border-[#d4cebd]/10 animate-in fade-in duration-500">
                <div className="flex items-center justify-between border-b border-[#d4cebd]/10 pb-3">
                  <div>
                    <h3 className="font-bold text-white text-lg">{partnerStats.owner_name}</h3>
                    <p className="text-xs text-[#a09c91]">Roll No: {partnerStats.owner_roll_no} • Code: <strong className="text-[#c25134] font-mono">{partnerStats.referral_code}</strong></p>
                  </div>
                  <span className="text-xs bg-green-900/30 text-green-400 border border-green-900/50 px-2.5 py-1 rounded-full font-bold uppercase">
                    Verified
                  </span>
                </div>

                {/* 3 STATS CARDS */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white/5 p-3.5 rounded-xl border border-white/5 text-center">
                    <Layers className="w-5 h-5 text-[#c25134] mx-auto mb-1" />
                    <span className="text-[10px] text-[#a09c91] font-bold uppercase block tracking-wider">Pages</span>
                    <span className="text-xl font-black font-serif text-white">{partnerStats.total_pages_referred || 0}</span>
                  </div>

                  <div className="bg-white/5 p-3.5 rounded-xl border border-white/5 text-center">
                    <Clock className="w-5 h-5 text-yellow-500 mx-auto mb-1" />
                    <span className="text-[10px] text-[#a09c91] font-bold uppercase block tracking-wider">Unpaid</span>
                    <span className="text-xl font-black font-serif text-yellow-400">₹{partnerStats.pending_earnings || 0}</span>
                  </div>

                  <div className="bg-white/5 p-3.5 rounded-xl border border-white/5 text-center">
                    <IndianRupee className="w-5 h-5 text-green-400 mx-auto mb-1" />
                    <span className="text-[10px] text-[#a09c91] font-bold uppercase block tracking-wider">Lifetime</span>
                    <span className="text-xl font-black font-serif text-green-400">₹{partnerStats.lifetime_earnings || 0}</span>
                  </div>
                </div>

                {/* CLAIM PAYOUT VIA WHATSAPP BUTTON */}
                <div className="pt-1">
                  {Number(partnerStats.pending_earnings) > 0 ? (
                    <button
                      onClick={() => handleClaimPayout(partnerStats)}
                      className="w-full bg-[#c25134] hover:bg-[#a6432a] text-[#d4cebd] font-bold py-3.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2 text-sm shadow-lg tracking-wide"
                    >
                      <MessageCircle className="w-4 h-4" /> Claim Payout via WhatsApp (₹{partnerStats.pending_earnings})
                    </button>
                  ) : (
                    <div className="w-full bg-white/5 text-[#a09c91] font-bold py-3 px-4 rounded-xl text-center text-xs border border-white/5">
                      ✓ No Unpaid Balance to Claim (₹0 Pending)
                    </div>
                  )}
                </div>

                {/* PROMOTE ON WHATSAPP & COPY CODE BUTTONS */}
                <div className="space-y-2 pt-2 border-t border-[#d4cebd]/10">
                  <button
                    onClick={() => handlePromoteOnWhatsApp(partnerStats.referral_code)}
                    className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 text-sm shadow-lg tracking-wide"
                  >
                    <Share2 className="w-4 h-4" /> Promote on WhatsApp
                  </button>

                  <button
                    onClick={() => handleCopyCode(partnerStats.referral_code, true)}
                    className="w-full bg-white/10 hover:bg-white/20 text-[#d4cebd] font-bold py-2.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2 text-xs"
                  >
                    {copiedTrackCode ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedTrackCode ? 'Code Copied!' : 'Copy Code'}
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  )
}
