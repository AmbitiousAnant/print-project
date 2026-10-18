import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { User, FileText, Phone, ShoppingCart, ArrowLeft, CheckCircle2, Plus, Minus } from 'lucide-react'
import { useCart } from './CartContext'

export default function RegistersCategory() {
  const { addToCart } = useCart()
  const [successMsg, setSuccessMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const [formData, setFormData] = useState({
    student_name: '',
    roll_number: '',
    whatsapp_number: ''
  })

  // Quantity tracker per item id (default 1)
  const [quantities, setQuantities] = useState({
    1: 1,
    2: 1,
    3: 1,
    4: 1
  })

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

  const handleAddToCart = (item) => {
    setErrorMsg('')
    setSuccessMsg('')
    
    if (!formData.student_name || !formData.roll_number || formData.whatsapp_number.length !== 10) {
      setErrorMsg("Please fill in your valid personal details at the top before adding to cart.")
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    const qty = quantities[item.id] || 1
    const cartItem = {
      student_name: formData.student_name,
      roll_number: formData.roll_number,
      whatsapp_number: `+91${formData.whatsapp_number}`,
      item_type: 'Register',
      item_details: `${item.model} (${qty} qty)`,
      copies: qty,
      total_price: item.price * qty
    }

    addToCart(cartItem)
    setSuccessMsg(`${qty} × ${item.model} added to your cart!`)
    setTimeout(() => setSuccessMsg(''), 4000)
  }

  // --- 4 REGISTER PRODUCTS (Update image paths when you have them) ---
  const registers = [
    {
      id: 1,
      model: "Spiral Register (400 Pages)",
      price: 140,
      specs: "400 Pages. Heavy-duty spiral binding with thick, high-GSM paper. Ideal for full-semester notes.",
      image: "400.webp" // Replace with your image
    },
    {
      id: 2,
      model: "Register White (200 Pages)",
      price: 70,
      specs: "200 Pages. Bright white, smooth ruled pages for clean assignments, projects & fair work.",
      image: "200.jpg" // Replace with your image
    },
    {
      id: 3,
      model: "Register Yellow (200 Pages)",
      price: 50,
      specs: "200 Pages. Classic yellow ruled sheets. High-value everyday notebook for classwork & practice.",
      image: "201.jpg" // Replace with your image
    },
    {
      id: 4,
      model: "Thin Notebook / Copy",
      price: 30,
      specs: "Slim, lightweight copy. Perfect for quick labs, quizzes, tutorials & rough calculations.",
      image: "40.png" // Replace with your image
    }
  ]

  return (
    <div className="flex-1 w-full bg-[#d4cebd] text-[#1a1917] font-sans pb-32 pt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        
        <Link to="/" className="inline-flex items-center gap-2 text-[#5a5750] hover:text-[#1a1917] font-bold mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5" /> Back to Store
        </Link>

        <h1 className="text-4xl lg:text-5xl font-black font-serif text-[#1a1917] [text-shadow:-1px_-1px_1px_rgba(0,0,0,0.2),_1px_1px_1px_rgba(255,255,255,0.8)] mb-8">
          College Registers & Notebooks
        </h1>

        {/* Global Personal Details (Required before adding to cart) */}
        <div className="bg-[#cbc4b1] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),_inset_-1px_-1px_2px_rgba(255,255,255,0.7)] rounded-3xl p-8 mb-12">
          <h2 className="text-xl font-bold font-serif text-[#1a1917] mb-6 border-b border-black/10 pb-2">1. Verify Your Identity</h2>
          
          {errorMsg && <div className="mb-6 p-4 bg-[#c25134]/10 border border-[#c25134]/30 rounded-xl text-[#c25134] font-bold">{errorMsg}</div>}
          {successMsg && <div className="mb-6 p-4 bg-green-900/10 border border-green-900/30 rounded-xl text-green-800 font-bold flex items-center gap-2"><CheckCircle2 className="w-5 h-5"/> {successMsg}</div>}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#3a3832] uppercase tracking-wider">Student Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><User className="h-5 w-5 text-[#1a1917]/50" /></div>
                <input name="student_name" value={formData.student_name} onChange={handleChange} className="w-full bg-[#d4cebd] border-none rounded-xl py-3 pl-10 pr-4 font-medium focus:ring-2 focus:ring-[#c25134] outline-none shadow-sm" placeholder="Anant Thakkur" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#3a3832] uppercase tracking-wider">Roll Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><FileText className="h-5 w-5 text-[#1a1917]/50" /></div>
                <input name="roll_number" value={formData.roll_number} onChange={handleChange} className="w-full bg-[#d4cebd] border-none rounded-xl py-3 pl-10 pr-4 font-medium focus:ring-2 focus:ring-[#c25134] outline-none shadow-sm" placeholder="2023CS01" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#3a3832] uppercase tracking-wider">WhatsApp Number</label>
              <div className="flex items-stretch bg-[#d4cebd] rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[#c25134] shadow-sm">
                <div className="flex items-center pl-4 pr-3 border-r border-black/10">
                  <Phone className="h-5 w-5 text-[#1a1917]/50 mr-2" />
                  <span className="text-[#1a1917] font-bold">+91</span>
                </div>
                <input type="tel" name="whatsapp_number" value={formData.whatsapp_number} onChange={handleChange} pattern="[0-9]{10}" maxLength="10" className="w-full bg-transparent border-none py-3 px-4 font-medium focus:outline-none" placeholder="9876543210" />
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <h2 className="text-xl font-bold font-serif text-[#1a1917] mb-6 border-b border-black/10 pb-2">2. Select Your Registers</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {registers.map(reg => {
            const qty = quantities[reg.id] || 1
            const totalPrice = reg.price * qty

            return (
              <div key={reg.id} className="bg-[#cbc4b1] rounded-3xl overflow-hidden shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),_inset_-1px_-1px_2px_rgba(255,255,255,0.7)] flex flex-col border border-black/5">
                <div className="h-60 bg-[#1a1917] overflow-hidden border-b border-black/10">
                  <img 
                    src={reg.image} 
                    alt={reg.model} 
                    className="w-full h-full object-cover grayscale contrast-125 mix-blend-multiply opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-700" 
                  />
                </div>
                <div className="p-7 flex flex-col flex-1">
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="text-2xl font-bold font-serif text-[#1a1917] [text-shadow:-1px_-1px_1px_rgba(0,0,0,0.2),_1px_1px_1px_rgba(255,255,255,0.8)]">
                      {reg.model}
                    </h3>
                  </div>
                  <p className="text-[#5a5750] text-sm font-medium mt-2 flex-1 leading-relaxed">
                    {reg.specs}
                  </p>

                  {/* Quantity & Price Row */}
                  <div className="mt-6 pt-4 border-t border-black/10 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-[#5a5750] font-bold uppercase tracking-wider block">Price</span>
                      <span className="text-3xl font-black text-[#c25134] font-serif">₹{totalPrice}</span>
                      {qty > 1 && (
                        <span className="text-xs text-[#5a5750] font-medium ml-2">(₹{reg.price} each)</span>
                      )}
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center bg-[#d4cebd] rounded-xl p-1 shadow-inner border border-black/5">
                      <button 
                        type="button"
                        onClick={() => handleQtyChange(reg.id, -1)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#cbc4b1] hover:bg-[#1a1917] hover:text-[#d4cebd] text-[#1a1917] transition-all font-bold"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-10 text-center font-bold text-sm text-[#1a1917]">{qty}</span>
                      <button 
                        type="button"
                        onClick={() => handleQtyChange(reg.id, 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#cbc4b1] hover:bg-[#1a1917] hover:text-[#d4cebd] text-[#1a1917] transition-all font-bold"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <button 
                    onClick={() => handleAddToCart(reg)}
                    className="mt-6 w-full bg-[#1a1917] hover:bg-[#2a2927] text-[#d4cebd] font-bold py-3.5 px-6 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg tracking-wide"
                  >
                    <ShoppingCart className="w-5 h-5" /> Add to Cart
                  </button>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </div>
  )
}``