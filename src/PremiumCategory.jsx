import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { 
  User, FileText, Phone, ShoppingCart, ArrowLeft, CheckCircle2, 
  Sparkles, MessageCircle, Search, ShieldCheck, Check, Plus, Minus,
  Award, Droplets, Heart, Eye, ArrowUpRight, Filter
} from 'lucide-react'
import { useCart } from './CartContext'

const ANANT_WHATSAPP = '917982350793'
const DEFAULT_FALLBACK_IMAGE = 'https://www.amway.com/medias/124106-en-US-690px-01?context=bWFzdGVyfGltYWdlc3w0MTQ3OXxpbWFnZS9wbmd8c3lzLW1hc3Rlci9pbWFnZXMvaGFlL2hjMC85NTE4MTY3MDMxODM4LzEyNDEwNi1lbi1VUy02OTBweC0wMXwzZjk1MTcxYjIxMTcyMDdmYTY4NTJkNjE0MmU4NzRmYzU5ZTk4MTQ1NTBjOWE3NmVjOTZlZGExNWM3YzcwNWZm'

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

  // --- Complete Amway India Personal Care, Attitude & Artistry Catalog (55 Products) ---
  const products = [
    // =========================================================================
    // 1. ORAL CARE (GLISTER & PERSONA)
    // =========================================================================
    {
      id: 'glister-classic-200g',
      code: 'GLIS-200',
      category: 'Oral Care',
      name: 'Glister™ Multi-Action Fluoride Toothpaste',
      spec: 'Net Wt. 200 gm • Lasts 90+ Days',
      price: 285,
      mrp: 310,
      badge: 'Gold Standard',
      techBadge: 'Sylodent™ Silica',
      headline: 'The Enamel Armor That Outlasts 3 Commercial Pastes',
      hype: 'Commercial drugstore pastes use cheap calcium carbonate (chalk) that scratches enamel over time. Glister features spherical Sylodent™ polishing beads that gently lift tea, coffee, and tobacco stains without micro-scratching, while Reminact™ re-mineralizes enamel.',
      clinicalPointers: [
        'Sylodent™ spherical micro-polishing silica beads',
        'Reminact™ patented enamel re-mineralization technology',
        'Pea-sized concentration: 1 tube lasts an entire semester',
        'Certified 12-hour breath ionization & plaque defense'
      ],
      image: 'https://www.amway.com/medias/124106-en-US-690px-01?context=bWFzdGVyfGltYWdlc3w0MTQ3OXxpbWFnZS9wbmd8c3lzLW1hc3Rlci9pbWFnZXMvaGFlL2hjMC85NTE4MTY3MDMxODM4LzEyNDEwNi1lbi1VUy02OTBweC0wMXwzZjk1MTcxYjIxMTcyMDdmYTY4NTJkNjE0MmU4NzRmYzU5ZTk4MTQ1NTBjOWE3NmVjOTZlZGExNWM3YzcwNWZm'
    },
    {
      id: 'glister-herbals-200g',
      code: 'GLIS-HRB',
      category: 'Oral Care',
      name: 'Glister™ Multi-Action Toothpaste Herbals',
      spec: '11 Certified Botanicals • 200 g',
      price: 295,
      mrp: 320,
      badge: 'Herbal Bio-Matrix',
      techBadge: 'Nutrilite Certified',
      headline: 'Clinically Proven Gum Defense for Stressed Gums & Hard Food',
      hype: 'Infused with 11 certified herbal actives including Clove bud oil, Peppermint, Spearmint, and Ginger root. Calms irritated gums, stops bleeding caused by hard mess food, and neutralizes acidic saliva without triclosan or artificial sugars.',
      clinicalPointers: [
        '11 Active botanicals with pure Clove & Tea Tree oil',
        'Zero triclosan, zero sodium saccharin, zero parabens',
        'Soothes bleeding gums within 72 hours of regular use',
        'Natural clove-peppermint freshness that lingers for hours'
      ],
      image: 'https://www.amway.com/medias/124106-en-US-690px-01?context=bWFzdGVyfGltYWdlc3w0MTQ3OXxpbWFnZS9wbmd8c3lzLW1hc3Rlci9pbWFnZXMvaGFlL2hjMC85NTE4MTY3MDMxODM4LzEyNDEwNi1lbi1VUy02OTBweC0wMXwzZjk1MTcxYjIxMTcyMDdmYTY4NTJkNjE0MmU4NzRmYzU5ZTk4MTQ1NTBjOWE3NmVjOTZlZGExNWM3YzcwNWZm'
    },
    {
      id: 'glister-50g-pack4',
      code: 'GLIS-4PK',
      category: 'Oral Care',
      name: 'Glister™ Multi-Action Toothpaste 50g (Pack Of 4)',
      spec: '50 g (Pack of 4) • Travel & Hostel Bundle',
      price: 315,
      mrp: 344,
      badge: 'Best Value Bundle',
      techBadge: '4x Travel Tubes',
      headline: 'Four Semester-Ready Tubes For Your Gym Bag, Hostel & Home Trips',
      hype: 'A set of 4 individual 50g tubes perfect for students on the move. Keep one in your hostel bathroom, one in your gym kit, one in your weekend travel pouch, and give one to your roommate.',
      clinicalPointers: [
        'Pack of 4 sealed 50g tubes — maximum freshness & portability',
        'Full Sylodent™ and Reminact™ anti-cavity formula',
        'TSA & travel-compliant size for train rides and flights',
        'Cost-effective bulk student pricing'
      ],
      image: 'https://www.amway.com/medias/124106-en-US-690px-01?context=bWFzdGVyfGltYWdlc3w0MTQ3OXxpbWFnZS9wbmd8c3lzLW1hc3Rlci9pbWFnZXMvaGFlL2hjMC85NTE4MTY3MDMxODM4LzEyNDEwNi1lbi1VUy02OTBweC0wMXwzZjk1MTcxYjIxMTcyMDdmYTY4NTJkNjE0MmU4NzRmYzU5ZTk4MTQ1NTBjOWE3NmVjOTZlZGExNWM3YzcwNWZm'
    },
    {
      id: 'glister-classic-100g',
      code: 'GLIS-100',
      category: 'Oral Care',
      name: 'Glister™ Multi-Action Fluoride Toothpaste (100g)',
      spec: 'Compact Single Tube • Net Wt. 100g',
      price: 150,
      mrp: 160,
      badge: 'Starter Size',
      techBadge: 'Sylodent™ Silica',
      headline: 'The Perfect Entry Tube To Experience Pure Enamel Polishing',
      hype: 'Ideal for trying Glister for the first time or for short semester stays. Provides the complete patented remineralization formula in a compact 100g format.',
      clinicalPointers: [
        'Same high-concentration Sylodent™ formula as the 200g tube',
        'Safely lifts stains from canteen chai, coffee & soda',
        'Lasts 45+ days with twice-daily pea-sized brushing',
        'Zero chalk fillers, zero gritty harsh residue'
      ],
      image: 'https://www.amway.com/medias/124106-en-US-690px-01?context=bWFzdGVyfGltYWdlc3w0MTQ3OXxpbWFnZS9wbmd8c3lzLW1hc3Rlci9pbWFnZXMvaGFlL2hjMC85NTE4MTY3MDMxODM4LzEyNDEwNi1lbi1VUy02OTBweC0wMXwzZjk1MTcxYjIxMTcyMDdmYTY4NTJkNjE0MmU4NzRmYzU5ZTk4MTQ1NTBjOWE3NmVjOTZlZGExNWM3YzcwNWZm'
    },
    {
      id: 'glister-spray',
      code: 'GLIS-SPY',
      category: 'Oral Care',
      name: 'Glister™ Mint Refresher Mouth Spray',
      spec: 'Pocket Pocket Aerosol • 250+ Sprays • 9g',
      price: 225,
      mrp: 245,
      badge: 'Executive EDC',
      techBadge: 'Sugar-Free Ionizer',
      headline: 'Instant Interview & Date Ready Breath In 2 Seconds',
      hype: 'Forget chewing sugary gums that cause tooth decay during lectures. One measured micro-mist delivers pure Nutrilite-farmed spearmint that neutralizes 99.9% of oral anaerobic odor bacteria instantly.',
      clinicalPointers: [
        '250+ metered micro-doses in a sleek matte atomizer',
        'Zero sugar, zero sticky residue, zero calories',
        'Neutralizes canteen garlic, spicy food & smoke odor',
        'Fits discreetly inside your ID card lanyard or blazer pocket'
      ],
      image: 'https://www.amway.com/medias/124111-en-US-690px-01?context=bWFzdGVyfGltYWdlc3w0MTYxOHxpbWFnZS9wbmd8c3lzLW1hc3Rlci9pbWFnZXMvaGQyL2hhNC85NTE4MTY3ODgzODA2LzEyNDExMS1lbi1VUy02OTBweC0wMXw1YzM4NjU2YTRjNTVhOGIwNWMyM2I5NDI1YjQ2MjQ5ZGUyNTgxOGE3OTZlMDRmYjY4ZDM1YmJkOGVjOWY0NTRh'
    },
    {
      id: 'glister-brush',
      code: 'GLIS-BR4',
      category: 'Oral Care',
      name: 'Glister™ Advanced Multi-Action Toothbrush',
      spec: 'Pack of 4 Precision Brushes',
      price: 260,
      mrp: 280,
      badge: 'German Filament',
      techBadge: '75% Denser Tufts',
      headline: 'Flexible Neck Geometry That Protects Your Receding Gumline',
      hype: 'Features 75% more tufts than supermarket plastic brushes. Patented angled flex-neck absorbs excess hand pressure, stopping gum recession while interdental tapered bristles clean where floss can’t reach.',
      clinicalPointers: [
        'End-rounded dual-height DuPont bristles',
        'Shock-absorbing flex-neck prevents tooth wear',
        'Ergonomic non-slip rubberized thumb grip',
        'Includes 4 color-coded brushes for semester hygiene'
      ],
      image: 'https://www.amway.com/medias/127705-en-US-690px-01?context=bWFzdGVyfGltYWdlc3w2NTAyMXxpbWFnZS9wbmd8c3lzLW1hc3Rlci9pbWFnZXMvaDBkL2gyNy85ODgyMjkzNzMxMzU4LzEyNzcwNS1lbi1VUy02OTBweC0wMXxmODFkMDM1MWZhZTRiOGRmNzRjNzJiM2NlZDI1OTFlOTQ0NmIyZDE4MjIwYmQ1MzVkNjk0YjY4ZjVmYTBkNTEx'
    },
    {
      id: 'glister-kids-toothpaste',
      code: 'GLIS-KID',
      category: 'Oral Care',
      name: 'Glister™ Kids Strawberry Toothpaste',
      spec: 'Enamel-Safe Strawberry Gel • 85g',
      price: 160,
      mrp: 175,
      badge: 'Ultra Gentle',
      techBadge: 'Sugar-Free Gel',
      headline: 'Child & Sensitive Tooth Gel with Delicious Natural Strawberry',
      hype: 'Specially engineered for developing enamel or ultra-sensitive teeth. Delicious natural strawberry flavor with zero sugar and ultra-low abrasivity to protect soft dentin layers.',
      clinicalPointers: [
        'Zero artificial sweeteners or harsh foaming sulfates',
        'Natural strawberry taste that encourages regular brushing',
        'Ultra-low RDA abrasivity index for delicate enamel',
        'Cavity-fighting Reminact™ mineral support'
      ],
      image: 'https://www.amway.com/medias/124106-en-US-690px-01?context=bWFzdGVyfGltYWdlc3w0MTQ3OXxpbWFnZS9wbmd8c3lzLW1hc3Rlci9pbWFnZXMvaGFlL2hjMC85NTE4MTY3MDMxODM4LzEyNDEwNi1lbi1VUy02OTBweC0wMXwzZjk1MTcxYjIxMTcyMDdmYTY4NTJkNjE0MmU4NzRmYzU5ZTk4MTQ1NTBjOWE3NmVjOTZlZGExNWM3YzcwNWZm'
    },
    {
      id: 'persona-classic-brush',
      code: 'PERS-BR4',
      category: 'Oral Care',
      name: 'Persona™ Classic Family Toothbrush (Pack of 4)',
      spec: 'Pack of 4 Value Brushes',
      price: 130,
      mrp: 145,
      badge: 'Everyday Essential',
      techBadge: 'End-Rounded Bristles',
      headline: 'Affordable Precision Cleaning Designed For Everyday Family Hygiene',
      hype: 'High-density rounded filaments gently buff away plaque while protecting delicate gum tissue. Comes in 4 vibrant colors to keep your hostel bathroom organized.',
      clinicalPointers: [
        'Durable nylon filaments with smooth rounded tips',
        'Slim angled head reaches deep back molars effortlessly',
        'Non-slip thumb grip for controlled brushing pressure',
        'Great value pack for students sharing rooms'
      ],
      image: 'https://www.amway.com/medias/127705-en-US-690px-01?context=bWFzdGVyfGltYWdlc3w2NTAyMXxpbWFnZS9wbmd8c3lzLW1hc3Rlci9pbWFnZXMvaDBkL2gyNy85ODgyMjkzNzMxMzU4LzEyNzcwNS1lbi1VUy02OTBweC0wMXxmODFkMDM1MWZhZTRiOGRmNzRjNzJiM2NlZDI1OTFlOTQ0NmIyZDE4MjIwYmQ1MzVkNjk0YjY4ZjVmYTBkNTEx'
    },

    // =========================================================================
    // 2. BODY & BATH (G&H & PERSONA)
    // =========================================================================
    {
      id: 'gnh-nourish-lotion-250',
      code: 'GNH-LOT250',
      category: 'Body & Bath',
      name: 'G&H Nourish+ Body Lotion (250 ml)',
      spec: 'Orange Blossom Honey, Shea & Pumpkin • 250 ml',
      price: 485,
      mrp: 525,
      badge: 'Hostel Armor',
      techBadge: '24H Moisture Lock',
      headline: 'Zero-Grease 24-Hour Skin Moisture That Absorbs In 10 Seconds',
      hype: 'Infused with Orange Blossom Honey, West African Shea Butter, and Pumpkin Seed Oil. Unlike sticky commercial drugstore lotions loaded with heavy mineral oil, this absorbs instantaneously without staining college shirts or feeling clammy.',
      clinicalPointers: [
        'Clinically proven 24-hour hydration barrier',
        'Instant dry-touch absorption — zero greasy film on skin',
        'Soothes winter scaling, chapped elbows & peeling skin',
        'Hypoallergenic formulation safe for sensitive skin'
      ],
      image: 'https://www.amway.com/medias/125891-en-US-690px-01?context=bWFzdGVyfGltYWdlc3w3ODAwOXxpbWFnZS9wbmd8c3lzLW1hc3Rlci9pbWFnZXMvaDA1L2hlMi85NTY2MTA4NzEyOTkwLzEyNTg5MS1lbi1VUy02OTBweC0wMXwzMTJlOGMyMDc0MTMwZmRkMjUyYzQzY2UzZjZiOWZkOGZkZDNiMjM4MDllZjJlYmZjNTJkOGZhZTNlZWQ5MDdh'
    },
    {
      id: 'gnh-nourish-lotion-60',
      code: 'GNH-LOT60',
      category: 'Body & Bath',
      name: 'G&H Nourish+ Body Lotion (60 ml)',
      spec: 'Pocket Pocket Tube • 60 ml',
      price: 145,
      mrp: 158,
      badge: 'Backpack EDC',
      techBadge: 'Shea Travel Shield',
      headline: 'On-The-Go Botanical Moisture That Resets Ashy Hands & Elbows',
      hype: 'Keep this 60ml squeeze tube in your college backpack. Instantly cures dry, chalky hands after washing with harsh campus restroom soap without leaving oily fingerprints on your laptop keys.',
      clinicalPointers: [
        'Pocket-sized 60ml squeeze tube for daily campus carry',
        'Orange Blossom Honey & Shea butter formula',
        'Quick absorbing: Zero oily residue on phone screen or notebooks',
        'Delicate warm honey botanical scent'
      ],
      image: 'https://www.amway.com/medias/125891-en-US-690px-01?context=bWFzdGVyfGltYWdlc3w3ODAwOXxpbWFnZS9wbmd8c3lzLW1hc3Rlci9pbWFnZXMvaDA1L2hlMi85NTY2MTA4NzEyOTkwLzEyNTg5MS1lbi1VUy02OTBweC0wMXwzMTJlOGMyMDc0MTMwZmRkMjUyYzQzY2UzZjZiOWZkOGZkZDNiMjM4MDllZjJlYmZjNTJkOGZhZTNlZWQ5MDdh'
    },
    {
      id: 'gnh-refresh-wash-60',
      code: 'GNH-WSH60',
      category: 'Body & Bath',
      name: 'G&H Refresh+ Body Wash - Gel (60 ml)',
      spec: 'Aloe Vera & Green Tea Extract • 60 ml',
      price: 145,
      mrp: 158,
      badge: 'Gym Bag Must',
      techBadge: 'Cooling Aloe Gel',
      headline: 'A Refreshing Botanical Shower Gel In A Compact Travel Size',
      hype: 'Formulated with cooling Aloe Vera, Green Tea, and Grape Seed extract. Cleanses away gym sweat and campus heat fatigue while calming inflamed, sun-parched skin.',
      clinicalPointers: [
        'Soap-free, sulfate-free clean plant-based gel',
        'Infused with antioxidant-rich Green Tea and soothing Aloe',
        'Compact 60ml travel tube fits directly into any sports kit',
        'Leaves skin crisp, hydrated and naturally scented'
      ],
      image: 'https://www.amway.com/medias/125914-en-US-690px-01?context=bWFzdGVyfGltYWdlc3wxNTQ3OTh8aW1hZ2UvcG5nfHN5cy1tYXN0ZXIvaW1hZ2VzL2gxNC9oY2IvOTU3Mzc3MzA0OTg4Ni8xMjU5MTQtZW4tVVMtNjkwcHgtMDF8YWZiMGFiNTEwYTQ1ODk2OTYxNDFjZjcxNmQ2YzdkYTEzN2I4MTYxNGYyMTU0ZmYzMmFmYjQ1NzliOWM2ODBmMA'
    },
    {
      id: 'gnh-refresh-wash-250',
      code: 'GNH-WSH250',
      category: 'Body & Bath',
      name: 'G&H Refresh+ Body Wash - Gel (250 ml)',
      spec: 'Antioxidant Botanical Complex • 250 ml',
      price: 440,
      mrp: 480,
      badge: 'Bio Concentrate',
      techBadge: 'Green Tea + Aloe',
      headline: 'A Coin-Sized Drop That Leaves Skin Feeling Crisp & Spa-Clean',
      hype: '100% biodegradable, sulfate-free botanical shower concentrate. A single dime-sized squeeze lathers generously on a loofah, lifting pollution soot and hard water grime without stripping natural skin oils.',
      clinicalPointers: [
        'Concentrated formula: 1 bottle delivers up to 75 full showers',
        'Nutrilite™ green tea and aloe extracts cool body heat',
        '100% vegan certified with zero synthetic dyes or parabens',
        'Dermatologist tested safe for sensitive skin'
      ],
      image: 'https://www.amway.com/medias/125914-en-US-690px-01?context=bWFzdGVyfGltYWdlc3wxNTQ3OTh8aW1hZ2UvcG5nfHN5cy1tYXN0ZXIvaW1hZ2VzL2gxNC9oY2IvOTU3Mzc3MzA0OTg4Ni8xMjU5MTQtZW4tVVMtNjkwcHgtMDF8YWZiMGFiNTEwYTQ1ODk2OTYxNDFjZjcxNmQ2YzdkYTEzN2I4MTYxNGYyMTU0ZmYzMmFmYjQ1NzliOWM2ODBmMA'
    },
    {
      id: 'gnh-nourish-complexion-bar',
      code: 'GNH-BAR3',
      category: 'Body & Bath',
      name: 'G&H Nourish+ Complexion Bar (Pack of 3 x 100g)',
      spec: 'Pack of 3 Translucent Bars • 300g Total',
      price: 680,
      mrp: 740,
      badge: 'Prestige Honey Bar',
      techBadge: 'Triple-Milled Translucent',
      headline: 'The Translucent Facial & Bath Bar Enriched with Pure Honey',
      hype: 'Hand-crafted triple-milled translucent bars rich in Orange Blossom Honey and Shea Butter. Safe for both face and body, leaving zero tight dryness or powdery residue after rinsing.',
      clinicalPointers: [
        'Translucent honey formulation with high glycerin content',
        'Triple-milled density: Never dissolves into mush in soap dishes',
        'Gentle enough for daily facial cleansing and delicate skin',
        'Subtle warm botanical fragrance that calms the senses'
      ],
      image: 'https://rukminim3.flixcart.com/image/480/480/xif0q/soap/n/s/f/1-300-persona-cream-moisturizing-soap-75g-pack-of-3-with-vitamin-original-imahpqgaxpbgdzzd.jpeg?q=90'
    },
    {
      id: 'gnh-protect-rollon',
      code: 'GNH-ROLL',
      category: 'Body & Bath',
      name: 'G&H Protect+ Deodorant & Anti-Perspirant Roll-On',
      spec: 'White Tea & Natural Minerals • 100 ml',
      price: 345,
      mrp: 380,
      badge: '48H Odor Shield',
      techBadge: 'Encapsulated Freshness',
      headline: 'Stops Sweat Odor In Crowded Metro & Buses For 48 Hours',
      hype: 'Engineered with Lichen extract, White Tea, and natural minerals. Uses micro-encapsulated fragrance beads that release freshness as your body temperature rises during sports or long walks.',
      clinicalPointers: [
        'Provides up to 48 hours of clinically proven odor and wetness defense',
        'Clear, dry-touch application: Leaves zero yellow stains on white shirts',
        'Infused with White Tea extract and bilberry botanicals',
        'Dermatologist tested hypoallergenic formulation'
      ],
      image: 'https://www.amway.com/medias/125891-en-US-690px-01?context=bWFzdGVyfGltYWdlc3w3ODAwOXxpbWFnZS9wbmd8c3lzLW1hc3Rlci9pbWFnZXMvaDA1L2hlMi85NTY2MTA4NzEyOTkwLzEyNTg5MS1lbi1VUy02OTBweC0wMXwzMTJlOGMyMDc0MTMwZmRkMjUyYzQzY2UzZjZiOWZkOGZkZDNiMjM4MDllZjJlYmZjNTJkOGZhZTNlZWQ5MDdh'
    },
    {
      id: 'persona-coconut-soap',
      code: 'PERS-SOAP',
      category: 'Body & Bath',
      name: 'Persona™ Pure Coconut Moisturizing Soap',
      spec: 'Pack of 3 Luxury Bars (75g each)',
      price: 180,
      mrp: 195,
      badge: 'Grade-1 TFM 76%',
      techBadge: 'Triple-Milled Coconut',
      headline: 'The Only Soap That Won’t Turn Ashy In Hostel Hard Water',
      hype: 'Commercial soap bars are Grade-3 filler chalk with less than 60% TFM that dry skin into white cracks. Persona is Grade-1 (76%+ Total Fatty Matter) made from 100% pure cold-pressed coconut oil, sweet almond oil, and pure Vitamin E.',
      clinicalPointers: [
        'Highest Grade-1 classification (TFM > 76%)',
        'Enriched with sweet almond oil & pure Vitamin E',
        'Triple-milled: Does not melt or turn into mush in hostel soap dishes',
        'Lathers richly even in high-TDS chlorinated borewell water'
      ],
      image: 'https://rukminim3.flixcart.com/image/480/480/xif0q/soap/n/s/f/1-300-persona-cream-moisturizing-soap-75g-pack-of-3-with-vitamin-original-imahpqgaxpbgdzzd.jpeg?q=90'
    },
    {
      id: 'persona-germ-soap',
      code: 'PERS-GERM',
      category: 'Body & Bath',
      name: 'Persona™ Germ Protection Herbal Bath Bar',
      spec: 'Pack of 3 Hygiene Bars (75g each)',
      price: 190,
      mrp: 210,
      badge: 'Clinical Hygiene',
      techBadge: 'Aloe + Tea Tree',
      headline: '99.9% Gym & Monsoon Bacteria Elimination Without Chemical Burn',
      hype: 'Most antibacterial soaps use harsh chemicals like triclocarban that destroy your skin’s microbiome. Persona uses medical-grade tea tree oil and aloe vera to eliminate sweat odor and fungal gym rashes gently.',
      clinicalPointers: [
        'Eliminates 99.9% of campus athletic & sweat microbes',
        'Triclocarban-free natural antiseptic shield',
        'Aloe vera infusion protects skin barrier from cracking',
        'Recommended for hostelers who play sports or hit the gym'
      ],
      image: 'https://rukminim3.flixcart.com/image/480/480/xif0q/soap/j/e/a/4-200-persona-creme-moisturizing-soap-pack-of-4-amway-original-imahf7gnxphphnye.jpeg?q=80'
    },
    {
      id: 'persona-talc',
      code: 'PERS-TLC',
      category: 'Body & Bath',
      name: 'Persona™ Deodorizing Cedarwood Talc',
      spec: 'Anti-Sweat Micro-Fine • 350g Mega Pack',
      price: 170,
      mrp: 185,
      badge: 'Summer Shield',
      techBadge: 'Micro-Fine Particle',
      headline: 'Stops Shirt Sweat Stains & Friction Chafing In Non-AC Classrooms',
      hype: 'Micro-pulverized talc particles create an invisible friction barrier on your neck, chest, and inner thighs. Features an active cooling deodorant matrix that activates whenever body temperature rises.',
      clinicalPointers: [
        'Absorbs 4x its weight in humidity and excess sweat',
        'Subtle, masculine cedarwood aroma that lasts all day',
        'Prevents collar staining and chafing during long lab hours',
        'Dermatologically tested against heat rashes and prickly heat'
      ],
      image: 'https://rukminim3.flixcart.com/image/480/480/xif0q/soap/n/s/f/1-300-persona-cream-moisturizing-soap-75g-pack-of-3-with-vitamin-original-imahpqgaxpbgdzzd.jpeg?q=90'
    },
    {
      id: 'persona-hand-wash',
      code: 'PERS-HAND',
      category: 'Body & Bath',
      name: 'Persona™ Cream Moisturizing Hand Wash',
      spec: 'Vitamin E & Aloe Infused • 250 ml Pump',
      price: 175,
      mrp: 190,
      badge: 'Skin Safe',
      techBadge: 'pH 5.5 Balanced',
      headline: 'Kills Mess Bacteria Without Turning Your Hands Rough And Scaly',
      hype: 'Hostel mess liquid soaps are cheap industrial surfactants that strip your hands raw. Persona Hand Wash combines active antibacterial cleansers with pure Aloe and Vitamin E to leave hands clean, soft, and moisturized.',
      clinicalPointers: [
        'Rich creamy lather lifts grease, oil & meal stains easily',
        'Aloe vera & Vitamin E protect hands from drying out',
        'Convenient pump dispenser for bathroom washbasins',
        'Pleasant, non-medicinal clean botanical aroma'
      ],
      image: 'https://rukminim3.flixcart.com/image/480/480/xif0q/soap/n/s/f/1-300-persona-cream-moisturizing-soap-75g-pack-of-3-with-vitamin-original-imahpqgaxpbgdzzd.jpeg?q=90'
    },

    // =========================================================================
    // 3. HAIR & SCALP THERAPY (SATINIQUE & PERSONA)
    // =========================================================================
    {
      id: 'satinique-scalp-tonic',
      code: 'SATN-TONIC',
      category: 'Hair & Scalp',
      name: 'SATINIQUE™ Scalp Tonic (80 ml)',
      spec: 'Scalp Revitalizing Complex • 80 ml Bottle',
      price: 1699,
      mrp: 1847,
      badge: 'Clinical Prestige',
      techBadge: 'Patented Bio-Complex',
      headline: 'The High-Performance Leave-In Treatment Against Hair Thinning',
      hype: 'Features a patented Scalp Revitalizing Complex infused with Shiso extract, Saw Palmetto, Licorice root, and Green Rooibos. Applied directly to the scalp, it rejuvenates weak roots and promotes noticeably thicker, fuller-looking hair.',
      clinicalPointers: [
        'Patented Scalp Revitalizing Complex strengthens fine fragile roots',
        'Saw Palmetto & Shiso extracts create an optimal scalp environment',
        'Hydrates dry, itchy scalp and reduces flaking from hard borewell water',
        'Leave-in non-greasy water-weight serum: zero sticky residue on hair'
      ],
      image: 'https://assets.myntassets.com/w_412,q_50,,dpr_3,fl_progressive,f_webp/assets/images/2024/SEPTEMBER/6/TKVANReH_1c6880ced96042a4ab8f4e714784b0c1.jpg'
    },
    {
      id: 'satinique-2in1',
      code: 'SATN-2IN1',
      category: 'Hair & Scalp',
      name: 'Satinique™ 2-in-1 Shampoo & Conditioner',
      spec: 'Patented Enerjuve™ Complex • 250 ml',
      price: 465,
      mrp: 510,
      badge: 'Salon Engineering',
      techBadge: 'Enerjuve™ Molecule',
      headline: 'Restores Lustre In 60 Seconds For Guys Who Hate Multiple Bottles',
      hype: 'Patented Enerjuve™ is a positively-charged lipid complex that automatically seeks out negatively-charged damaged hair cuticles caused by sun, dust, and hard borewell water, repairing hair from the core outward.',
      clinicalPointers: [
        'Enerjuve™ patented lipid-creatine-18-MEA restorative complex',
        'Borage seed oil & Vitamin E restore dull dry strands',
        'One-step wash and detangle — cut shower time in half',
        'Maintains clean volume without flattening roots'
      ],
      image: 'https://www.amway.com/medias/126455-en-US-690px-01?context=bWFzdGVyfGltYWdlc3wxMDAyMjR8aW1hZ2UvcG5nfHN5cy1tYXN0ZXIvaW1hZ2VzL2hkNS9oYzgvOTk3NDI0MzU5MDE3NC8xMjY0NTUtZW4tVVMtNjkwcHgtMDF8N2ZlZmQ2N2ZlMmVkNDA2YWYyOWU1YTdiZDNlZTYxODRmNmFmMDk5MmQ0ZjM5MGI4MjZkYzliZTk3Y2U0NmVlNA'
    },
    {
      id: 'satinique-antihairfall',
      code: 'SATN-FALL',
      category: 'Hair & Scalp',
      name: 'Satinique™ Scalp Anti-Hairfall Shampoo',
      spec: 'Ginseng & Mulberry Active • 250 ml',
      price: 435,
      mrp: 475,
      badge: 'Hard Water Armor',
      techBadge: '1800 Strands Saved',
      headline: 'The Secret Weapon Against Hard Water Hair Thinning On Campus',
      hype: 'Hostel shower water is rich in heavy minerals that clog hair follicles, resulting in handfuls of fallen hair every morning. Satinique Anti-Hairfall uses Korean Ginseng and Mulberry leaf extract to clear micro-blockages and save up to 1,800 strands a month.',
      clinicalPointers: [
        'Saves up to 1,800 hair strands per month in clinical trials',
        'Stimulates micro-capillary scalp blood circulation',
        'Exfoliates mineral build-up from chlorinated shower water',
        'Fortifies fragile roots against tension and towel breakage'
      ],
      image: 'https://www.amway.com/medias/126460-en-US-690px-01?context=bWFzdGVyfGltYWdlc3wxMTIzMTF8aW1hZ2UvcG5nfHN5cy1tYXN0ZXIvaW1hZ2VzL2g1MS9oMGYvOTk1ODg3OTQyODYzOC8xMjY0NjAtZW4tVVMtNjkwcHgtMDF8MTQyZjU3NjI4MmUyZTcwNDFiYzNhMjE1NzA3MTVhMjg5YmI1NDhkMDU0ZDFhN2E0NGM5NDk5MjQxODc0OTE5NQ'
    },
    {
      id: 'satinique-antidandruff',
      code: 'SATN-DNDR',
      category: 'Hair & Scalp',
      name: 'Satinique™ Anti-Dandruff Botanical Shampoo',
      spec: 'Zinc Pyrithione & Avocado Oil • 250 ml',
      price: 450,
      mrp: 490,
      badge: 'Scalp Detox',
      techBadge: 'Anti-Flake Shield',
      headline: 'Eliminates White Flakes On Your Shoulders Without Drying Hair Out',
      hype: 'Commercial dandruff shampoos use aggressive chemicals that leave hair feeling like stiff straw. Satinique combines clinical Zinc Pyrithione with nourishing Avocado Oil and Vitamin E to wipe out dandruff fungi while keeping hair touchably soft.',
      clinicalPointers: [
        'Clinically proven Zinc Pyrithione eliminates flakes and itchiness',
        'Avocado oil lipid complex maintains natural hair moisture',
        'Controls sebum production that feeds dandruff yeast',
        'Safe for daily use and color-treated hair'
      ],
      image: 'https://www.amway.com/medias/126455-en-US-690px-01?context=bWFzdGVyfGltYWdlc3wxMDAyMjR8aW1hZ2UvcG5nfHN5cy1tYXN0ZXIvaW1hZ2VzL2hkNS9oYzgvOTk3NDI0MzU5MDE3NC8xMjY0NTUtZW4tVVMtNjkwcHgtMDF8N2ZlZmQ2N2ZlMmVkNDA2YWYyOWU1YTdiZDNlZTYxODRmNmFmMDk5MmQ0ZjM5MGI4MjZkYzliZTk3Y2U0NmVlNA'
    },
    {
      id: 'satinique-glossy-repair',
      code: 'SATN-GLOS',
      category: 'Hair & Scalp',
      name: 'Satinique™ Glossy Repair Color & Damage Shampoo',
      spec: 'Pomegranate & Grape Seed Extract • 250 ml',
      price: 475,
      mrp: 520,
      badge: 'Keratin Armor',
      techBadge: 'Pomegranate Bio',
      headline: 'Repairs Chemical Bleaching, Heat Straightening & Sun Damage',
      hype: 'Specifically formulated for hair damaged by chemical dyes, curling irons, or extreme sun exposure. Pomegranate antioxidants and Grape Seed extract heal cuticles to lock in vibrant glossy shine.',
      clinicalPointers: [
        'Reduces split ends and breakage by up to 9x',
        'Locks in hair color vibrancy for up to 45 washes',
        'Enriched with Pomegranate and Grape Seed bio-extracts',
        'Patented Enerjuve™ rebuilds inner cortex strength'
      ],
      image: 'https://www.amway.com/medias/126460-en-US-690px-01?context=bWFzdGVyfGltYWdlc3wxMTIzMTF8aW1hZ2UvcG5nfHN5cy1tYXN0ZXIvaW1hZ2VzL2g1MS9oMGYvOTk1ODg3OTQyODYzOC8xMjY0NjAtZW4tVVMtNjkwcHgtMDF8MTQyZjU3NjI4MmUyZTcwNDFiYzNhMjE1NzA3MTVhMjg5YmI1NDhkMDU0ZDFhN2E0NGM5NDk5MjQxODc0OTE5NQ'
    },
    {
      id: 'satinique-glossy-cond',
      code: 'SATN-CND',
      category: 'Hair & Scalp',
      name: 'Satinique™ Glossy Repair Conditioner',
      spec: 'Deep Cuticle Smoothing Rinse • 250 ml',
      price: 475,
      mrp: 520,
      badge: 'Silky Slip',
      techBadge: 'Cuticle Sealant',
      headline: 'The Ultimate Detangling Conditioner For Glass-Smooth Strands',
      hype: 'Seals down jagged hair cuticles within 60 seconds of application. Eliminates painful brushing knots and flyaway static, leaving hair with liquid reflection shine.',
      clinicalPointers: [
        'Instantly detangles wet hair without breakage or pulling',
        'Seals open cuticle scales to prevent humidity frizz',
        'Weightless rinse: Never leaves limp greasy buildup',
        'Formulated with organic grape seed lipids'
      ],
      image: 'https://www.amway.com/medias/126455-en-US-690px-01?context=bWFzdGVyfGltYWdlc3wxMDAyMjR8aW1hZ2UvcG5nfHN5cy1tYXN0ZXIvaW1hZ2VzL2hkNS9oYzgvOTk3NDI0MzU5MDE3NC8xMjY0NTUtZW4tVVMtNjkwcHgtMDF8N2ZlZmQ2N2ZlMmVkNDA2YWYyOWU1YTdiZDNlZTYxODRmNmFmMDk5MmQ0ZjM5MGI4MjZkYzliZTk3Y2U0NmVlNA'
    },
    {
      id: 'satinique-hair-mask',
      code: 'SATN-MASK',
      category: 'Hair & Scalp',
      name: 'Satinique™ Revitalizing Deep Hair Mask',
      spec: 'Intensive Salon Hair Spa • 240g Tub',
      price: 810,
      mrp: 890,
      badge: 'Weekend Hair Spa',
      techBadge: 'Deep Lipid Infusion',
      headline: 'A Weekly 5-Minute Treatment That Reverses An Entire Month of Damage',
      hype: 'A rich, restorative deep-conditioning mask that penetrates through every cortex layer. Used once weekly, it transforms brittle, straw-like hair into supple, salon-smooth tresses.',
      clinicalPointers: [
        'Deep intra-cortex repair for fried, heat-styled or chemically treated hair',
        'Kukui seed oil and Provitamin B5 nourish deep hair fiber',
        'Prevents 90% of split ends when used as a weekly ritual',
        'Salon quality hair spa right in your hostel room'
      ],
      image: 'https://www.amway.com/medias/126460-en-US-690px-01?context=bWFzdGVyfGltYWdlc3wxMTIzMTF8aW1hZ2UvcG5nfHN5cy1tYXN0ZXIvaW1hZ2VzL2g1MS9oMGYvOTk1ODg3OTQyODYzOC8xMjY0NjAtZW4tVVMtNjkwcHgtMDF8MTQyZjU3NjI4MmUyZTcwNDFiYzNhMjE1NzA3MTVhMjg5YmI1NDhkMDU0ZDFhN2E0NGM5NDk5MjQxODc0OTE5NQ'
    },
    {
      id: 'satinique-overnight-serum',
      code: 'SATN-SRM',
      category: 'Hair & Scalp',
      name: 'Satinique™ Overnight Repair Hair Serum',
      spec: 'Nocturnal Split End Sealant • 100 ml Pump',
      price: 690,
      mrp: 750,
      badge: 'Leave-In Elixir',
      techBadge: 'Pomegranate Micro-Lipid',
      headline: 'Heals Split Ends While You Sleep Without Greasing Your Pillow',
      hype: 'A pillow-safe leave-in night serum that binds frayed cuticles and mend split ends while you rest. Wake up with smooth, manageable, non-frizzy hair ready for college without blow-drying.',
      clinicalPointers: [
        'Clinically proven to mend 100% of micro-split ends overnight',
        'Pillow-safe, fast-absorbing weightless emulsion',
        'Protects hair from pillowcase friction and tangling',
        'Zero greasy residue: No need to wash hair next morning'
      ],
      image: 'https://assets.myntassets.com/w_412,q_50,,dpr_3,fl_progressive,f_webp/assets/images/2024/SEPTEMBER/6/TKVANReH_1c6880ced96042a4ab8f4e714784b0c1.jpg'
    },
    {
      id: 'persona-coconut-oil',
      code: 'PERS-OIL',
      category: 'Hair & Scalp',
      name: 'Persona™ 100% Pure Virgin Coconut Oil',
      spec: 'Cold Pressed Edible Grade • 500 ml Jumbo',
      price: 255,
      mrp: 280,
      badge: '100% Unadulterated',
      techBadge: 'Cold-Pressed Purity',
      headline: 'Zero Liquid Paraffin. Zero Chemicals. 100% Kerala Coconuts.',
      hype: 'Check your current hair oil label: 90% of commercial "coconut oils" are actually Light Liquid Paraffin (petroleum mineral oil). Persona is 100% pure cold-pressed edible grade coconut oil that penetrates deep into the hair cortex.',
      clinicalPointers: [
        '100% pure edible grade coconut oil — zero petroleum filler',
        'Rich in medium-chain fatty acids (Lauric Acid)',
        'Deep pre-shampoo hot-oil treatment for damaged rough hair',
        'Also doubles as an organic face & beard skin moisturizer'
      ],
      image: 'https://rukminim3.flixcart.com/image/480/480/xif0q/hair-oil/q/b/y/500-persona-pure-coconut-oil-for-hair-skin-care-natural-original-imahzavpkmfaqpbb.jpeg?q=90'
    },
    {
      id: 'persona-amla-oil',
      code: 'PERS-AMLA',
      category: 'Hair & Scalp',
      name: 'Persona™ Amla Herbal Hair Oil (200 ml)',
      spec: 'Amla & Herbal Extracts • 200 ml Bottle',
      price: 125,
      mrp: 140,
      badge: 'Ayurvedic Care',
      techBadge: 'Amla Tannins',
      headline: 'Traditional Herbal Root Strengthening For Dark, Thick Hair',
      hype: 'Packed with natural Vitamin C from fresh Amla fruit. Deeply nourishes hair roots, delays premature graying caused by stress and exams, and leaves hair visibly darker and silkier.',
      clinicalPointers: [
        'Natural Amla fruit tannins reinforce hair melanin',
        'Stimulates active follicles to promote thicker density',
        'Cooling herbal formula relieves headache and exam tension',
        'Non-sticky herbal conditioning blend'
      ],
      image: 'https://rukminim3.flixcart.com/image/480/480/xif0q/hair-oil/q/b/y/500-persona-pure-coconut-oil-for-hair-skin-care-natural-original-imahzavpkmfaqpbb.jpeg?q=90'
    },

    // =========================================================================
    // 4. MEN'S GROOMING (DYNAMITE)
    // =========================================================================
    {
      id: 'dynamite-deo-matrix',
      code: 'DYNA-MATR',
      category: "Men's Grooming",
      name: 'DYNAMITE™ Deodorant Matrix (150 ml)',
      spec: 'Woody Citrus Long-Stay • 150 ml Aerosol',
      price: 285,
      mrp: 314,
      badge: 'Signature Scent',
      techBadge: 'Odor Lock Matrix',
      headline: 'The Magnetic Woody-Citrus Deo That Cuts Through Campus Sweat',
      hype: 'Engineered for young men with active campus routines. Matrix unleashes an energetic blast of bergamot, fresh lavender, and warm cedarwood that neutralizes sweat odor without smelling like cheap synthetic alcohol.',
      clinicalPointers: [
        '100% CFC-free aerosol formulation dermatologically tested',
        'Woody-aromatic profile with notes of citrus, lavender & amber',
        'Stays active through 8 hours of bike commutes and lectures',
        'Zero underarm skin irritation or stinging'
      ],
      image: 'https://5.imimg.com/data5/SELLER/Default/2022/7/RQ/NN/VN/88964716/dynamite-deodorant-matrix-500x500.jpg'
    },
    {
      id: 'dynamite-deo-storm',
      code: 'DYNA-STRM',
      category: "Men's Grooming",
      name: 'DYNAMITE™ Deodorant Storm (150 ml)',
      spec: 'Spicy Amber Energy Burst • 150 ml Aerosol',
      price: 285,
      mrp: 314,
      badge: 'High Octane',
      techBadge: 'Cryo-Fresh',
      headline: 'An Electrifying Burst of Spice & Musk For Night Parties & Fests',
      hype: 'A dynamic masculine fragrance designed for evenings, college festivals, and dates. Combines cardamom spice with crisp aquatic notes and rich vetiver for high-impact presence.',
      clinicalPointers: [
        'Long-lasting evening fragrance with dynamic projection',
        'Zero gas wastage — high-concentration fine fragrance mist',
        'Anti-bacterial formula prevents sweat-breakdown odor',
        'Safe to spray directly on skin and clothing'
      ],
      image: 'https://5.imimg.com/data5/SELLER/Default/2022/7/RQ/NN/VN/88964716/dynamite-deodorant-matrix-500x500.jpg'
    },
    {
      id: 'dynamite-facewash',
      code: 'DYNA-WASH',
      category: "Men's Grooming",
      name: 'Dynamite™ Foaming Face Wash For Men',
      spec: 'Activated Charcoal & Vitamin B3 • 150 ml Mega',
      price: 295,
      mrp: 325,
      badge: 'Extreme Cleanse',
      techBadge: 'Micro-Charcoal Sponge',
      headline: 'Ice-Cold Charcoal Shock That Removes 8 Hours of Bike Smog & Sweat',
      hype: 'Engineered specifically for thicker male skin exposed to open pollution and bike commutes. Activated bamboo charcoal micro-sponges absorb 200x their weight in stubborn oil, while cooling menthol resets your focus instantly.',
      clinicalPointers: [
        'Activated micro-charcoal lifts ground-in traffic soot & grime',
        'Vitamin B3 (Niacinamide) prevents acne and dark spots',
        'Cryo-menthol burst gives an instant 5-hour energy refresh',
        '150ml extra-large pump bottle lasts the entire semester'
      ],
      image: 'https://rukminim3.flixcart.com/image/480/640/xif0q/face-wash/m/i/l/150-dynamite-foaming-face-wash-amway-original-imahgmg8m4mctggp.jpeg?q=90'
    },
    {
      id: 'dynamite-shave-foam',
      code: 'DYNA-SHAV',
      category: "Men's Grooming",
      name: 'Dynamite™ Ultra-Glide Shaving Foam (200g)',
      spec: 'Aloe Vera Comfort Cushion • 200g Can',
      price: 215,
      mrp: 240,
      badge: 'Zero Burn',
      techBadge: 'Micro-Cushion Foam',
      headline: 'A Razor Glide So Smooth You Won’t Feel A Single Blade Pull',
      hype: 'Commercial foams are mostly compressed air and drying alcohol that give you ingrown hairs and bleeding nicks before exams. Dynamite creates a dense, hydro-lipid cushion rich in aloe and chamomile that softens coarse beard hair.',
      clinicalPointers: [
        'Dense micro-bubble matrix creates a friction-free glide layer',
        'Infused with pure Aloe Vera & Chamomile to stop razor burn',
        'Hydrates skin underneath beard to prevent flaky peeling',
        'Leaves a clean, crisp masculine after-feel'
      ],
      image: 'https://rukminim3.flixcart.com/image/480/640/xif0q/face-wash/m/i/l/150-dynamite-foaming-face-wash-amway-original-imahgmg8m4mctggp.jpeg?q=90'
    },
    {
      id: 'dynamite-shave-cream',
      code: 'DYNA-CRM',
      category: "Men's Grooming",
      name: 'Dynamite™ Conditioning Shaving Cream (70g)',
      spec: 'Moisturizing Lather Tube • 70g Travel Tube',
      price: 105,
      mrp: 120,
      badge: 'Travel Pocket',
      techBadge: 'High-Lather Emulsion',
      headline: 'Rich Brush Lather That Conditions Coarse Stubble On The Go',
      hype: 'Compact 70g tube designed for students who prefer brush lathering. Creates a thick, creamy protective layer that prepares stubble for an effortless close shave anywhere.',
      clinicalPointers: [
        'Rich emollient lather cushions razor blades against irritation',
        'Conditioning ingredients leave facial skin soft and moisturized',
        'Compact 70g tube fits in any travel dopp kit',
        'Extremely economical: small coin size yields full face lather'
      ],
      image: 'https://rukminim3.flixcart.com/image/480/640/xif0q/face-wash/m/i/l/150-dynamite-foaming-face-wash-amway-original-imahgmg8m4mctggp.jpeg?q=90'
    },
    {
      id: 'dynamite-aftershave',
      code: 'DYNA-AFT',
      category: "Men's Grooming",
      name: 'Dynamite™ Cooling After Shave Splash',
      spec: 'Witch Hazel & Menthol Chill • 100 ml Splash',
      price: 325,
      mrp: 360,
      badge: 'Razor Antidote',
      techBadge: 'Cryo-Astringent',
      headline: 'Instantly Closes Pores & Stops Bleeding Razor Nicks In Their Tracks',
      hype: 'Formulated with natural Witch Hazel and soothing Aloe Vera. Calms razor heat in 5 seconds, closes open micro-cuts, and prevents infected ingrown hairs with a crisp masculine scent.',
      clinicalPointers: [
        'Natural astringent Witch Hazel tightens open pores immediately',
        'Menthol provides a rapid cooling sensation against blade sting',
        'Antiseptic protection stops post-shave pimples and folliculitis',
        'Refined masculine fragrance that lasts into midday'
      ],
      image: 'https://5.imimg.com/data5/SELLER/Default/2022/7/RQ/NN/VN/88964716/dynamite-deodorant-matrix-500x500.jpg'
    },
    {
      id: 'dynamite-whitening-cream',
      code: 'DYNA-WHT',
      category: "Men's Grooming",
      name: 'Dynamite™ Whitening Cream For Men SPF 15',
      spec: 'Sun Defense & Vitamin B3 • 50g Tube',
      price: 275,
      mrp: 310,
      badge: 'Tan Eraser',
      techBadge: 'Lumiskin™ Men',
      headline: 'Removes Bike Helmet Tan & Dark Sun Marks in 2 Weeks',
      hype: 'Formulated specifically for male skin damaged by outdoor pollution and sun. Combines broad-spectrum SPF 15 with Licorice root and Vitamin B3 to erase dark forehead helmet marks and sun spots.',
      clinicalPointers: [
        'Reverses sun tan from daily college scooter and bike rides',
        'SPF 15 prevents further UV darkening and premature wrinkles',
        'Ultra-matte finish: Zero sweaty sheen on forehead or nose',
        'Lightweight, non-greasy absorption in under 15 seconds'
      ],
      image: 'https://rukminim3.flixcart.com/image/480/640/xif0q/face-wash/m/i/l/150-dynamite-foaming-face-wash-amway-original-imahgmg8m4mctggp.jpeg?q=90'
    },
    {
      id: 'dynamite-3in1-shower',
      code: 'DYNA-3IN1',
      category: "Men's Grooming",
      name: 'Dynamite™ 3-in-1 Body Wash, Shampoo & Face Wash',
      spec: 'Charcoal & Menthol All-In-One • 250 ml',
      price: 375,
      mrp: 420,
      badge: 'Gym Warrior',
      techBadge: 'Multi-Tasking Cleanser',
      headline: 'The Only Bottle You Need In Your Gym & Hostel Bathroom',
      hype: 'Engineered for athletes and busy students. One single bottle cleanses your hair, face, and body with activated charcoal and cryo-menthol, saving locker room space and shower time.',
      clinicalPointers: [
        'Cleans hair, face, and body with zero formula compromises',
        'Activated charcoal removes gym sweat, dead skin & chlorine',
        'Infused with Provitamin B5 to keep hair soft and scalp fresh',
        'Cuts shower time to under 3 minutes after heavy workouts'
      ],
      image: 'https://rukminim3.flixcart.com/image/480/640/xif0q/face-wash/m/i/l/150-dynamite-foaming-face-wash-amway-original-imahgmg8m4mctggp.jpeg?q=90'
    },

    // =========================================================================
    // 5. SKINCARE (ATTITUDE HERBALS)
    // =========================================================================
    {
      id: 'attitude-be-bright-wash',
      code: 'ATTD-WASH',
      category: 'Skincare (Attitude)',
      name: 'Attitude™ Be Bright Herbal Face Wash',
      spec: 'Papaya & Lemon Bio-Enzymes • 100 ml',
      price: 345,
      mrp: 385,
      badge: 'Bestseller',
      techBadge: 'Fruit Enzyme Complex',
      headline: 'Melts Away Bike Dust & Campus Grease Without Stripping Your Skin',
      hype: 'Formulated with organic Papaya enzymes and Lemon extract. Dissolves micro-pollutants and stubborn midday sebum without harsh drying sulfates that trigger rebound oiliness 30 minutes later.',
      clinicalPointers: [
        'Bio-enzymatic micro-exfoliation removes deep dead skin cells',
        'Vitamin C bio-complex reverses dull tan from college commute',
        'Soap-free gel formulation respects skin pH balance 5.5',
        'Visible brightness boost after a single 30-second wash'
      ],
      image: 'https://rukminim3.flixcart.com/image/480/640/xif0q/face-wash/o/a/1/100-attitude-be-bright-herbals-face-wash-herbal-radiant-face-original-imahgb3ymgwwhpg7.jpeg?q=90'
    },
    {
      id: 'attitude-scrub-dtan',
      code: 'ATTD-SCRB',
      category: 'Skincare (Attitude)',
      name: 'Attitude™ Be Bright Herbals Face Scrub & D-Tan',
      spec: 'Crushed Walnut & Papaya Exfoliator • 100g',
      price: 375,
      mrp: 420,
      badge: 'Detox Formula',
      techBadge: 'Micro-Exfoliant',
      headline: 'Instant Campus D-Tan That Unclogs Blackheads In 2 Minutes',
      hype: 'Gently dislodges stubborn blackheads and baked-in sun tan from daily college walking. Spherical micro-beads of walnut shell polish rough skin texture without micro-tearing delicate facial tissue.',
      clinicalPointers: [
        'Natural crushed walnut shell micro-granules',
        'Formulated with herbal skin-lightening Licorice & Papaya',
        'Removes dead skin layers and clears blocked whiteheads',
        'Use twice weekly for glassy, smooth campus skin'
      ],
      image: 'https://rukminim3.flixcart.com/image/160/210/xif0q/scrub/b/v/y/100-0-face-scrub-for-d-tan-helps-in-skin-brightening-and-remove-original-imaheruwsr9faf9z.jpeg?q=90'
    },
    {
      id: 'attitude-day-cream',
      code: 'ATTD-SPF',
      category: 'Skincare (Attitude)',
      name: 'Attitude™ Be Bright Day Cream SPF 15',
      spec: 'Lumiskin™ & Blue-Light Shield • 50g',
      price: 535,
      mrp: 595,
      badge: 'Screen Guard',
      techBadge: 'Blue-Light Defense',
      headline: 'The Only Day Cream Built For Late-Night Laptop Coders & Campus Sun',
      hype: 'Engineered for students spending 10+ hours staring at screens. Combines broad-spectrum SPF 15 with HEV blue-light shielding antioxidants and Indian Gooseberry to prevent digital dullness and pigmentation.',
      clinicalPointers: [
        'Shields against laptop/monitor high-energy blue-light rays',
        'Ultra-lightweight matte gel: Zero sweaty sheen in classroom heat',
        'Indian Gooseberry bio-actives even out patchy dark marks',
        'Non-comedogenic: Guaranteed zero clogged pores or whiteheads'
      ],
      image: 'https://rukminim3.flixcart.com/image/480/480/xif0q/moisturizer-cream/x/f/z/50-attitude-be-bright-herbals-night-cream-soft-smooth-radiant-original-imahgb2c8rgtsdhd.jpeg?q=90'
    },
    {
      id: 'attitude-night-cream',
      code: 'ATTD-NGHT',
      category: 'Skincare (Attitude)',
      name: 'Attitude™ Be Bright Herbal Deep Night Cream',
      spec: 'Nocturnal Cellular Repair Matrix • 50g',
      price: 560,
      mrp: 625,
      badge: 'Cellular Recovery',
      techBadge: 'Night Lotus Active',
      headline: 'Wake Up Looking Rested Even After An All-Night Coding Session',
      hype: 'While you sleep in your hostel room, this dense restorative cream accelerates cellular renewal using Indian Lotus and Licorice root. Wakes up tired, sleep-deprived skin and completely reverses pollution dullness by 7 AM.',
      clinicalPointers: [
        'Overnight bio-hydration that penetrates 10 cuticle layers deep',
        'Fades acne scarring and dark spots caused by stress',
        'Locks in moisture against dehydrating hostel fan/AC air',
        'Non-greasy velvet finish that doesn’t stain your pillow'
      ],
      image: 'https://rukminim3.flixcart.com/image/480/480/xif0q/moisturizer-cream/x/f/z/50-attitude-be-bright-herbals-night-cream-soft-smooth-radiant-original-imahgb2c8rgtsdhd.jpeg?q=90'
    },
    {
      id: 'attitude-sunscreen',
      code: 'ATTD-SUN',
      category: 'Skincare (Attitude)',
      name: 'Attitude™ Sunscreen Cream SPF 30 PA+++',
      spec: 'Broad Spectrum Dry-Touch Shield • 100g',
      price: 495,
      mrp: 550,
      badge: 'Zero White Cast',
      techBadge: 'PA+++ Max Defense',
      headline: 'Sweat-Resistant Sun Armor That Won’t Turn You Into A Ghost',
      hype: 'Most drugstore sunscreens leave a chalky white film and melt into stinging sweat during summer campus commutes. Attitude SPF 30 PA+++ is a dry-touch formulation that bonds to skin with pure herbal UV blockers and zero stickiness.',
      clinicalPointers: [
        'High-grade PA+++ rating blocks both aging UVA and burning UVB',
        '100% transparent dry-touch finish on all Indian skin tones',
        'Sweat and water-resistant for up to 80 minutes outdoors',
        'Dermatologist tested: zero fungal acne or clogged pores'
      ],
      image: 'https://rukminim3.flixcart.com/image/480/640/xif0q/sunscreen/r/j/v/100-dermatologically-tested-30-attitude-original-imahgbgecwjhfgkr.jpeg?q=90'
    },
    {
      id: 'attitude-clear-activ',
      code: 'ATTD-ACNE',
      category: 'Skincare (Attitude)',
      name: 'Attitude™ Clear Activ Pimple Control Face Wash',
      spec: 'Salicylic Acid & Green Tea Active • 100 ml',
      price: 360,
      mrp: 399,
      badge: 'Acne Strike',
      techBadge: '2% BHA Salicylic',
      headline: 'Dries Out Red Hormonal & Mess-Food Breakouts In 48 Hours',
      hype: 'Oily canteen food, dust, and exam stress create painful inflamed cystic breakouts. Clear Activ penetrates directly into deep sebum plugs with 2% Salicylic Acid and botanical Green Tea to kill acne bacteria at the root.',
      clinicalPointers: [
        'Clears active whiteheads, blackheads, and hormonal pimples',
        'Regulates T-zone oil production for up to 8 hours',
        'Green tea antioxidants calm redness and post-acne dark marks',
        'Gentle enough for twice-daily cleansing without flaking'
      ],
      image: 'https://rukminim3.flixcart.com/image/480/640/xif0q/face-wash/o/a/1/100-attitude-be-bright-herbals-face-wash-herbal-radiant-face-original-imahgb3ymgwwhpg7.jpeg?q=90'
    },
    {
      id: 'attitude-spot-corrector',
      code: 'ATTD-SPOT',
      category: 'Skincare (Attitude)',
      name: 'Attitude™ Clear Activ Anti-Acne Spot Corrector',
      spec: 'Targeted Gel Applicator • 9 ml',
      price: 270,
      mrp: 299,
      badge: 'Pimple Eraser',
      techBadge: 'Targeted BHA Gel',
      headline: 'Dab Directly On Sudden Red Pimples Before An Important Presentation',
      hype: 'A pocket-sized targeted roller/applicator gel containing concentrated Salicylic Acid and Licorice extract. Shrinks inflamed emergency pimples overnight without peeling surrounding skin.',
      clinicalPointers: [
        'Direct precision application directly onto angry red pimples',
        'Visible reduction in swelling and redness within 12 hours',
        'Transparent gel dries invisible under sunscreen or compact',
        'Fits discreetly in your pocket for emergency exam-week breakouts'
      ],
      image: 'https://rukminim3.flixcart.com/image/480/640/xif0q/face-wash/o/a/1/100-attitude-be-bright-herbals-face-wash-herbal-radiant-face-original-imahgb3ymgwwhpg7.jpeg?q=90'
    },
    {
      id: 'attitude-face-masque',
      code: 'ATTD-MSQ',
      category: 'Skincare (Attitude)',
      name: 'Attitude™ Be Bright Herbal Face Masque',
      spec: 'Clay Detox & Skin Rejuvenation • 100g Tub',
      price: 405,
      mrp: 450,
      badge: 'Weekend Detox',
      techBadge: 'Mineral Clay Complex',
      headline: 'Extracts 7 Days of Micro-Pollution Soot From Your Pores In 15 Mins',
      hype: 'Enriched with mineral clay, Papaya enzymes, and Indian Lotus. Dries down into a tightening detox mask that vacuums out oil, sebum plugs, and traffic soot, restoring radiant clarity.',
      clinicalPointers: [
        'Absorbs deep pore impactions and stubborn blackhead sebum',
        'Fades patchy dullness and restores a rested semester glow',
        'Use once or twice weekly on Sunday hostel detox sessions',
        'Leaves skin cooled, tightened and noticeably smoother'
      ],
      image: 'https://rukminim3.flixcart.com/image/480/480/xif0q/moisturizer-cream/x/f/z/50-attitude-be-bright-herbals-night-cream-soft-smooth-radiant-original-imahgb2c8rgtsdhd.jpeg?q=90'
    },
    {
      id: 'attitude-deo-women',
      code: 'ATTD-DEO',
      category: 'Skincare (Attitude)',
      name: 'Attitude™ Deodorant Body Spray For Women',
      spec: 'Enchant & Fantasy Florals • 150 ml',
      price: 270,
      mrp: 299,
      badge: 'Floral Cashmere',
      techBadge: 'Zero Irritation',
      headline: 'A Delicate Botanical Floral Mist That Keeps You Fresh All Day',
      hype: 'Infused with clean botanical extracts and soft floral notes. Protects against sweat odor in hot classrooms and crowded shuttles without drying your delicate underarm skin.',
      clinicalPointers: [
        'Dermatologically tested gentle on sensitive underarms',
        'Zero white marks on dark kurtis, tops, or shirts',
        'Sophisticated floral cashmere scent with 12-hour longevity',
        '100% CFC-free environment-conscious formulation'
      ],
      image: 'https://rukminim3.flixcart.com/image/480/640/xif0q/sunscreen/r/j/v/100-dermatologically-tested-30-attitude-original-imahgbgecwjhfgkr.jpeg?q=90'
    },

    // =========================================================================
    // 6. BEAUTY, MAKEUP & ARTISTRY PRESTIGE
    // =========================================================================
    {
      id: 'attitude-matte-lipstick-red',
      code: 'ATTD-LIP-RED',
      category: 'Beauty & Glam',
      name: 'Attitude™ Intense Matte Velvet Lipstick (Crimson Red)',
      spec: 'Lead-Free Longstay Color • Almond Oil Infused • 4.2g',
      price: 445,
      mrp: 499,
      badge: 'Lead-Free Pure',
      techBadge: 'Velvet Matte Stay',
      headline: 'Transfer-Resistant High-Fashion Red That Doesn’t Dry Out Lips',
      hype: 'Commercial lipsticks use cheap lead and petroleum waxes that turn lips dark and cracked over time. Attitude Lipsticks are formulated with pure sweet almond oil, Vitamin E, and clean minerals for an all-day comfortable featherlight matte.',
      clinicalPointers: [
        '100% Lead-free and dermatologically allergy tested',
        'Enriched with sweet almond oil and Vitamin E for deep hydration',
        'Lasts through canteen lunches and coffee runs without smudging',
        'Rich high-pigment payoff in a single smooth swipe'
      ],
      image: 'https://rukminim3.flixcart.com/image/480/480/xif0q/lipstick/v/y/g/6-attitude-matte-lipstick-set-of-6-shades-for-confident-looks-original-imahfzegueuzdhym.jpeg?q=80'
    },
    {
      id: 'attitude-matte-lipstick-nude',
      code: 'ATTD-LIP-NUD',
      category: 'Beauty & Glam',
      name: 'Attitude™ Intense Matte Velvet Lipstick (Caramel Nude / Plum)',
      spec: 'Subtle Everyday Class Tone • 4.2g',
      price: 445,
      mrp: 499,
      badge: 'Everyday Chic',
      techBadge: 'Almond Vitamin E',
      headline: 'The Perfect Classroom & Presentation Neutral Nude That Stays Put',
      hype: 'Flattering warm undertone designed specifically for Indian skin. Delivers a soft, understated velvety tint suitable for interviews, daily lectures, and semester presentations.',
      clinicalPointers: [
        '100% safe lead-free formulation: zero lip darkening',
        'Hydrating sweet almond oil prevents flaking or feathering',
        'Smooth glide with luxurious velvety demi-matte finish',
        'Smudge-resistant through long lecture hours'
      ],
      image: 'https://rukminim3.flixcart.com/image/480/480/xif0q/lipstick/v/y/g/6-attitude-matte-lipstick-set-of-6-shades-for-confident-looks-original-imahfzegueuzdhym.jpeg?q=80'
    },
    {
      id: 'attitude-kajal',
      code: 'ATTD-KAJ',
      category: 'Beauty & Glam',
      name: 'Attitude™ Smudgeproof Kohl Kajal & Eye Definer',
      spec: '24-Hour Carbon Black • Dermat Tested • 0.35g',
      price: 265,
      mrp: 299,
      badge: '24H Smudgeproof',
      techBadge: 'Almond Wax Matrix',
      headline: 'Deep Carbon Black That Won’t Run Or Give You Raccoon Eyes',
      hype: 'Engineered for long days in non-AC college classrooms. Glides on like silk with zero tugging, sets in 30 seconds into a waterproof matte jet-black line that stays put despite humidity and sweat.',
      clinicalPointers: [
        'Ophthalmologically tested and safe for contact lens wearers',
        'Infused with pure almond oil and natural waxes for smooth glide',
        'Intense, rich midnight black pigment in a retractable pencil',
        'Waterproof, sweatproof, and smudgeproof for 24 hours'
      ],
      image: 'https://rukminim3.flixcart.com/image/160/210/kz4gh3k0/kajal/8/c/o/12-professional-matte-finish-multi-use-pencil-kajal-eye-liner-original-imagb76teqxmubyf.jpeg?q=90'
    },
    {
      id: 'attitude-compact',
      code: 'ATTD-CPCT',
      category: 'Beauty & Glam',
      name: 'Attitude™ Perfect Matte Compact Powder SPF 15',
      spec: 'Oil-Free Sheer Velvet Mirror Case • 9g',
      price: 465,
      mrp: 520,
      badge: 'Oil Absorb',
      techBadge: 'Micro-Spherical Velvet',
      headline: 'Instant 10-Second Midday Mattifying Touch-Up For Classroom Glow',
      hype: 'Eliminates T-zone shininess and sweat sheen instantly without looking cakey or chalky. Comes with a built-in luxury mirror and velvet puff for fast touch-ups before college fests or presentations.',
      clinicalPointers: [
        'Oil-free micronized powder absorbs sebum without clogging pores',
        'Broad spectrum SPF 15 protects against midday classroom sun',
        'Blends seamlessly into natural Indian skin tones',
        'Lightweight mirror case fits right inside your sling bag'
      ],
      image: 'https://rukminim3.flixcart.com/image/480/480/xif0q/lipstick/v/y/g/6-attitude-matte-lipstick-set-of-6-shades-for-confident-looks-original-imahfzegueuzdhym.jpeg?q=80'
    },
    {
      id: 'attitude-eyeliner',
      code: 'ATTD-EYEL',
      category: 'Beauty & Glam',
      name: 'Attitude™ Waterproof Precision Liquid Eyeliner',
      spec: 'Deep Jet Black • Flexible Felt Tip • 5 ml',
      price: 310,
      mrp: 350,
      badge: 'Sharp Wing',
      techBadge: 'Film-Forming Polymer',
      headline: 'A Precision Winged Liner That Doesn’t Crack, Flake Or Bleed',
      hype: 'Equipped with a micro-fine flexible calligraphy tip that delivers effortless thin lines or bold winged drama. The water-resistant polymer film locks pigment in place all day long.',
      clinicalPointers: [
        'Fast-drying matte jet black formula',
        'Flexible applicator tip gives beginner-friendly precision',
        'Resistant to sweat, humidity, and oily eyelids',
        'Easily washes off with warm water or face cleanser'
      ],
      image: 'https://rukminim3.flixcart.com/image/160/210/kz4gh3k0/kajal/8/c/o/12-professional-matte-finish-multi-use-pencil-kajal-eye-liner-original-imagb76teqxmubyf.jpeg?q=90'
    },
    {
      id: 'artistry-mousse-cleanser',
      code: 'ART-MOUSSE',
      category: 'Beauty & Glam',
      name: 'Artistry Skin Nutrition™ Hydrating Mousse Cleanser',
      spec: 'Nutrilite™ White Chia • 145 ml Luxury Self-Foam',
      price: 1799,
      mrp: 1999,
      badge: 'Haute Luxury',
      techBadge: 'Micro-Biome Balance',
      headline: 'The Hollywood-Grade Cloud Cleanser Used By Top Beauty Influencers',
      hype: 'Amway’s flagship prestige skincare innovation. Pumps out an ultra-dense, self-foaming cloud infused with Nutrilite™ certified White Chia Seed. Gently lifts microscopic PM 2.5 pollutants while preserving your natural skin microbiome.',
      clinicalPointers: [
        'Self-foaming cloud mousse: zero friction on delicate skin',
        'Patented Nutrilite™ organic White Chia seed amino matrix',
        'Clean Vegan certified, cruelty-free, zero parabens or phthalates',
        'Leaves skin feeling baby-soft, deeply nourished and glowing'
      ],
      image: 'https://www.amway.com/medias/123793V-en-US-690px-01?context=bWFzdGVyfGltYWdlc3w0NjkyM3xpbWFnZS9wbmd8aW1hZ2VzL2hmZi9oMjUvOTM1NTI4NjgzOTMyNi5wbmd8NGM5YzFjZGI4OWE5N2JjNmJiZWJkMmU5ZGFiYzcxNzZiYWE3MTM2ZGZhMWIyMzU5NGEwMjA1YTdjZjEzY2Y4Yg'
    },
    {
      id: 'artistry-toner',
      code: 'ART-TONER',
      category: 'Beauty & Glam',
      name: 'Artistry Skin Nutrition™ Hydrating Smoothing Toner',
      spec: 'White Chia Pre-Biotic Barrier • 200 ml Bottle',
      price: 1650,
      mrp: 1850,
      badge: 'Pre-Biotic Pore',
      techBadge: 'Nutrilite Gel Matrix',
      headline: 'The Alcohol-Free Hydrating Toner That Shrinks Visible Pore Appearance',
      hype: 'A velvety toner fluid infused with Nutrilite™ White Chia Seed gel. Stabilizes the natural skin barrier, balances pH after tap water washing, and drenches skin cells with weightless hydration.',
      clinicalPointers: [
        '100% alcohol-free pre-biotic formula calms redness',
        'Nutrilite™ White Chia gel seals in moisture for 24 hours',
        'Prepares skin cells for superior absorption of creams and serums',
        'Clean beauty certified: Zero sulfates, mineral oils, or parabens'
      ],
      image: 'https://www.amway.com/medias/123793V-en-US-690px-01?context=bWFzdGVyfGltYWdlc3w0NjkyM3xpbWFnZS9wbmd8aW1hZ2VzL2hmZi9oMjUvOTM1NTI4NjgzOTMyNi5wbmd8NGM5YzFjZGI4OWE5N2JjNmJiZWJkMmU5ZGFiYzcxNzZiYWE3MTM2ZGZhMWIyMzU5NGEwMjA1YTdjZjEzY2Y4Yg'
    },
    {
      id: 'artistry-day-lotion',
      code: 'ART-LOTION',
      category: 'Beauty & Glam',
      name: 'Artistry Skin Nutrition™ Hydrating Day Lotion SPF 30',
      spec: 'Prestige 24H Cellular Shield • 50 ml Luxury Pump',
      price: 2250,
      mrp: 2499,
      badge: 'Prestige Tier',
      techBadge: 'Nutrilite Pomegranate',
      headline: 'The Ultimate High-Performance Skincare Investment For Flawless Skin',
      hype: 'A lightweight luxury fluid that delivers 24-hour weightless moisture with full SPF 30 defense. Infused with Nutrilite™ organic Pomegranate and White Chia seed to shield your face from UV, free radicals, and blue light.',
      clinicalPointers: [
        'Broad spectrum SPF 30 with Nutrilite organic farm botanicals',
        'Prevents premature aging, dark spots, and collagen breakdown',
        'Silky fluid texture that doubles as an ultra-smooth makeup primer',
        'Dermatologist & allergy tested clean luxury skincare formulation'
      ],
      image: 'https://www.amway.com/medias/123800-en-US-690px-01?context=bWFzdGVyfGltYWdlc3w0MzQ4N3xpbWFnZS9wbmd8aW1hZ2VzL2hkZS9oN2EvOTM1NTI3NzQ2NzY3OC5wbmd8ODk2MmMxODliMjM1YWExZTUzNDZjM2E4NDZiMjU0Njc2YmQxMmMxNzA2Y2MxNGFjOWVhODc2MmQ0MjQzMWM5Mg'
    },
    {
      id: 'artistry-gel-cream',
      code: 'ART-GELCRM',
      category: 'Beauty & Glam',
      name: 'Artistry Skin Nutrition™ Hydrating Gel Cream',
      spec: 'Electrolyte Micro-Surge Moisture • 50g Jar',
      price: 2100,
      mrp: 2350,
      badge: 'Water Quench',
      techBadge: 'Blue Agave Bio',
      headline: 'A Weightless Gel Cloud That Plumps Skin With 24-Hour Dewy Hydration',
      hype: 'Formulated with Nutrilite™ Acerola Cherry, White Chia Seed, and Blue Agave. Floods dehydrated skin with refreshing moisture while calming irritation caused by late nights and dry AC hostel rooms.',
      clinicalPointers: [
        'Instantly increases skin hydration levels by 146%',
        'Weightless water-gel texture: Zero greasy film or blocked pores',
        'Blue Agave stimulates natural hyaluronic acid synthesis',
        'Cruelty-free, Clean Vegan certified luxury skincare'
      ],
      image: 'https://www.amway.com/medias/123800-en-US-690px-01?context=bWFzdGVyfGltYWdlc3w0MzQ4N3xpbWFnZS9wbmd8aW1hZ2VzL2hkZS9oN2EvOTM1NTI3NzQ2NzY3OC5wbmd8ODk2MmMxODliMjM1YWExZTUzNDZjM2E4NDZiMjU0Njc2YmQxMmMxNzA2Y2MxNGFjOWVhODc2MmQ0MjQzMWM5Mg'
    },
    {
      id: 'artistry-renewing-cream',
      code: 'ART-RNWCRM',
      category: 'Beauty & Glam',
      name: 'Artistry Skin Nutrition™ Renewing Reactivation Cream',
      spec: 'Peptide & Rosemary Repair Matrix • 50g Prestige Jar',
      price: 3150,
      mrp: 3499,
      badge: 'Prestige Anti-Aging',
      techBadge: 'Repair Complex',
      headline: 'The Elite Collagen & Elasticity Restorative Night Cream',
      hype: 'Infused with Nutrilite™-grown Spinach, Turmeric, and Tea Olive flower. Reactivates youth factors by 600%, smoothing fine stress lines, firming skin texture, and restoring radiant elasticity.',
      clinicalPointers: [
        'Exclusive Repair Complex boosts skin’s natural defense system by 350%',
        'Reduces visible fatigue lines, roughness, and uneven texture',
        'Enriched with Nutrilite organic farm botanicals for cellular energy',
        'Rich, velvet-cocooning texture for evening restoration'
      ],
      image: 'https://www.amway.com/medias/123800-en-US-690px-01?context=bWFzdGVyfGltYWdlc3w0MzQ4N3xpbWFnZS9wbmd8aW1hZ2VzL2hkZS9oN2EvOTM1NTI3NzQ2NzY3OC5wbmd8ODk2MmMxODliMjM1YWExZTUzNDZjM2E4NDZiMjU0Njc2YmQxMmMxNzA2Y2MxNGFjOWVhODc2MmQ0MjQzMWM5Mg'
    }
  ]

  const categories = [
    'All', 
    'Oral Care', 
    'Body & Bath', 
    'Hair & Scalp', 
    "Men's Grooming",
    'Skincare (Attitude)', 
    'Beauty & Glam'
  ]

  // Filtered list
  const filteredProducts = useMemo(() => {
    return products.filter(item => {
      const matchCat = selectedCategory === 'All' || item.category === selectedCategory
      const matchQuery = !searchQuery.trim() || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.spec.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.hype.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      return matchCat && matchQuery
    })
  }, [products, selectedCategory, searchQuery])

  // Count items per category
  const categoryCounts = useMemo(() => {
    const counts = { All: products.length }
    products.forEach(p => {
      counts[p.category] = (counts[p.category] || 0) + 1
    })
    return counts
  }, [products])

  // --- Add to Cart Handler ---
  const handleAddToCart = (item) => {
    setErrorMsg('')
    if (!formData.student_name.trim() || !formData.roll_number.trim() || formData.whatsapp_number.length !== 10) {
      setErrorMsg('Please complete your Name, Roll Number, and 10-digit WhatsApp number above before adding items.')
      window.scrollTo({ top: 350, behavior: 'smooth' })
      return
    }

    const qty = quantities[item.id] || 1
    const cartItem = {
      id: `${item.id}-${Date.now()}`,
      title: `${item.name} (${item.code})`,
      category: 'premium_care',
      price: item.price,
      quantity: qty,
      total_price: item.price * qty,
      specifications: `${item.spec} • Category: ${item.category}`,
      user_details: {
        name: formData.student_name.trim(),
        roll_no: formData.roll_number.trim(),
        whatsapp: formData.whatsapp_number.trim()
      }
    }

    addToCart(cartItem)
    setSuccessMsg(`✓ Added ${qty}x "${item.name}" to your order cart!`)
    setTimeout(() => setSuccessMsg(''), 4000)
  }

  // --- WhatsApp Direct Order Link Generator ---
  const getWhatsAppLink = (item) => {
    const qty = quantities[item.id] || 1
    const total = item.price * qty
    const nameStr = formData.student_name ? `Name: ${formData.student_name}` : 'Name: [Your Name]'
    const rollStr = formData.roll_number ? `Roll No: ${formData.roll_number}` : 'Roll No: [Your Roll]'
    const text = `Hi Anant! I want to order the following from the Print Studio Premium Range:
Product: ${item.name} (${item.code})
Quantity: ${qty}
Total Price: ₹${total}
${nameStr}
${rollStr}
Please confirm availability and campus dispatch details.`
    return `https://wa.me/${ANANT_WHATSAPP}?text=${encodeURIComponent(text)}`
  }

  return (
    <div className="min-h-screen bg-[#1a1917] text-[#dfd9cb] selection:bg-[#c25134] selection:text-white">
      {/* Top Breadcrumb & Navbar */}
      <header className="border-b border-[#2d2b27] bg-[#1a1917]/90 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#a8a29e] hover:text-[#c25134] transition-colors uppercase"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Studio Catalog</span>
          </Link>
          <div className="flex items-center gap-3 text-xs font-mono text-[#a8a29e]">
            <span className="hidden sm:inline">AUTHENTIC AMWAY INDIA CARE</span>
            <span className="px-2 py-0.5 rounded bg-[#c25134]/20 text-[#c25134] border border-[#c25134]/30 font-semibold">
              55 PREMIUM SKUS
            </span>
          </div>
        </div>
      </header>

      {/* Atmospheric Hero Section */}
      <section className="relative overflow-hidden border-b border-[#2d2b27] bg-gradient-to-b from-[#1a1917] via-[#22201c] to-[#1a1917] py-16 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(#c25134_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#c25134]/40 bg-[#c25134]/10 text-[#c25134] text-xs font-mono uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Apothecary Vault • Campus Concierge</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif font-normal text-[#dfd9cb] tracking-tight leading-tight">
            Personal Care & Beauty <br />
            <span className="italic font-light text-[#c25134]">Built on Bio-Formulas, Not Fillers</span>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-[#a8a29e] max-w-3xl mx-auto leading-relaxed font-sans">
            Commercial drugstore products dilute their formulas with 85% water, cheap calcium chalk, and harsh stripping sulfates. 
            Amway’s patented formulations (<span className="text-[#dfd9cb] font-medium">Sylodent™</span>, <span className="text-[#dfd9cb] font-medium">Reminact™</span>, <span className="text-[#dfd9cb] font-medium">Enerjuve™</span>, and <span className="text-[#dfd9cb] font-medium">Lumiskin™</span>) 
            are clinical bio-concentrates designed to outlast, repair enamel, and protect hair against harsh hostel borewell water.
          </p>

          {/* Three Scientific Pillars */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            <div className="p-4 rounded border border-[#2d2b27] bg-[#1e1c19]/60 backdrop-blur">
              <span className="text-xs font-mono text-[#c25134] block mb-1">01 / CONCENTRATION</span>
              <h4 className="text-sm font-semibold text-[#dfd9cb] mb-1">3x Active Bio-Yield</h4>
              <p className="text-xs text-[#8c857b] leading-relaxed">
                Zero cheap chalk or water dilution. A pea-sized drop delivers more active cleaning than half a tube of supermarket pastes.
              </p>
            </div>
            <div className="p-4 rounded border border-[#2d2b27] bg-[#1e1c19]/60 backdrop-blur">
              <span className="text-xs font-mono text-[#c25134] block mb-1">02 / CAMPUS ARMOR</span>
              <h4 className="text-sm font-semibold text-[#dfd9cb] mb-1">Hard Water Defense</h4>
              <p className="text-xs text-[#8c857b] leading-relaxed">
                High-TDS borewell hostel water strips keratin and leaves skin ashy. Our Grade-1 TFM & Enerjuve™ lipids neutralize hard water damage.
              </p>
            </div>
            <div className="p-4 rounded border border-[#2d2b27] bg-[#1e1c19]/60 backdrop-blur">
              <span className="text-xs font-mono text-[#c25134] block mb-1">03 / VERIFIED SOURCING</span>
              <h4 className="text-sm font-semibold text-[#dfd9cb] mb-1">Batch Traceable & Pure</h4>
              <p className="text-xs text-[#8c857b] leading-relaxed">
                Direct batch authentication from Amway India’s clean manufacturing facilities. 100% genuine guaranteed via campus concierge.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog Viewport */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Student Identity Form */}
        <section className="mb-10 rounded-lg border border-[#2d2b27] bg-[#1e1c19] p-6 shadow-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-4 border-b border-[#2d2b27] gap-3">
            <div>
              <span className="text-xs font-mono text-[#c25134] uppercase tracking-wider block">Student Verification</span>
              <h3 className="text-base font-serif font-medium text-[#dfd9cb]">Enter Your Campus Dispatch Identity</h3>
            </div>
            <span className="text-xs font-mono text-[#8c857b] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Ensures zero mix-up during campus hostel delivery
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#a8a29e] mb-1.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#c25134]" />
                Full Name *
              </label>
              <input
                type="text"
                name="student_name"
                value={formData.student_name}
                onChange={handleChange}
                placeholder="e.g. Rahul Sharma"
                className="w-full bg-[#141312] border border-[#2d2b27] rounded px-3 py-2 text-sm text-[#dfd9cb] placeholder-[#5c574e] focus:outline-none focus:border-[#c25134] font-sans"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#a8a29e] mb-1.5 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#c25134]" />
                University / Roll No *
              </label>
              <input
                type="text"
                name="roll_number"
                value={formData.roll_number}
                onChange={handleChange}
                placeholder="e.g. 2100320100099"
                className="w-full bg-[#141312] border border-[#2d2b27] rounded px-3 py-2 text-sm text-[#dfd9cb] placeholder-[#5c574e] focus:outline-none focus:border-[#c25134] font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#a8a29e] mb-1.5 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#c25134]" />
                WhatsApp Number *
              </label>
              <div className="flex items-center">
                <span className="bg-[#24221e] border border-r-0 border-[#2d2b27] rounded-l px-3 py-2 text-sm font-mono text-[#8c857b]">
                  +91
                </span>
                <input
                  type="text"
                  name="whatsapp_number"
                  value={formData.whatsapp_number}
                  onChange={handleChange}
                  placeholder="9876543210"
                  maxLength={10}
                  className="w-full bg-[#141312] border border-[#2d2b27] rounded-r px-3 py-2 text-sm text-[#dfd9cb] placeholder-[#5c574e] focus:outline-none focus:border-[#c25134] font-mono"
                />
              </div>
            </div>
          </div>

          {errorMsg && (
            <div className="mt-4 p-3 bg-red-950/40 border border-red-800/60 rounded text-red-300 text-xs font-mono">
              ⚠️ {errorMsg}
            </div>
          )}
          {successMsg && (
            <div className="mt-4 p-3 bg-emerald-950/40 border border-emerald-800/60 rounded text-emerald-300 text-xs font-mono flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              {successMsg}
            </div>
          )}
        </section>

        {/* Filter Tabs & Search Bar */}
        <section className="mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-thin">
            {categories.map(cat => {
              const isSelected = selectedCategory === cat
              const count = categoryCounts[cat] || 0
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all whitespace-nowrap flex items-center gap-1.5 ${
                    isSelected 
                      ? 'bg-[#c25134] text-white shadow-lg shadow-[#c25134]/20 font-medium' 
                      : 'bg-[#1e1c19] text-[#a8a29e] hover:text-[#dfd9cb] border border-[#2d2b27]'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-black/30 text-white' : 'bg-[#2a2723] text-[#8c857b]'}`}>
                    {count}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#8c857b] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 55 products, SKUs, formulas..."
              className="w-full bg-[#1e1c19] border border-[#2d2b27] rounded-full pl-9 pr-4 py-1.5 text-xs text-[#dfd9cb] placeholder-[#5c574e] focus:outline-none focus:border-[#c25134] font-mono"
            />
          </div>
        </section>

        {/* Catalog Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-[#2d2b27] rounded-lg">
            <p className="text-sm font-mono text-[#8c857b]">No products matched your search or category filter.</p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="mt-3 px-4 py-1.5 bg-[#2d2b27] hover:bg-[#383530] text-xs font-mono text-[#dfd9cb] rounded"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(item => {
              const qty = quantities[item.id] || 1
              const total = item.price * qty

              return (
                <div 
                  key={item.id}
                  className="rounded-lg border border-[#2d2b27] bg-[#dfd9cb] text-[#1a1917] flex flex-col justify-between overflow-hidden shadow-2xl transition-all duration-200 hover:-translate-y-1 hover:border-[#c25134]"
                >
                  {/* Top Image Showcase */}
                  <div className="relative bg-[#ebe6d8] p-6 flex items-center justify-center border-b border-[#cbc4b1] min-h-[260px] overflow-hidden group">
                    <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                      <span className="px-2 py-0.5 rounded bg-[#1a1917] text-[#dfd9cb] font-mono text-[10px] uppercase tracking-wider font-semibold">
                        {item.badge}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-[#c25134] text-white font-mono text-[10px] uppercase tracking-wider font-semibold">
                        {item.techBadge}
                      </span>
                    </div>

                    <span className="absolute top-3 right-3 text-[11px] font-mono text-[#78716c] bg-[#dfd9cb]/80 px-2 py-0.5 rounded border border-[#cbc4b1]">
                      {item.code}
                    </span>

                    <img 
                      src={item.image} 
                      alt={item.name}
                      onError={(e) => {
                        e.target.onerror = null
                        e.target.src = DEFAULT_FALLBACK_IMAGE
                      }}
                      className="max-h-48 max-w-full object-contain drop-shadow-xl transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  {/* Body Content & Pro-Seller Pitch */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Category & Spec */}
                      <div className="flex items-center justify-between text-[11px] font-mono text-[#78716c] uppercase mb-1">
                        <span>{item.category}</span>
                        <span>{item.spec}</span>
                      </div>

                      {/* Product Name */}
                      <h3 className="text-lg font-serif font-bold text-[#1a1917] leading-snug">
                        {item.name}
                      </h3>

                      {/* Pro-Seller Hook Headline */}
                      <p className="mt-1 text-xs font-semibold text-[#c25134] italic font-serif">
                        "{item.headline}"
                      </p>

                      {/* Formulation Truth vs Drugstore copy */}
                      <p className="mt-2 text-xs text-[#44403c] leading-relaxed font-sans">
                        {item.hype}
                      </p>

                      {/* Clinical Proof Bullet Points */}
                      <div className="mt-4 pt-3 border-t border-[#cbc4b1]/60 space-y-1.5">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#78716c] block">
                          Formulation Standards:
                        </span>
                        {item.clinicalPointers.map((ptr, idx) => (
                          <div key={idx} className="flex items-start gap-1.5 text-xs text-[#292524]">
                            <Check className="w-3.5 h-3.5 text-[#c25134] shrink-0 mt-0.5" />
                            <span className="leading-tight">{ptr}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Price & Order Action Area */}
                    <div className="mt-6 pt-4 border-t border-[#cbc4b1]">
                      {/* Pricing Bar */}
                      <div className="flex items-baseline justify-between mb-4">
                        <div>
                          <span className="text-xs text-[#78716c] line-through font-mono mr-2">
                            MRP ₹{item.mrp}
                          </span>
                          <span className="text-2xl font-serif font-bold text-[#1a1917]">
                            ₹{item.price}
                          </span>
                          <span className="text-[10px] font-mono text-[#78716c] ml-1">/ unit</span>
                        </div>
                        <span className="text-[11px] font-mono text-emerald-800 font-semibold bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                          Save ₹{item.mrp - item.price}
                        </span>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center justify-between bg-[#dfd9cb] border border-[#cbc4b1] rounded p-1 mb-3">
                        <span className="text-xs font-mono text-[#57534e] pl-2 uppercase">Quantity</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleQtyChange(item.id, -1)}
                            className="w-7 h-7 flex items-center justify-center rounded bg-[#ebe6d8] hover:bg-[#ded8c7] text-[#1a1917] transition-colors"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-6 text-center text-xs font-mono font-bold text-[#1a1917]">
                            {qty}
                          </span>
                          <button
                            onClick={() => handleQtyChange(item.id, 1)}
                            className="w-7 h-7 flex items-center justify-center rounded bg-[#ebe6d8] hover:bg-[#ded8c7] text-[#1a1917] transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Action Buttons: Add To Cart + Direct WhatsApp */}
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => handleAddToCart(item)}
                          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded bg-[#1a1917] hover:bg-[#2d2b27] text-[#dfd9cb] text-xs font-mono uppercase tracking-wider font-semibold transition-colors"
                        >
                          <ShoppingCart className="w-3.5 h-3.5 text-[#c25134]" />
                          <span>Add to Cart</span>
                        </button>

                        <a
                          href={getWhatsAppLink(item)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded bg-[#c25134] hover:bg-[#a8442a] text-white text-xs font-mono uppercase tracking-wider font-semibold transition-colors"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Custom Sourcing Concierge Banner */}
        <section className="mt-16 rounded-lg border border-[#2d2b27] bg-gradient-to-r from-[#22201c] via-[#1e1c19] to-[#22201c] p-8 text-center relative overflow-hidden">
          <div className="max-w-3xl mx-auto">
            <span className="text-xs font-mono text-[#c25134] uppercase tracking-wider block mb-2">
              Looking for Unlisted Amway SKUs?
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif text-[#dfd9cb]">
              Direct Campus Concierge Sourcing Available
            </h3>
            <p className="mt-3 text-sm text-[#8c857b] leading-relaxed">
              Need items from <span className="text-[#dfd9cb] font-medium">Nutrilite™</span> (Daily, All Plant Protein, Omega-3, Vitamin C Cherry Plus), 
              the prestige <span className="text-[#dfd9cb] font-medium">Artistry™ Luxury Collection</span>, or <span className="text-[#dfd9cb] font-medium">SA8 Home Care</span>? 
              Message Anant directly with your desired product name or SKU for direct factory batch allocation.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <a
                href={`https://wa.me/${ANANT_WHATSAPP}?text=${encodeURIComponent("Hi Anant! I want to inquire about custom Amway sourcing for an unlisted product (Nutrilite / Artistry / Other). Please share current catalog pricing.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded bg-[#c25134] hover:bg-[#a8442a] text-white text-xs font-mono uppercase tracking-wider font-semibold transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Request Custom SKU on WhatsApp</span>
              </a>
              <span className="text-xs font-mono text-[#5c574e]">
                Direct Contact: +91 79823 50793 (Anant Thakkur)
              </span>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#2d2b27] py-8 text-center text-xs font-mono text-[#5c574e]">
        <p>PRINT STUDIO • THE CONCIERGE APOTHECARY COLLECTION • 55 VERIFIED SKUS</p>
      </footer>
    </div>
  )
}
