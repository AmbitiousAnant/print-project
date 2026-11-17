import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { 
  User, FileText, Phone, ShoppingCart, ArrowLeft, CheckCircle2, 
  Sparkles, MessageCircle, Search, ShieldCheck, Check, Plus, Minus,
  Award, Droplets, Heart, Eye, ArrowUpRight
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

  // --- Complete Amway Personal Care, Attitude Skincare & Beauty Catalog ---
  const products = [
    // =========================================================================
    // 1. ORAL CARE (GLISTER)
    // =========================================================================
    {
      id: 'glister-classic',
      code: 'GLIS-200',
      category: 'Oral Care',
      name: 'Glister™ Multi-Action Fluoride Toothpaste',
      spec: 'Net Wt. 200g • Lasts 90+ Days',
      price: 320,
      mrp: 360,
      badge: 'Gold Standard',
      techBadge: 'Sylodent™ Silica',
      headline: 'The Enamel Armor That Outlasts 3 Commercial Pastes',
      hype: 'Commercial pastes use abrasive chalk (calcium carbonate) that strips your enamel microscopic layer by layer. Glister uses spherical Sylodent™ silica micro-beads that safely buff tea, coffee, and nicotine stains while Reminact™ redeposits essential minerals into teeth.',
      clinicalPointers: [
        'Non-abrasive Sylodent™ micro-polishing beads',
        'Reminact™ patented enamel re-mineralization',
        'Zero sugary chalk fillers — concentrated pea-sized usage',
        'Certified 12-hour breath ionization'
      ],
      image: 'https://www.amway.com/medias/124106-en-US-690px-01?context=bWFzdGVyfGltYWdlc3w0MTQ3OXxpbWFnZS9wbmd8c3lzLW1hc3Rlci9pbWFnZXMvaGFlL2hjMC85NTE4MTY3MDMxODM4LzEyNDEwNi1lbi1VUy02OTBweC0wMXwzZjk1MTcxYjIxMTcyMDdmYTY4NTJkNjE0MmU4NzRmYzU5ZTk4MTQ1NTBjOWE3NmVjOTZlZGExNWM3YzcwNWZm'
    },
    {
      id: 'glister-herbals',
      code: 'GLIS-HRB',
      category: 'Oral Care',
      name: 'Glister™ Multi-Action Herbals Toothpaste',
      spec: '11 Certified Botanicals • 190g',
      price: 335,
      mrp: 375,
      badge: 'Herbal Bio-Matrix',
      techBadge: 'Nutrilite Certified',
      headline: 'Clinically Proven Gum Defense for Irritated Hostel Stressed Teeth',
      hype: 'Engineered with 11 certified herbal actives including Clove bud oil, Peppermint, Spearmint, and Ginger root. Calms inflamed gums, bleeding from hard mess food, and neutralizes acidic saliva without toxic chemical triclosan.',
      clinicalPointers: [
        '11 Active botanicals with pure Clove & Tea Tree',
        'Zero triclosan, zero sodium saccharin, zero parabens',
        'Soothes bleeding gums within 72 hours of use',
        'Refreshing non-medicinal natural clove-mint burst'
      ],
      image: 'https://rukminim3.flixcart.com/image/480/480/xif0q/toothpaste/d/j/o/-original-imah4hzyqhhz8u9h.jpeg?q=90'
    },
    {
      id: 'glister-spray',
      code: 'GLIS-SPY',
      category: 'Oral Care',
      name: 'Glister™ Mint Refresher Mouth Spray',
      spec: 'Pocket Pocket Aerosol • 250+ Sprays',
      price: 240,
      mrp: 270,
      badge: 'Executive EDC',
      techBadge: 'Sugar-Free Ionizer',
      headline: 'Instant Interview & Date Ready Breath In 2 Seconds',
      hype: 'Forget chewing sugary gums that rot your teeth during campus presentations. One measured micro-mist delivers pure Nutrilite-farmed spearmint that kills 99.9% of oral anaerobic odor bacteria instantly.',
      clinicalPointers: [
        '250+ metered micro-doses in a sleek matte atomizer',
        'Zero sugar, zero sticky residue, zero calories',
        'Neutralizes canteen garlic, spicy food & tobacco odor',
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
      price: 290,
      mrp: 330,
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

    // =========================================================================
    // 2. SKINCARE (ATTITUDE HERBALS)
    // =========================================================================
    {
      id: 'attitude-be-bright-wash',
      code: 'ATTD-WASH',
      category: 'Skincare (Attitude)',
      name: 'Attitude™ Be Bright Herbal Face Wash',
      spec: 'Papaya & Lemon Bio-Enzymes • 100ml',
      price: 340,
      mrp: 390,
      badge: 'Bestseller',
      techBadge: 'Fruit Enzyme Complex',
      headline: 'Melts Away Bike Dust & Campus Grease Without Stripping Your Skin Barrier',
      hype: 'Formulated with organic Papaya enzymes and Lemon extract. Dissolves micro-pollutants and stubborn midday sebum without harsh drying surfactants that trigger rebound oiliness 30 minutes later.',
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
      price: 390,
      mrp: 440,
      badge: 'Detox Formula',
      techBadge: 'Micro-Exfoliant',
      headline: 'Instant Campus D-Tan That Unclogs Blackheads In 2 Minutes',
      hype: 'Gently dislodges stubborn blackheads and baked-in sun tan from daily college walking. Spherical micro-beads of walnut shell polish rough skin texture without micro-tearing your delicate facial skin.',
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
      spec: 'Matte Blue-Light & UV Shield • 50g',
      price: 420,
      mrp: 480,
      badge: 'Screen Guard',
      techBadge: 'Blue-Light Defense',
      headline: 'The Only Day Cream Built For Late-Night Laptop Coders & Sunny Campus Walks',
      hype: 'Engineered for students spending 10+ hours staring at screens. Combines broad-spectrum SPF 15 with HEV blue-light shielding antioxidants and Indian Gooseberry to prevent digital dullness and pigmentation.',
      clinicalPointers: [
        'Shields against laptop/monitor high-energy blue-light rays',
        'Ultra-lightweight matte gel: Zero sweaty sheen in classroom heat',
        'Indian Gooseberry bio-actives even out patchy dark marks',
        'Non-comedogenic: Guaranteed zero clogged pores or whiteheads'
      ],
      image: 'https://rukminim3.flixcart.com/image/480/480/xif0q/fairness/q/r/d/50-attitude-be-bright-herbals-day-cream-cream-amway-original-imahg9zrhbhrbftx.jpeg?q=90'
    },
    {
      id: 'attitude-night-cream',
      code: 'ATTD-NGHT',
      category: 'Skincare (Attitude)',
      name: 'Attitude™ Be Bright Herbal Deep Night Cream',
      spec: 'Nocturnal Cellular Repair Matrix • 50g',
      price: 450,
      mrp: 520,
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
      price: 460,
      mrp: 530,
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
      spec: 'Salicylic Acid & Green Tea Active • 100ml',
      price: 360,
      mrp: 410,
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

    // =========================================================================
    // 3. BEAUTY & GLAM (ATTITUDE & ARTISTRY)
    // =========================================================================
    {
      id: 'attitude-matte-lipstick',
      code: 'ATTD-LIP',
      category: 'Beauty & Glam',
      name: 'Attitude™ Intense Matte Velvet Lipstick',
      spec: 'Lead-Free Longstay Color • Almond Oil Infused',
      price: 390,
      mrp: 450,
      badge: 'Lead-Free Pure',
      techBadge: 'Velvet Matte Stay',
      headline: 'Transfer-Resistant High-Fashion Shades That Don’t Dry Out Lips',
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
      id: 'attitude-kajal',
      code: 'ATTD-KAJ',
      category: 'Beauty & Glam',
      name: 'Attitude™ Smudgeproof Kohl Kajal & Eye Definer',
      spec: '24-Hour Carbon Black • Dermat Tested',
      price: 240,
      mrp: 280,
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
      price: 380,
      mrp: 440,
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
      image: 'https://rukminim3.flixcart.com/image/480/480/xif0q/compact/y/h/p/9-perfect-matte-compact-powder-spf-15-attitude-original-imahgbgecwjhfgkr.jpeg?q=90'
    },
    {
      id: 'artistry-mousse-cleanser',
      code: 'ART-MOUSSE',
      category: 'Beauty & Glam',
      name: 'Artistry Skin Nutrition™ Hydrating Mousse Cleanser',
      spec: 'Patented Nutrilite™ White Chia • 145ml Luxury',
      price: 950,
      mrp: 1100,
      badge: 'Haute Luxury',
      techBadge: 'Micro-Biome Balance',
      headline: 'The Hollywood-Grade Cloud Cleanser Used By Top Beauty Influencers',
      hype: 'This is Amway’s flagship prestige skincare innovation. Pumps out an ultra-dense, self-foaming cloud infused with Nutrilite™ certified White Chia Seed. Gently lifts microscopic PM 2.5 pollutants while preserving your natural skin microbiome.',
      clinicalPointers: [
        'Self-foaming cloud mousse: zero friction on delicate skin',
        'Patented Nutrilite™ organic White Chia seed amino matrix',
        'Clean Vegan certified, cruelty-free, zero parabens or phthalates',
        'Leaves skin feeling baby-soft, deeply nourished and glowing'
      ],
      image: 'https://www.amway.com/medias/123793V-en-US-690px-01?context=bWFzdGVyfGltYWdlc3w0NjkyM3xpbWFnZS9wbmd8aW1hZ2VzL2hmZi9oMjUvOTM1NTI4NjgzOTMyNi5wbmd8NGM5YzFjZGI4OWE5N2JjNmJiZWJkMmU5ZGFiYzcxNzZiYWE3MTM2ZGZhMWIyMzU5NGEwMjA1YTdjZjEzY2Y4Yg'
    },
    {
      id: 'artistry-day-lotion',
      code: 'ART-LOTION',
      category: 'Beauty & Glam',
      name: 'Artistry Skin Nutrition™ Hydrating Day Lotion SPF 30',
      spec: 'Prestige 24H Cellular Shield • 50ml Luxury Pump',
      price: 1450,
      mrp: 1650,
      badge: 'Prestige Tier',
      techBadge: 'Nutrilite Pomegranate',
      headline: 'The Ultimate High-Performance Skincare Investment For Flawless Skin',
      hype: 'A lightweight luxury fluid that delivers 24-hour weightless moisture with full SPF 30 defense. Infused with Nutrilite™ organic Pomegranate and White Chia seed to shield your face from UV, environmental free radicals, and digital blue light.',
      clinicalPointers: [
        'Broad spectrum SPF 30 with Nutrilite organic farm botanicals',
        'Prevents premature aging, dark spots, and collagen breakdown',
        'Silky fluid texture that doubles as an ultra-smooth makeup primer',
        'Dermatologist & allergy tested clean luxury skincare formulation'
      ],
      image: 'https://www.amway.com/medias/123800-en-US-690px-01?context=bWFzdGVyfGltYWdlc3w0MzQ4N3xpbWFnZS9wbmd8aW1hZ2VzL2hkZS9oN2EvOTM1NTI3NzQ2NzY3OC5wbmd8ODk2MmMxODliMjM1YWExZTUzNDZjM2E4NDZiMjU0Njc2YmQxMmMxNzA2Y2MxNGFjOWVhODc2MmQ0MjQzMWM5Mg'
    },

    // =========================================================================
    // 4. HAIR & SCALP (SATINIQUE & PERSONA)
    // =========================================================================
    {
      id: 'satinique-2in1',
      code: 'SATN-2IN1',
      category: 'Hair & Scalp',
      name: 'Satinique™ 2-in-1 Shampoo & Conditioner',
      spec: 'Patented Enerjuve™ Complex • 250ml',
      price: 450,
      mrp: 510,
      badge: 'Salon Engineering',
      techBadge: 'Enerjuve™ Molecule',
      headline: 'Restores Lustre In 60 Seconds For Guys Who Hate Multiple Bottles',
      hype: 'Patented Enerjuve™ is a US-patented positively-charged lipid complex that automatically seeks out negatively-charged damaged hair cuticles caused by sun, dust, and hard borewell water, repairing hair from the core outward.',
      clinicalPointers: [
        'Enerjuve™ patented lipid-creatine-18-MEA restorative complex',
        'Borage seed oil & Vitamin E restore dull dry strands',
        'One-step wash and detangle — cut your shower time in half',
        'Maintains clean volume without flattening hair roots'
      ],
      image: 'https://www.amway.com/medias/126455-en-US-690px-01?context=bWFzdGVyfGltYWdlc3wxMDAyMjR8aW1hZ2UvcG5nfHN5cy1tYXN0ZXIvaW1hZ2VzL2hkNS9oYzgvOTk3NDI0MzU5MDE3NC8xMjY0NTUtZW4tVVMtNjkwcHgtMDF8N2ZlZmQ2N2ZlMmVkNDA2YWYyOWU1YTdiZDNlZTYxODRmNmFmMDk5MmQ0ZjM5MGI4MjZkYzliZTk3Y2U0NmVlNA'
    },
    {
      id: 'satinique-antihairfall',
      code: 'SATN-FALL',
      category: 'Hair & Scalp',
      name: 'Satinique™ Scalp Anti-Hairfall Shampoo',
      spec: 'Eclipta Alba & Ginseng Active • 250ml',
      price: 480,
      mrp: 540,
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
      id: 'persona-coconut-oil',
      code: 'PERS-OIL',
      category: 'Hair & Scalp',
      name: 'Persona™ 100% Pure Virgin Coconut Oil',
      spec: 'Cold Pressed Edible Grade • 500ml Jumbo',
      price: 245,
      mrp: 290,
      badge: '100% Unadulterated',
      techBadge: 'Cold-Pressed Purity',
      headline: 'Zero Liquid Paraffin. Zero Chemicals. 100% Kerala Coconuts.',
      hype: 'Check your current hair oil label: 90% of commercial "coconut oils" are actually Light Liquid Paraffin (mineral petroleum oil). Persona is 100% pure cold-pressed edible grade coconut oil that penetrates deeply into the hair cortex.',
      clinicalPointers: [
        '100% pure edible grade coconut oil — zero petroleum filler',
        'Rich in medium-chain fatty acids (Lauric Acid)',
        'Deep pre-shampoo hot-oil treatment for damaged rough hair',
        'Also doubles as an organic face & beard skin moisturizer'
      ],
      image: 'https://rukminim3.flixcart.com/image/480/480/xif0q/hair-oil/q/b/y/500-persona-pure-coconut-oil-for-hair-skin-care-natural-original-imahzavpkmfaqpbb.jpeg?q=90'
    },

    // =========================================================================
    // 5. BODY & BATH (PERSONA & G&H)
    // =========================================================================
    {
      id: 'persona-coconut-soap',
      code: 'PERS-SOAP',
      category: 'Body & Bath',
      name: 'Persona™ Pure Coconut Moisturizing Soap',
      spec: 'Pack of 3 Luxury Bars (75g each)',
      price: 195,
      mrp: 230,
      badge: 'Grade-1 TFM 76%',
      techBadge: 'Triple-Milled Coconut',
      headline: 'The Only Soap That Won’t Turn Ashy In Hostel Hard Water',
      hype: 'Commercial soap bars are Grade-3 filler chalk with less than 60% TFM that dry your skin into white cracks. Persona is Grade-1 (76%+ Total Fatty Matter) made from 100% pure cold-pressed coconut oil, sweet almond oil, and pure Vitamin E.',
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
      price: 210,
      mrp: 245,
      badge: 'Clinical Hygiene',
      techBadge: 'Aloe + Tea Tree',
      headline: '99.9% Gym & Monsoon Bacteria Elimination Without Chemical Burn',
      hype: 'Most antibacterial soaps use harsh chemicals like triclocarban that destroy your skin’s natural microbiome. Persona uses medical-grade tea tree oil and aloe vera to eliminate ringworm, sweat odor, and fungal gym rashes gently.',
      clinicalPointers: [
        'Eliminates 99.9% of campus athletic & sweat microbes',
        'Triclocarban-free natural antiseptic shield',
        'Aloe vera infusion protects skin barrier from cracking',
        'Recommended for hostelers who play sports or hit the gym'
      ],
      image: 'https://rukminim3.flixcart.com/image/480/480/xif0q/soap/j/e/a/4-200-persona-creme-moisturizing-soap-pack-of-4-amway-original-imahf7gnxphphnye.jpeg?q=80'
    },
    {
      id: 'gnh-body-wash',
      code: 'GNH-WASH',
      category: 'Body & Bath',
      name: 'g&h™ Nourish Botanical Clean Body Wash',
      spec: 'Sulfate-Free Concentrate • 250ml',
      price: 460,
      mrp: 520,
      badge: 'Vegan Certified',
      techBadge: 'White Chia + Bamboo',
      headline: 'A Coin-Sized Drop That Leaves Skin Feeling Like A 5-Star Spa',
      hype: 'Formulated with Nutrilite™ white chia seed extract, olive oil-derived ceramides, and bamboo water. 100% biodegradable and sulfate-free. Leaves zero chemical film or stickiness on your skin.',
      clinicalPointers: [
        'Concentrated formula: 1 bottle lasts up to 75 full showers',
        '100% Vegan Society certified with clean plant ceramides',
        'Patented anti-irritation complex protects sensitive skin',
        'Cruelty-free, sulfate-free, and dermatologically tested'
      ],
      image: 'https://www.amway.com/medias/125914-en-US-690px-01?context=bWFzdGVyfGltYWdlc3wxNTQ3OTh8aW1hZ2UvcG5nfHN5cy1tYXN0ZXIvaW1hZ2VzL2gxNC9oY2IvOTU3Mzc3MzA0OTg4Ni8xMjU5MTQtZW4tVVMtNjkwcHgtMDF8YWZiMGFiNTEwYTQ1ODk2OTYxNDFjZjcxNmQ2YzdkYTEzN2I4MTYxNGYyMTU0ZmYzMmFmYjQ1NzliOWM2ODBmMA'
    },
    {
      id: 'gnh-body-lotion',
      code: 'GNH-LOTN',
      category: 'Body & Bath',
      name: 'g&h™ Nourish 24-Hour Botanical Body Lotion',
      spec: 'Bamboo Complex & Shea Butter • 250ml',
      price: 495,
      mrp: 560,
      badge: 'Barrier Repair',
      techBadge: 'Micro-Lipid Shield',
      headline: 'Zero-Grease 24-Hour Skin Moisture That Absorbs In 10 Seconds',
      hype: 'Infused with orange blossom honey, west African shea butter, and pumpkin seed oil. Unlike sticky paraffin drugstore lotions, this absorbs instantaneously without staining your college shirts or feeling clammy in class.',
      clinicalPointers: [
        'Proven 24-hour hydration barrier in clinical moisture tests',
        'Instant matte-absorption — zero oiliness under clothing',
        'Soothes winter scaling, chapped elbows & peeling skin',
        'Hypoallergenic formulation safe for eczema-prone skin'
      ],
      image: 'https://www.amway.com/medias/125891-en-US-690px-01?context=bWFzdGVyfGltYWdlc3w3ODAwOXxpbWFnZS9wbmd8c3lzLW1hc3Rlci9pbWFnZXMvaDA1L2hlMi85NTY2MTA4NzEyOTkwLzEyNTg5MS1lbi1VUy02OTBweC0wMXwzMTJlOGMyMDc0MTMwZmRkMjUyYzQzY2UzZjZiOWZkOGZkZDNiMjM4MDllZjJlYmZjNTJkOGZhZTNlZWQ5MDdh'
    },
    {
      id: 'persona-talc',
      code: 'PERS-TLC',
      category: 'Body & Bath',
      name: 'Persona™ Deodorizing Cedarwood Talc',
      spec: 'Anti-Sweat Micro-Fine • 350g Mega Pack',
      price: 220,
      mrp: 260,
      badge: 'Campus Summer Shield',
      techBadge: 'Micro-Fine Particle',
      headline: 'Stops Shirt Sweat Stains & Friction Chafing In Non-AC Classrooms',
      hype: 'Micro-pulverized talc particles create an invisible friction barrier on your neck, chest, and inner thighs. Features an active cooling deodorant matrix that activates whenever body temperature rises.',
      clinicalPointers: [
        'Absorbs 4x its weight in humidity and excess sweat',
        'Subtle, masculine cedarwood aroma that lasts all day',
        'Prevents collar staining and chafing during long lab hours',
        'Dermatologically tested against heat rashes and prickly heat'
      ],
      image: 'https://rukminim3.flixcart.com/image/480/480/xif0q/talc/q/n/s/350-persona-talc-amway-original-imahy3d8jngf8yhe.jpeg?q=90'
    },

    // =========================================================================
    // 6. MEN'S GROOMING (DYNAMITE)
    // =========================================================================
    {
      id: 'dynamite-facewash',
      code: 'DYNA-WASH',
      category: "Men's Grooming",
      name: 'Dynamite™ Foaming Face Wash For Men',
      spec: 'Activated Charcoal & Vitamin B3 • 150ml Mega',
      price: 310,
      mrp: 360,
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
      name: 'Dynamite™ Ultra-Glide Shaving Foam',
      spec: 'Aloe Vera Comfort Cushion • 200g',
      price: 280,
      mrp: 320,
      badge: 'Zero Burn',
      techBadge: 'Micro-Cushion Foam',
      headline: 'A Razor Glide So Smooth You Won’t Feel A Single Blade Pull',
      hype: 'Commercial foams are mostly compressed air and drying alcohol that give you ingrown hairs and bleeding nicks before exams. Dynamite creates a dense, hydro-lipid cushion rich in aloe and chamomile that softens coarse beard hair.',
      clinicalPointers: [
        'Dense micro-bubble matrix creates a friction-free glide layer',
        'Infused with pure Aloe Vera & Chamomile to stop razor burn',
        'Hydrates skin underneath the beard to prevent flaky peeling',
        'Leaves a clean, crisp masculine after-feel'
      ],
      image: 'https://rukminim3.flixcart.com/image/480/480/xif0q/shaving-cream/y/c/e/200-dynamite-shaving-foam-for-men-amway-original-imahfv97gnhphfhh.jpeg?q=90'
    }
  ]

  const categories = [
    'All', 
    'Oral Care', 
    'Skincare (Attitude)', 
    'Beauty & Glam', 
    'Hair & Scalp', 
    'Body & Bath', 
    "Men's Grooming"
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
      item_details: `${product.name} [${product.code}] (${qty} qty)`,
      copies: qty,
      total_price: product.price * qty
    }

    addToCart(cartItem)
    setSuccessMsg(`${qty} × ${product.name} added to your cart! Total: ₹${product.price * qty}`)
    setTimeout(() => setSuccessMsg(''), 4500)
  }

  // --- Direct WhatsApp Inquiry / Order ---
  const handleWhatsAppInquiry = (product) => {
    const qty = quantities[product.id] || 1
    const studentInfo = formData.student_name 
      ? `\n\n👤 *Student:* ${formData.student_name} (Roll: ${formData.roll_number || 'Hosteler'})\n📱 *Contact:* +91 ${formData.whatsapp_number || 'N/A'}`
      : ''
    
    const message = `Hi Anant! 👋\nI want to order / inquire about this Amway product on Print Studio:\n\n✨ *Product:* ${product.name} (${product.code})\n📦 *Quantity:* ${qty}\n💰 *Price:* ₹${product.price * qty} (₹${product.price} each)${studentInfo}\n\nCan you confirm direct hand-to-hand delivery on campus?`
    window.open(`https://wa.me/${ANANT_WHATSAPP}?text=${encodeURIComponent(message)}`, '_blank')
  }

  return (
    <div className="flex-1 w-full bg-[#1a1917] text-[#d4cebd] font-sans pb-32">
      
      {/* =========================================================================
          HIGH-AESTHETIC EDITORIAL APOTHECARY HERO
         ========================================================================= */}
      <div className="relative pt-16 pb-24 px-4 sm:px-8 border-b border-[#d4cebd]/10 overflow-hidden bg-gradient-to-b from-[#1a1917] via-[#201f1c] to-[#1a1917]">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[380px] bg-[#c25134]/10 blur-[140px] pointer-events-none rounded-full" />

        <div className="max-w-6xl mx-auto relative z-10">
          
          <Link to="/" className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#a09c91] hover:text-white transition-colors mb-10">
            <ArrowLeft className="w-3.5 h-3.5" /> Return to Campus Storefront
          </Link>

          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-4">
                <span className="font-mono text-[11px] tracking-widest uppercase bg-[#c25134]/20 text-[#c25134] border border-[#c25134]/30 px-3 py-1 rounded-full flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" /> The Concierge Collection
                </span>
                <span className="font-mono text-[11px] tracking-widest uppercase text-[#a09c91]">
                  [AMW-AUTHC-2026]
                </span>
              </div>

              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black font-serif text-white tracking-tight leading-[1.05]">
                Clinical Formulations.<br />
                <span className="italic font-light text-[#d4cebd]">Attitude & Pure Beauty.</span>
              </h1>

              <p className="text-[#a09c91] text-base sm:text-xl font-medium mt-6 leading-relaxed max-w-2xl font-serif">
                Supermarket skincare is 85% water, cheap foaming fillers, and chemical chalk. Upgrade to clinical-grade active botanicals, lead-free cosmetics, and Nutrilite-powered bio-concentrates that outlast commercial products by 3x.
              </p>
            </div>

            {/* Direct Seller Guarantee Badge */}
            <div className="bg-[#d4cebd]/5 border border-[#d4cebd]/15 p-6 rounded-2xl max-w-sm backdrop-blur-md">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full bg-[#c25134] text-white flex items-center justify-center font-bold text-xs shadow-lg">
                  AT
                </div>
                <div>
                  <p className="text-xs font-bold text-white uppercase tracking-wider">Curated By Anant Thakkur</p>
                  <p className="text-[11px] text-[#a09c91] font-mono">100% Genuine Direct Supply</p>
                </div>
              </div>
              <p className="text-xs text-[#a09c91] leading-relaxed mb-4">
                Sourced fresh from certified Amway facilities. No expired stock. Hand-delivered straight to your hostel wing.
              </p>
              <a 
                href={`https://wa.me/${ANANT_WHATSAPP}?text=${encodeURIComponent("Hi Anant! 👋 I'm browsing the Amway personal care & Attitude beauty vault on Print Studio. Can you recommend products for my skin/hair?")}`}
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-1.5 w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-all shadow-md font-mono"
              >
                <MessageCircle className="w-4 h-4" /> Consult with Anant on WhatsApp
              </a>
            </div>
          </div>

          {/* Minimalist 3-Pillar Scientific Strip */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 pt-10 border-t border-[#d4cebd]/10">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <Droplets className="w-5 h-5 text-[#c25134] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-white tracking-wide">3x Concentration Metric</h4>
                <p className="text-xs text-[#a09c91] mt-1 leading-relaxed">
                  One pea-sized dot of Glister or one pump of Attitude Cleanser delivers the active bio-payload of half a commercial bottle.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <ShieldCheck className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-white tracking-wide">Hostel Water & Screen Armor</h4>
                <p className="text-xs text-[#a09c91] mt-1 leading-relaxed">
                  Anti-hairfall ginseng complexes and HEV blue-light shielding day creams built for real engineering college life.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <Award className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-white tracking-wide">Lead-Free Clean Beauty</h4>
                <p className="text-xs text-[#a09c91] mt-1 leading-relaxed">
                  Attitude lipsticks, kajal, and compacts formulated with almond oil and mineral pigments. 100% certified clean beauty.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* =========================================================================
          MAIN STORE BODY (PAPER STOCK CANVAS FOR TACTILE LUXURY)
         ========================================================================= */}
      <div className="bg-[#d4cebd] text-[#1a1917] pt-12 pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          
          {/* =========================================================================
              STUDENT IDENTITY FORM (DEBOSSED EDITORIAL)
             ========================================================================= */}
          <div className="bg-[#cbc4b1] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),_inset_-1px_-1px_2px_rgba(255,255,255,0.7)] rounded-3xl p-8 mb-12 border border-black/5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-black/10 pb-3 mb-6 gap-2">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#c25134]">[STEP 01]</span>
                <h2 className="text-2xl font-bold font-serif text-[#1a1917] [text-shadow:-1px_-1px_1px_rgba(0,0,0,0.1),_1px_1px_1px_rgba(255,255,255,0.8)] mt-0.5">
                  Verify Student Identification
                </h2>
              </div>
              <span className="text-xs text-[#5a5750] font-mono">Locks in delivery coordinates for checkout</span>
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
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold text-[#3a3832] uppercase tracking-wider">Student Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
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

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold text-[#3a3832] uppercase tracking-wider">Roll Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <FileText className="h-4 w-4 text-[#1a1917]/50" />
                  </div>
                  <input 
                    name="roll_number" 
                    value={formData.roll_number} 
                    onChange={handleChange} 
                    className="w-full bg-[#d4cebd] border-none rounded-xl py-3 pl-10 pr-4 font-medium text-sm focus:ring-2 focus:ring-[#c25134] outline-none shadow-sm uppercase font-mono" 
                    placeholder="2023CS01" 
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold text-[#3a3832] uppercase tracking-wider">WhatsApp Number</label>
                <div className="flex items-stretch bg-[#d4cebd] rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[#c25134] shadow-sm">
                  <div className="flex items-center pl-3.5 pr-2.5 border-r border-black/10">
                    <Phone className="h-4 w-4 text-[#1a1917]/50 mr-1.5" />
                    <span className="text-[#1a1917] font-bold text-sm font-mono">+91</span>
                  </div>
                  <input 
                    type="tel" 
                    name="whatsapp_number" 
                    value={formData.whatsapp_number} 
                    onChange={handleChange} 
                    pattern="[0-9]{10}" 
                    maxLength="10" 
                    className="w-full bg-transparent border-none py-3 px-3 font-medium text-sm focus:outline-none font-mono" 
                    placeholder="9876543210" 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* =========================================================================
              MINIMALIST CATEGORY SELECTOR & SEARCH
             ========================================================================= */}
          <div className="mb-10 space-y-4">
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              
              {/* Category Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all shadow-sm ${
                      selectedCategory === cat
                        ? 'bg-[#1a1917] text-[#d4cebd] shadow-md font-bold scale-[1.02]'
                        : 'bg-[#cbc4b1] hover:bg-[#1a1917]/10 text-[#3a3832] font-semibold'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Instant Search Bar */}
              <div className="relative min-w-[280px]">
                <Search className="w-4 h-4 text-[#1a1917]/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Attitude, Glister, Lipstick..."
                  className="w-full bg-[#cbc4b1] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),_inset_-1px_-1px_2px_rgba(255,255,255,0.7)] border-none rounded-xl py-2.5 pl-10 pr-4 text-xs font-medium focus:ring-2 focus:ring-[#c25134] outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-[#5a5750] px-1 font-mono">
              <span>Catalog Index: {filteredProducts.length} items in [{selectedCategory}]</span>
              <span className="hidden sm:inline">Hand-to-Hand Delivery Across Campus</span>
            </div>
          </div>

          {/* =========================================================================
              EDITORIAL PRODUCT CARDS GRID
             ========================================================================= */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(product => {
              const qty = quantities[product.id] || 1
              const totalPrice = product.price * qty

              return (
                <div 
                  key={product.id}
                  className="bg-[#dfd9cb] rounded-3xl overflow-hidden shadow-[inset_2px_2px_5px_rgba(255,255,255,0.6),_0_10px_25px_rgba(0,0,0,0.06)] flex flex-col border border-black/10 transition-all hover:shadow-[0_15px_35px_rgba(0,0,0,0.12)] hover:-translate-y-1 group"
                >
                  {/* Clean Studio Imagery Showcase */}
                  <div className="h-64 bg-gradient-to-b from-[#ece7db] to-[#dfd9cb] flex items-center justify-center p-6 relative border-b border-black/5 overflow-hidden">
                    {/* Top Badges */}
                    <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-1.5 z-10">
                      <span className="bg-[#1a1917] text-[#d4cebd] text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-md shadow-sm">
                        {product.badge}
                      </span>
                      <span className="bg-[#c25134] text-white text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md shadow-sm">
                        {product.techBadge}
                      </span>
                    </div>

                    <span className="absolute top-3.5 right-3.5 text-[10px] font-mono text-[#1a1917]/40 uppercase tracking-widest">
                      {product.code}
                    </span>

                    {/* Actual Product Image with Drop Shadow */}
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="max-h-52 w-auto object-contain transition-all duration-500 group-hover:scale-105 drop-shadow-[0_10px_15px_rgba(0,0,0,0.15)] mix-blend-multiply" 
                      loading="lazy"
                    />
                  </div>

                  {/* Card Content & Formulation Pitch */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#5a5750]">
                      <span className="uppercase tracking-widest text-[#c25134] font-bold">{product.category}</span>
                      <span>{product.spec}</span>
                    </div>

                    <h3 className="text-xl font-bold font-serif text-[#1a1917] mt-1.5 leading-snug">
                      {product.name}
                    </h3>

                    {/* Pro Seller Hook Headline */}
                    <p className="text-xs font-serif italic font-bold text-[#c25134] mt-2 leading-tight">
                      "{product.headline}"
                    </p>

                    <p className="text-xs text-[#3a3832] font-medium mt-3 leading-relaxed flex-1">
                      {product.hype}
                    </p>

                    {/* Clinical Bullet Points */}
                    <ul className="mt-4 pt-3 border-t border-black/5 space-y-1.5 text-[11px] text-[#5a5750]">
                      {product.clinicalPointers.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-green-700 shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Price & Quantity Stepper */}
                    <div className="mt-6 pt-4 border-t border-black/10 flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-black text-[#1a1917] font-serif">₹{totalPrice}</span>
                          {product.mrp && (
                            <span className="text-xs text-[#5a5750] line-through font-mono">₹{product.mrp * qty}</span>
                          )}
                        </div>
                        {qty > 1 && (
                          <span className="text-[10px] font-mono text-[#5a5750] block mt-0.5">(₹{product.price} each)</span>
                        )}
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center bg-[#cbc4b1] rounded-xl p-1 shadow-inner border border-black/5">
                        <button 
                          type="button"
                          onClick={() => handleQtyChange(product.id, -1)}
                          className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#d4cebd] hover:bg-[#1a1917] hover:text-[#d4cebd] text-[#1a1917] transition-all font-bold text-xs"
                          title="Decrease Quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center font-bold font-mono text-xs text-[#1a1917]">{qty}</span>
                        <button 
                          type="button"
                          onClick={() => handleQtyChange(product.id, 1)}
                          className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#d4cebd] hover:bg-[#1a1917] hover:text-[#d4cebd] text-[#1a1917] transition-all font-bold text-xs"
                          title="Increase Quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Dual Action Buttons */}
                    <div className="mt-5 space-y-2">
                      <button 
                        onClick={() => handleAddToCart(product)}
                        className="w-full bg-[#1a1917] hover:bg-[#2a2927] text-[#d4cebd] font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md tracking-wide text-xs"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" /> Add to Order Cart
                      </button>

                      <button 
                        onClick={() => handleWhatsAppInquiry(product)}
                        className="w-full bg-transparent hover:bg-black/5 border border-black/20 text-[#1a1917] font-bold py-2.5 px-4 rounded-xl transition-all flex items-center justify-center gap-1.5 text-xs font-mono"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-green-700" /> WhatsApp Direct Order
                      </button>
                    </div>

                  </div>
                </div>
              )
            })}
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="bg-[#cbc4b1] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),_inset_-1px_-1px_2px_rgba(255,255,255,0.7)] rounded-3xl p-14 text-center mt-6">
              <p className="text-xl font-bold font-serif text-[#1a1917]">No products matched your search keyword.</p>
              <p className="text-sm text-[#5a5750] mt-1 font-serif italic">Try searching for "Attitude", "Lipstick", "Glister", or "Kajal".</p>
              <button
                onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                className="mt-5 bg-[#1a1917] text-[#d4cebd] font-bold py-2 px-6 rounded-xl text-xs font-mono uppercase tracking-wider"
              >
                Reset Catalog Filter
              </button>
            </div>
          )}

          {/* =========================================================================
              CUSTOM AMWAY SOURCING CONCIERGE BANNER
             ========================================================================= */}
          <div className="mt-16 bg-[#1a1917] text-[#d4cebd] rounded-3xl p-8 sm:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 border border-white/10 relative overflow-hidden">
            <div className="space-y-3 text-center md:text-left relative z-10 max-w-xl">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#c25134] bg-[#c25134]/15 px-3 py-1 rounded-full border border-[#c25134]/30 inline-block">
                Custom Concierge Sourcing
              </span>
              <h3 className="text-3xl font-black font-serif text-white">
                Looking for Nutrilite™, Artistry™, or SA8™?
              </h3>
              <p className="text-xs sm:text-sm text-[#a09c91] leading-relaxed">
                As an authorized distributor on campus, I can procure any product across Amway India's entire health, nutrition, and home-care line. 100% genuine batch codes with zero shipping fees.
              </p>
            </div>

            <a 
              href={`https://wa.me/${ANANT_WHATSAPP}?text=${encodeURIComponent("Hi Anant! 👋 I'm looking for a specific Amway product (Nutrilite/Artistry/Home care) not listed on the Print Studio website. Can you source it for me?")}`}
              target="_blank" 
              rel="noreferrer"
              className="bg-[#c25134] hover:bg-[#a6432a] text-white font-bold py-4 px-8 rounded-xl transition-all shadow-xl flex items-center justify-center gap-2 text-sm shrink-0 whitespace-nowrap font-mono tracking-wider relative z-10"
            >
              <MessageCircle className="w-4 h-4" /> Message Anant on WhatsApp
            </a>
          </div>

        </div>
      </div>

    </div>
  )
}
