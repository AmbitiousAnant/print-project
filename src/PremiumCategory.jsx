import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { 
  User, FileText, Phone, ShoppingCart, ArrowLeft, CheckCircle2, 
  Sparkles, MessageCircle, Search, ShieldCheck, Flame, Plus, Minus, ExternalLink 
} from 'lucide-react'
import { useCart } from './CartContext'

const ANANT_WHATSAPP = '917982350793'

export default function PremiumCategory() {
  const { addToCart } = useCart()
  const [successMsg, setSuccessMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  // Student Identity Form
  const [formData, setFormData] = useState({
    student_name: '',
    roll_number: '',
    whatsapp_number: ''
  })

  // Filter & Search
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  // Quantities for each item (keyed by id)
  const [quantities, setQuantities] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'whatsapp_number') {
      const numbersOnly = value.replace(/\D/g, '')
      if (numbersOnly.length <= 10) setFormData(prev => ({ ...prev, [name]: numbersOnly }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleQtyChange = (id, delta) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta)
    }))
  }

  // --- Complete Amway Personal Care Catalog ---
  const products = [
    // 1. Oral Care
    {
      id: 'glister-classic',
      category: 'Oral Care',
      name: 'Glister Multi-Action Toothpaste',
      subtext: 'Enamel-Safe Reminact Polish Formula (200g)',
      price: 320,
      badge: 'Bestseller',
      tag: 'Lasts 3 Months',
      hype: 'Patented Reminact formula actively redeposits essential minerals into enamel. Fights plaque, polishes away tea/coffee stains gently, and provides 12-hour fresh breath.',
      image: 'https://images.unsplash.com/photo-1559591937-e62fb330914c?auto=format&fit=crop&w=800'
    },
    {
      id: 'glister-herbals',
      category: 'Oral Care',
      name: 'Glister Herbals Multi-Action Paste',
      subtext: '11 Powerful Botanicals (190g)',
      price: 335,
      badge: 'Botanical',
      tag: 'Gum Care',
      hype: 'Infused with 11 certified herbal actives including Clove, Spearmint, Peppermint, and Ginger. Fortifies sensitive gums against hostel food irritation without harsh synthetic abrasives.',
      image: 'https://images.unsplash.com/photo-1563178406-4cdc2923acbc?auto=format&fit=crop&w=800'
    },
    {
      id: 'glister-spray',
      category: 'Oral Care',
      name: 'Glister Mint Refresher Mouth Spray',
      subtext: 'Instant Pocket Freshness (9g / 250+ Sprays)',
      price: 240,
      badge: 'Campus Essential',
      tag: 'Sugar-Free',
      hype: 'Ultra-compact breath defense for post-canteen meals, viva presentations, and campus interviews. 250+ measured sprays of potent, long-lasting cooling spearmint.',
      image: 'https://images.unsplash.com/photo-1608248597359-2e118cbbd377?auto=format&fit=crop&w=800'
    },
    {
      id: 'glister-brush',
      category: 'Oral Care',
      name: 'Glister Advanced Multi-Action Toothbrush',
      subtext: 'Pack of 4 Precision Brushes',
      price: 290,
      badge: 'Value Pack',
      tag: 'Soft Flexible Neck',
      hype: 'Tapered bristles with 75% more filament count than standard market brushes. Ergonomic non-slip grip engineered to clean deep interdental gaps safely.',
      image: 'https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?auto=format&fit=crop&w=800'
    },

    // 2. Body & Bath
    {
      id: 'persona-coconut-soap',
      category: 'Body & Bath',
      name: 'Persona Pure Coconut Nourishing Soap',
      subtext: 'Pack of 3 Luxury Bars (75g each)',
      price: 195,
      badge: 'Daily Luxury',
      tag: '100% Veg Oil',
      hype: 'Triple-milled formula made from 100% pure coconut oil, sweet almond oil, and Vitamin E. Produces a dense, conditioning lather that prevents hostel hard water skin dryness.',
      image: 'https://images.unsplash.com/photo-1607006314639-659f485f7a07?auto=format&fit=crop&w=800'
    },
    {
      id: 'persona-germ-soap',
      category: 'Body & Bath',
      name: 'Persona Germ Protection Herbal Soap',
      subtext: 'Pack of 3 Hygiene Bars (75g each)',
      price: 210,
      badge: 'Hostel Defense',
      tag: 'Triclocarban-Free',
      hype: 'Eliminates 99.9% of campus gym and monsoon bacteria while keeping skin naturally hydrated with aloe vera and tea-tree essence.',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800'
    },
    {
      id: 'gnh-body-wash',
      category: 'Body & Bath',
      name: 'G&H Refresh+ Clean Gel Body Wash',
      subtext: 'Hydrating Botanical Formula (250ml)',
      price: 460,
      badge: 'Ultra Concentrate',
      tag: 'Sulfate-Free',
      hype: 'Enriched with antioxidant grape seed extract and calming aloe vera. A single coin-sized drop lathers fully, washing off pollution and gym fatigue with zero soap scum.',
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800'
    },
    {
      id: 'gnh-body-lotion',
      category: 'Body & Bath',
      name: 'G&H Nourish+ Deep Moisture Lotion',
      subtext: 'Orange Blossom Honey & Shea Butter (250ml)',
      price: 495,
      badge: '24-Hr Barrier',
      tag: 'Fast Absorbing',
      hype: 'Clinically proven 24-hour hydration barrier. Non-greasy finish that instantly absorbs into wind-chapped skin, elbows, and knees during harsh campus winters.',
      image: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=800'
    },
    {
      id: 'persona-talc',
      category: 'Body & Bath',
      name: 'Persona Deodorizing Talcum Powder',
      subtext: 'Triple Action Sweat Protection (350g)',
      price: 220,
      badge: 'Summer Shield',
      tag: 'Cedarwood Essence',
      hype: 'Micro-fine talc that absorbs heavy summer humidity and sweat odors. Infused with a crisp masculine-fresh cedarwood scent to stay confident all day in class.',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800'
    },

    // 3. Hair & Scalp
    {
      id: 'satinique-2in1',
      category: 'Hair & Scalp',
      name: 'Satinique 2-in-1 Shampoo & Conditioner',
      subtext: 'Enerjuve Patented Complex (250ml)',
      price: 450,
      badge: 'Salon Grade',
      tag: 'One-Step Care',
      hype: 'Positively-charged Enerjuve lipo-protein complex targets damaged hair follicles. Nourishes, detangles, and smoothens frizzy hair in a single 60-second shower routine.',
      image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=800'
    },
    {
      id: 'satinique-antihairfall',
      category: 'Hair & Scalp',
      name: 'Satinique Anti-Hairfall Botanical Shampoo',
      subtext: 'Eclipta Alba & Ginseng Infusion (250ml)',
      price: 480,
      badge: 'Hostel Water Armor',
      tag: '1800 Strands Saved',
      hype: 'Engineered specifically for stressed students battling hard water hair thinning. Reduces breakage by up to 1800 strands a month by stimulating micro-circulation at the root.',
      image: 'https://images.unsplash.com/photo-1585751119414-ef2636f8aede?auto=format&fit=crop&w=800'
    },
    {
      id: 'persona-coconut-oil',
      category: 'Hair & Scalp',
      name: 'Persona 100% Pure Virgin Coconut Oil',
      subtext: 'Edible Grade Cold Pressed (500ml)',
      price: 245,
      badge: '100% Pure',
      tag: 'No Mineral Oil',
      hype: 'Zero mineral oils, zero artificial preservatives. Deep-conditions damaged scalp cuticle layers and keeps hair thick and lustrous despite dust and pollution.',
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800'
    },
    {
      id: 'persona-amla-oil',
      category: 'Hair & Scalp',
      name: 'Persona Amla Herbal Scalp Oil',
      subtext: 'Traditional Strengthener (200ml)',
      price: 160,
      badge: 'Campus Value',
      tag: 'Ayurvedic Herb',
      hype: 'Pure Indian Gooseberry (Amla) extract that conditions the scalp, cools down exam stress, and prevents premature graying caused by chlorinated hostel water.',
      image: 'https://images.unsplash.com/photo-1608248597359-2e118cbbd377?auto=format&fit=crop&w=800'
    },

    // 4. Face & Skin
    {
      id: 'attitude-be-bright-wash',
      category: 'Face & Skin',
      name: 'Attitude Be Bright Herbal Face Wash',
      subtext: 'Papaya & Lemon Bio-Enzymes (100ml)',
      price: 340,
      badge: 'Pollution Shield',
      tag: 'Glow Restorer',
      hype: 'Gently dissolves micro-dust and greasy sebum accumulated during daily commutes. Natural fruit enzymes illuminate dull campus skin without stripping natural skin moisture.',
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800'
    },
    {
      id: 'attitude-day-cream',
      category: 'Face & Skin',
      name: 'Attitude Be Bright Day Cream SPF 15',
      subtext: 'Daily UV & Blue Light Guard (50g)',
      price: 420,
      badge: 'Matte Shield',
      tag: 'Non-Greasy',
      hype: 'Non-sticky daily hydration with SPF 15 and blue-light defense for late-night laptop sessions. Keeps skin even-toned, shielded from sun, and shine-free all day.',
      image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800'
    },
    {
      id: 'attitude-clear-activ',
      category: 'Face & Skin',
      name: 'Attitude Clear Activ Pimple Face Wash',
      subtext: 'Salicylic Acid & Green Tea Active (100ml)',
      price: 360,
      badge: 'Acne Control',
      tag: 'Dermatologist Tested',
      hype: 'Clinically targeted for oily campus skin and stress breakouts. Unclogs deep pores, controls midday T-zone oil, and calms redness within 48 hours.',
      image: 'https://images.unsplash.com/photo-1556228722-d0b7194680fb?auto=format&fit=crop&w=800'
    },

    // 5. Men's Grooming
    {
      id: 'dynamite-facewash',
      category: "Men's Grooming",
      name: 'Dynamite Men Brightening Face Wash',
      subtext: 'Activated Charcoal & Vitamin B3 (100ml)',
      price: 310,
      badge: 'Heavy Duty',
      tag: 'Zero Shine',
      hype: 'Formulated for high-intensity engineering life. Activated micro-charcoal lifts tough grime, bike pollution, and excess grease instantly with an ice-cold cooling rush.',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800'
    },
    {
      id: 'dynamite-shave-foam',
      category: "Men's Grooming",
      name: 'Dynamite Ultra-Glide Shaving Foam',
      subtext: 'Dense Aloe-Vera Comfort Cushion (200g)',
      price: 280,
      badge: 'Zero Burn',
      tag: 'Dense Foam',
      hype: 'High-density rich micro-foam provides a friction-free razor glide. Shields sensitive skin from razor burn, ingrown hair, and hostel sink nicks.',
      image: 'https://images.unsplash.com/photo-1512290900672-1f55b9a8960f?auto=format&fit=crop&w=800'
    },
    {
      id: 'dynamite-styling-wax',
      category: "Men's Grooming",
      name: 'Dynamite Matte Hair Styling Wax',
      subtext: 'High Hold & Flexible Matte Finish (75g)',
      price: 350,
      badge: 'All-Day Hold',
      tag: 'Zero Flakes',
      hype: 'Gives effortless volume and structure without grease or white dandruff-like flakes. Rinses out in a single wash with zero sticky residue.',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800'
    }
  ]

  const categories = ['All', 'Oral Care', 'Body & Bath', 'Hair & Scalp', 'Face & Skin', "Men's Grooming"]

  // Filtered list
  const filteredProducts = useMemo(() => {
    return products.filter(item => {
      const matchCat = selectedCategory === 'All' || item.category === selectedCategory
      const matchQuery = !searchQuery.trim() || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.subtext.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.hype.toLowerCase().includes(searchQuery.toLowerCase())
      return matchCat && matchQuery
    })
  }, [products, selectedCategory, searchQuery])

  // --- Add to Cart Handler ---
  const handleAddToCart = (product) => {
    setErrorMsg('')
    setSuccessMsg('')
    
    if (!formData.student_name || !formData.roll_number || formData.whatsapp_number.length !== 10) {
      setErrorMsg('Please enter your Student Name, Roll Number, and 10-digit WhatsApp number at the top before adding to cart.')
      window.scrollTo({ top: 380, behavior: 'smooth' })
      return
    }

    const qty = quantities[product.id] || 1
    const cartItem = {
      student_name: formData.student_name,
      roll_number: formData.roll_number,
      whatsapp_number: `+91${formData.whatsapp_number}`,
      item_type: 'Personal Care',
      item_details: `${product.name} (${qty} qty)`,
      copies: qty,
      total_price: product.price * qty
    }

    addToCart(cartItem)
    setSuccessMsg(`${qty} × ${product.name} added to your cart!`)
    setTimeout(() => setSuccessMsg(''), 4500)
  }

  // --- Direct WhatsApp Inquiry / Order ---
  const handleWhatsAppInquiry = (product) => {
    const qty = quantities[product.id] || 1
    const studentInfo = formData.student_name 
      ? `\n\n👤 *Student:* ${formData.student_name} (${formData.roll_number || 'Hosteler'})\n📱 *Contact:* +91 ${formData.whatsapp_number || 'N/A'}`
      : ''
    
    const message = `Hi Anant! 👋\nI want to order / inquire about this Amway product from Print Studio:\n\n✨ *Product:* ${product.name}\n📦 *Quantity:* ${qty}\n💰 *Price:* ₹${product.price * qty} (₹${product.price} each)${studentInfo}\n\nCould you confirm campus hand-to-hand delivery?`
    window.open(`https://wa.me/${ANANT_WHATSAPP}?text=${encodeURIComponent(message)}`, '_blank')
  }

  return (
    <div className="flex-1 w-full bg-[#d4cebd] text-[#1a1917] font-sans pb-32 pt-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        
        {/* Back Link */}
        <Link to="/" className="inline-flex items-center gap-2 text-[#5a5750] hover:text-[#1a1917] font-bold mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5" /> Back to Storefront
        </Link>

        {/* =========================================================================
            LUXURY MINIMALIST EDITORIAL HERO
           ========================================================================= */}
        <div className="bg-[#1a1917] text-[#d4cebd] rounded-3xl p-8 sm:p-14 shadow-2xl relative overflow-hidden border border-[#d4cebd]/15 mb-12">
          
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[#c25134]/20 text-[#c25134] border border-[#c25134]/30 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-5">
              <Sparkles className="w-3.5 h-3.5" /> Handpicked by Anant Thakkur • 100% Genuine Amway
            </div>

            <h1 className="text-4xl sm:text-6xl font-black font-serif text-white tracking-tight leading-tight">
              The Personal Care Vault.
            </h1>

            <p className="text-[#a09c91] text-base sm:text-xl font-medium mt-4 leading-relaxed font-serif italic">
              Stop wasting money on watered-down market brands. Upgrade to clinical-grade, bio-concentrated daily essentials engineered to survive hostel water, dust, and daily wear.
            </p>

            {/* Direct Seller Contact Banner */}
            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white/5 border border-white/10 p-4 sm:p-5 rounded-2xl">
              <div className="w-10 h-10 rounded-full bg-[#c25134] text-white flex items-center justify-center font-bold shrink-0 shadow-md">
                AT
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-white">Direct Hand-to-Hand Campus Delivery</p>
                <p className="text-xs text-[#a09c91] mt-0.5">
                  Supplied directly through Anant. Need a custom product, Nutrilite wellness supplement, or special campus bundle?
                </p>
              </div>
              <a 
                href={`https://wa.me/${ANANT_WHATSAPP}?text=${encodeURIComponent("Hi Anant! 👋 I'm browsing the Amway Personal Care vault on Print Studio and have a question...")}`}
                target="_blank" 
                rel="noreferrer"
                className="bg-[#25D366] hover:bg-[#20ba59] text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-md shrink-0 whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4" /> Chat With Me
              </a>
            </div>
          </div>

          {/* Value Props Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 pt-8 border-t border-white/10 text-xs">
            <div className="flex items-start gap-3">
              <span className="font-mono text-[#c25134] font-black text-lg">01</span>
              <div>
                <p className="font-bold text-white uppercase tracking-wider">Bio-Concentrated</p>
                <p className="text-[#a09c91] mt-0.5">1 tube/bottle lasts 2x–3x longer than ordinary FMCG brands.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="font-mono text-[#c25134] font-black text-lg">02</span>
              <div>
                <p className="font-bold text-white uppercase tracking-wider">Hard Water Defense</p>
                <p className="text-[#a09c91] mt-0.5">Specialized formulations that protect hair and skin from campus tap water.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="font-mono text-[#c25134] font-black text-lg">03</span>
              <div>
                <p className="font-bold text-white uppercase tracking-wider">Zero Shipping Delay</p>
                <p className="text-[#a09c91] mt-0.5">Hand-to-hand hostel delivery with zero shipping or handling fees.</p>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            STUDENT IDENTITY FORM (STANDARD DEBOSSED LETTERPRESS)
           ========================================================================= */}
        <div className="bg-[#cbc4b1] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),_inset_-1px_-1px_2px_rgba(255,255,255,0.7)] rounded-3xl p-8 mb-10 border border-black/5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-black/10 pb-3 mb-6 gap-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#c25134]">Step 1</span>
              <h2 className="text-2xl font-bold font-serif text-[#1a1917] [text-shadow:-1px_-1px_1px_rgba(0,0,0,0.1),_1px_1px_1px_rgba(255,255,255,0.8)]">
                Verify Your Student Identity
              </h2>
            </div>
            <span className="text-xs text-[#5a5750] font-medium">Required once before adding any items to cart</span>
          </div>
          
          {errorMsg && (
            <div className="mb-6 p-4 bg-[#c25134]/15 border border-[#c25134]/30 rounded-xl text-[#c25134] font-bold text-sm">
              {errorMsg}
            </div>
          )}
          {successMsg && (
            <div className="mb-6 p-4 bg-green-900/10 border border-green-900/30 rounded-xl text-green-800 font-bold text-sm flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5"/> {successMsg}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#3a3832] uppercase tracking-wider">Student Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-4 w-4 text-[#1a1917]/50" />
                </div>
                <input 
                  name="student_name" 
                  value={formData.student_name} 
                  onChange={handleChange} 
                  className="w-full bg-[#d4cebd] border-none rounded-xl py-3 pl-10 pr-4 font-medium text-sm focus:ring-2 focus:ring-[#c25134] outline-none shadow-sm" 
                  placeholder="Anant Thakkur" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-[#3a3832] uppercase tracking-wider">Roll Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FileText className="h-4 w-4 text-[#1a1917]/50" />
                </div>
                <input 
                  name="roll_number" 
                  value={formData.roll_number} 
                  onChange={handleChange} 
                  className="w-full bg-[#d4cebd] border-none rounded-xl py-3 pl-10 pr-4 font-medium text-sm focus:ring-2 focus:ring-[#c25134] outline-none shadow-sm uppercase" 
                  placeholder="2023CS01" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-[#3a3832] uppercase tracking-wider">WhatsApp Number</label>
              <div className="flex items-stretch bg-[#d4cebd] rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[#c25134] shadow-sm">
                <div className="flex items-center pl-3.5 pr-2.5 border-r border-black/10">
                  <Phone className="h-4 w-4 text-[#1a1917]/50 mr-1.5" />
                  <span className="text-[#1a1917] font-bold text-sm">+91</span>
                </div>
                <input 
                  type="tel" 
                  name="whatsapp_number" 
                  value={formData.whatsapp_number} 
                  onChange={handleChange} 
                  pattern="[0-9]{10}" 
                  maxLength="10" 
                  className="w-full bg-transparent border-none py-3 px-3 font-medium text-sm focus:outline-none" 
                  placeholder="9876543210" 
                />
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            CATEGORY TABS & SEARCH BAR
           ========================================================================= */}
        <div className="mb-10 space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all shadow-sm ${
                    selectedCategory === cat
                      ? 'bg-[#1a1917] text-[#d4cebd] shadow-md scale-105'
                      : 'bg-[#cbc4b1] hover:bg-[#1a1917]/10 text-[#3a3832]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Quick Search */}
            <div className="relative min-w-[260px]">
              <Search className="w-4 h-4 text-[#1a1917]/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Glister, Shampoo, Face Wash..."
                className="w-full bg-[#cbc4b1] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),_inset_-1px_-1px_2px_rgba(255,255,255,0.7)] border-none rounded-xl py-2.5 pl-10 pr-4 text-xs font-medium focus:ring-2 focus:ring-[#c25134] outline-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-[#5a5750] px-1 font-medium">
            <span>Showing {filteredProducts.length} premium essentials in "{selectedCategory}"</span>
            <span>All items 100% sealed & delivered hand-to-hand</span>
          </div>
        </div>

        {/* =========================================================================
            PRODUCT CATALOG GRID
           ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => {
            const qty = quantities[product.id] || 1
            const totalPrice = product.price * qty

            return (
              <div 
                key={product.id}
                className="bg-[#cbc4b1] rounded-3xl overflow-hidden shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),_inset_-1px_-1px_2px_rgba(255,255,255,0.7)] flex flex-col border border-black/5 transition-all hover:ring-2 ring-[#c25134]/30"
              >
                {/* Image & Badges */}
                <div className="h-52 bg-[#1a1917] overflow-hidden relative border-b border-black/10">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover grayscale contrast-125 mix-blend-multiply opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-700" 
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="bg-[#1a1917]/90 text-[#d4cebd] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-sm shadow">
                      {product.badge}
                    </span>
                    <span className="bg-[#c25134] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full shadow">
                      {product.tag}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 flex flex-col flex-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#c25134]">
                    {product.category}
                  </span>
                  
                  <h3 className="text-xl font-bold font-serif text-[#1a1917] mt-1 [text-shadow:-1px_-1px_1px_rgba(0,0,0,0.15),_1px_1px_1px_rgba(255,255,255,0.8)] leading-snug">
                    {product.name}
                  </h3>

                  <p className="text-xs text-[#5a5750] font-semibold mt-0.5">
                    {product.subtext}
                  </p>

                  <p className="text-xs text-[#3a3832] font-medium mt-3 leading-relaxed flex-1">
                    {product.hype}
                  </p>

                  {/* Quantity & Price Row */}
                  <div className="mt-6 pt-4 border-t border-black/10 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-[#5a5750] font-bold uppercase tracking-wider block">Total Price</span>
                      <span className="text-2xl font-black text-[#c25134] font-serif">₹{totalPrice}</span>
                      {qty > 1 && (
                        <span className="text-[11px] text-[#5a5750] font-medium ml-1.5">(₹{product.price} each)</span>
                      )}
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center bg-[#d4cebd] rounded-xl p-1 shadow-inner border border-black/5">
                      <button 
                        type="button"
                        onClick={() => handleQtyChange(product.id, -1)}
                        className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#cbc4b1] hover:bg-[#1a1917] hover:text-[#d4cebd] text-[#1a1917] transition-all font-bold text-xs"
                        title="Decrease Quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center font-bold text-xs text-[#1a1917]">{qty}</span>
                      <button 
                        type="button"
                        onClick={() => handleQtyChange(product.id, 1)}
                        className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#cbc4b1] hover:bg-[#1a1917] hover:text-[#d4cebd] text-[#1a1917] transition-all font-bold text-xs"
                        title="Increase Quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Dual Action Buttons: Add to Cart + WhatsApp */}
                  <div className="mt-5 space-y-2">
                    <button 
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-[#1a1917] hover:bg-[#2a2927] text-[#d4cebd] font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg tracking-wide text-xs"
                    >
                      <ShoppingCart className="w-4 h-4" /> Add to Cart
                    </button>

                    <button 
                      onClick={() => handleWhatsAppInquiry(product)}
                      className="w-full bg-transparent hover:bg-black/5 border border-black/20 text-[#1a1917] font-bold py-2.5 px-4 rounded-xl transition-all flex items-center justify-center gap-1.5 text-xs"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-green-700" /> WhatsApp Anant (Instant)
                    </button>
                  </div>

                </div>
              </div>
            )
          })}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="bg-[#cbc4b1] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),_inset_-1px_-1px_2px_rgba(255,255,255,0.7)] rounded-3xl p-12 text-center mt-6">
            <p className="text-xl font-bold font-serif text-[#1a1917]">No products matched your search.</p>
            <p className="text-sm text-[#5a5750] mt-1">Try another keyword or select "All Essentials".</p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="mt-4 bg-[#1a1917] text-[#d4cebd] font-bold py-2 px-5 rounded-xl text-xs"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* =========================================================================
            BOTTOM CALLOUT: CUSTOM AMWAY ORDERS & NUTRILITE
           ========================================================================= */}
        <div className="mt-16 bg-[#1a1917] text-[#d4cebd] rounded-3xl p-8 sm:p-10 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6 border border-[#d4cebd]/10">
          <div className="space-y-2 text-center sm:text-left">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#c25134]">
              Custom Sourcing Request
            </span>
            <h3 className="text-2xl font-black font-serif text-white">
              Want Nutrilite, Artistry, or an unlisted Amway item?
            </h3>
            <p className="text-sm text-[#a09c91] max-w-xl">
              I can procure any item across Amway India's entire health, wellness, and beauty catalog with authentic batch codes and direct campus delivery.
            </p>
          </div>

          <a 
            href={`https://wa.me/${ANANT_WHATSAPP}?text=${encodeURIComponent("Hi Anant! 👋 I'm looking for a specific Amway product (Nutrilite/Artistry/other) that isn't listed on Print Studio. Can you source it for me?")}`}
            target="_blank" 
            rel="noreferrer"
            className="bg-[#c25134] hover:bg-[#a6432a] text-[#d4cebd] font-bold py-3.5 px-6 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 text-sm shrink-0 whitespace-nowrap"
          >
            <MessageCircle className="w-4 h-4" /> Request Custom Item
          </a>
        </div>

      </div>
    </div>
  )
}
