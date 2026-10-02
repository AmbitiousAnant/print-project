import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { User, FileText, Phone, ShoppingCart, ArrowLeft, CheckCircle2, ExternalLink } from 'lucide-react'
import { useCart } from './CartContext'

export default function CalculatorsCategory() {
  const { addToCart } = useCart()
  const [successMsg, setSuccessMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const [formData, setFormData] = useState({
    student_name: '',
    roll_number: '',
    whatsapp_number: ''
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

  const handleAddToCart = (model, price) => {
    setErrorMsg('')
    setSuccessMsg('')
    
    if (!formData.student_name || !formData.roll_number || formData.whatsapp_number.length !== 10) {
      setErrorMsg("Please fill in your valid personal details at the top before adding to cart.")
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    const cartItem = {
      student_name: formData.student_name,
      roll_number: formData.roll_number,
      whatsapp_number: `+91${formData.whatsapp_number}`,
      item_type: 'Calculator',
      item_details: model,
      copies: 1,
      total_price: price
    }

    addToCart(cartItem)
    setSuccessMsg(`${model} added to your cart!`)
    setTimeout(() => setSuccessMsg(''), 4000)
  }

  return (
    <div className="flex-1 w-full bg-[#d4cebd] text-[#1a1917] font-sans pb-32 pt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        
        <Link to="/" className="inline-flex items-center gap-2 text-[#5a5750] hover:text-[#1a1917] font-bold mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5" /> Back to Store
        </Link>

        <h1 className="text-4xl lg:text-5xl font-black font-serif text-[#1a1917] [text-shadow:-1px_-1px_1px_rgba(0,0,0,0.2),_1px_1px_1px_rgba(255,255,255,0.8)] mb-8">
          Scientific Calculators
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
        <h2 className="text-xl font-bold font-serif text-[#1a1917] mb-6 border-b border-black/10 pb-2">2. Select a Model</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* MODEL 1: 991ES Plus */}
          <div className="bg-[#cbc4b1] rounded-3xl overflow-hidden shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),_inset_-1px_-1px_2px_rgba(255,255,255,0.7)] flex flex-col">
            <div className="h-64 bg-[#1a1917] overflow-hidden border-b border-black/10">
              <img 
                src="https://images.unsplash.com/photo-1587145820266-a5951ee6f620?auto=format&fit=crop&w=800" 
                alt="Casio fx-991ES Plus" 
                className="w-full h-full object-cover grayscale contrast-125 mix-blend-multiply opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-700" 
              />
            </div>
            <div className="p-8 flex flex-col flex-1">
              <h3 className="text-2xl font-bold font-serif text-[#1a1917] [text-shadow:-1px_-1px_1px_rgba(0,0,0,0.2),_1px_1px_1px_rgba(255,255,255,0.8)]">
                Casio fx-991ES Plus 2nd Edition
              </h3>
              <p className="text-[#5a5750] font-medium mt-3 leading-relaxed">
                417 Functions, Natural Textbook Display, Non-Programmable. The ultimate engineering standard.
              </p>
              
              {/* Price Comparison Table */}
              <div className="mt-6 mb-8 bg-[#d4cebd]/50 rounded-2xl p-5 border border-black/5 shadow-inner">
                <table className="w-full text-left border-collapse">
                  <tbody>
                    <tr className="border-b border-black/5">
                      <td className="py-2.5 text-[#5a5750] font-medium">Casio Official</td>
                      <td className="py-2.5 text-right font-bold text-[#1a1917]/50 line-through decoration-black/30">₹1,595</td>
                    </tr>
                    <tr className="border-b border-black/5">
                      <td className="py-2.5 text-[#5a5750] font-medium">Amazon/Flipkart</td>
                      <td className="py-2.5 text-right font-bold text-[#1a1917]/50 line-through decoration-black/30">~₹1,450</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 text-[#1a1917] font-black font-serif">Print Studio</td>
                      <td className="py-2.5 text-right font-black text-[#c25134] text-xl">₹1300</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-auto flex flex-col xl:flex-row items-center gap-4">
                <button 
                  onClick={() => handleAddToCart("Casio fx-991ES Plus 2nd Edition", 1000)}
                  className="w-full bg-[#1a1917] hover:bg-[#2a2927] text-[#d4cebd] font-bold py-3.5 px-6 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <ShoppingCart className="w-5 h-5" /> Add to Cart
                </button>
                <a 
                  href="https://www.casio.com/in/scientific-calculators/product.FX-991ESPLUS-2/"
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full xl:w-auto bg-transparent border-2 border-[#1a1917] hover:bg-[#1a1917] hover:text-[#d4cebd] text-[#1a1917] font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <ExternalLink className="w-4 h-4" /> View Specs
                </a>
              </div>
            </div>
          </div>

          {/* MODEL 2: 100MS */}
          <div className="bg-[#cbc4b1] rounded-3xl overflow-hidden shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),_inset_-1px_-1px_2px_rgba(255,255,255,0.7)] flex flex-col">
            <div className="h-64 bg-[#1a1917] overflow-hidden border-b border-black/10">
              <img 
                src="https://images.unsplash.com/photo-1574607383471-42faef81451e?auto=format&fit=crop&w=800" 
                alt="Casio fx-100MS" 
                className="w-full h-full object-cover grayscale contrast-125 mix-blend-multiply opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-700" 
              />
            </div>
            <div className="p-8 flex flex-col flex-1">
              <h3 className="text-2xl font-bold font-serif text-[#1a1917] [text-shadow:-1px_-1px_1px_rgba(0,0,0,0.2),_1px_1px_1px_rgba(255,255,255,0.8)]">
                Casio fx-100MS 2nd Edition
              </h3>
              <p className="text-[#5a5750] font-medium mt-3 leading-relaxed">
                300 Functions, 2-line Display. Reliable, straightforward, and exam-safe.
              </p>
              
              {/* Price Comparison Table */}
              <div className="mt-6 mb-8 bg-[#d4cebd]/50 rounded-2xl p-5 border border-black/5 shadow-inner">
                <table className="w-full text-left border-collapse">
                  <tbody>
                    <tr className="border-b border-black/5">
                      <td className="py-2.5 text-[#5a5750] font-medium">Casio Official</td>
                      <td className="py-2.5 text-right font-bold text-[#1a1917]/50 line-through decoration-black/30">₹1,135</td>
                    </tr>
                    <tr className="border-b border-black/5">
                      <td className="py-2.5 text-[#5a5750] font-medium">Amazon/Flipkart</td>
                      <td className="py-2.5 text-right font-bold text-[#1a1917]/50 line-through decoration-black/30">~₹1,026</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 text-[#1a1917] font-black font-serif">Print Studio</td>
                      <td className="py-2.5 text-right font-black text-[#c25134] text-xl">₹1000</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-auto flex flex-col xl:flex-row items-center gap-4">
                <button 
                  onClick={() => handleAddToCart("Casio fx-100MS 2nd Edition", 850)}
                  className="w-full bg-[#1a1917] hover:bg-[#2a2927] text-[#d4cebd] font-bold py-3.5 px-6 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <ShoppingCart className="w-5 h-5" /> Add to Cart
                </button>
                <a 
                  href="https://www.casio.com/in/scientific-calculators/product.FX-100MS-2/"
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full xl:w-auto bg-transparent border-2 border-[#1a1917] hover:bg-[#1a1917] hover:text-[#d4cebd] text-[#1a1917] font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <ExternalLink className="w-4 h-4" /> View Specs
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}