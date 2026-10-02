import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { User, FileText, Phone, ShoppingCart, CheckCircle2, ArrowLeft } from 'lucide-react'
import { useCart } from './CartContext'

export default function CalculatorPage() {
  const { addToCart } = useCart()
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    student_name: '',
    roll_number: '',
    whatsapp_number: '',
    quantity: 1
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'whatsapp_number') {
      const numbersOnly = value.replace(/\D/g, '')
      if (numbersOnly.length <= 10) {
        setFormData(prev => ({ ...prev, [name]: numbersOnly }))
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleAddToCart = (e) => {
    e.preventDefault()
    setError('')

    if (formData.whatsapp_number.length !== 10) {
      setError("Please enter exactly 10 digits for your WhatsApp number.")
      return
    }

    const cartItem = {
      student_name: formData.student_name,
      roll_number: formData.roll_number,
      whatsapp_number: `+91${formData.whatsapp_number}`,
      item_type: 'Calculator',
      item_details: 'Casio fx-991ES Plus / 991CW',
      copies: parseInt(formData.quantity),
      total_price: 1000 * parseInt(formData.quantity)
    }

    addToCart(cartItem)
    setSuccess(true)
  }

  if (success) {
    return (
      <div className="flex-1 w-full flex items-center justify-center bg-[#d4cebd] p-4 font-sans min-h-[80vh]">
        <div className="bg-[#cbc4b1] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),_inset_-1px_-1px_2px_rgba(255,255,255,0.7)] rounded-3xl p-8 sm:p-12 max-w-md w-full text-center space-y-6 border border-black/5">
          <div className="mx-auto w-20 h-20 bg-[#1a1917] rounded-full flex items-center justify-center shadow-xl">
            <ShoppingCart className="w-10 h-10 text-[#d4cebd]" />
          </div>
          <h2 className="text-3xl font-bold font-serif text-[#1a1917] [text-shadow:-1px_-1px_1px_rgba(0,0,0,0.2),_1px_1px_1px_rgba(255,255,255,0.8)]">Added to Cart!</h2>
          <p className="text-[#3a3832] font-medium text-lg leading-relaxed">
            The Scientific Calculator has been queued in your cart.
          </p>
          <div className="flex flex-col gap-4 mt-8">
            <Link to="/cart" className="w-full bg-[#1a1917] hover:bg-[#2a2927] text-[#d4cebd] font-bold py-4 px-6 rounded-xl transition-all shadow-lg tracking-wide block">
              View Cart & Checkout
            </Link>
            <Link to="/" className="w-full bg-[#cbc4b1] border-2 border-[#1a1917] hover:bg-[#1a1917] hover:text-[#d4cebd] text-[#1a1917] font-bold py-4 px-6 rounded-xl transition-all shadow-lg tracking-wide block">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 w-full bg-[#d4cebd] text-[#1a1917] font-sans pb-32 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        
        <Link to="/" className="inline-flex items-center gap-2 text-[#5a5750] hover:text-[#1a1917] font-bold mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5" /> Back to Store
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          
          {/* LEFT: PRODUCT IMAGE */}
          <div className="bg-[#cbc4b1] rounded-3xl p-4 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),_inset_-1px_-1px_2px_rgba(255,255,255,0.7)] flex items-center justify-center">
            <img 
              src="https://images.unsplash.com/photo-1587145820266-a5951ee6f620?q=80&w=800&auto=format&fit=crop" 
              alt="Casio Calculator" 
              className="rounded-2xl grayscale contrast-125 mix-blend-multiply object-cover w-full h-[400px] md:h-[600px] shadow-inner" 
            />
          </div>

          {/* RIGHT: DETAILS & FORM */}
          <div className="space-y-8 flex flex-col justify-center">
            
            <div className="border-b border-black/10 pb-8">
              <h1 className="text-4xl lg:text-5xl font-black font-serif text-[#1a1917] [text-shadow:-1px_-1px_1px_rgba(0,0,0,0.2),_1px_1px_1px_rgba(255,255,255,0.8)] leading-tight">
                Casio fx-991ES Plus / 991CW Scientific Calculator
              </h1>
              <p className="text-[#c25134] text-4xl font-black mt-6 font-serif">₹1000</p>
              <p className="text-[#5a5750] font-medium text-lg mt-6 leading-relaxed">
                Non-Programmable, 417 Functions, Natural Textbook Display, Solar & Battery powered. The standard engineering requirement for all semesters.
              </p>
            </div>

            <form onSubmit={handleAddToCart} className="space-y-6 pt-4">
              
              {error && (
                <div className="p-4 bg-[#c25134]/10 border border-[#c25134]/30 rounded-xl text-[#c25134] text-sm text-center font-bold">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#3a3832] uppercase tracking-wider">Student Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><User className="h-5 w-5 text-[#1a1917]/50" /></div>
                    <input required name="student_name" value={formData.student_name} onChange={handleChange} className="w-full bg-[#cbc4b1] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),_inset_-1px_-1px_2px_rgba(255,255,255,0.7)] border-none rounded-xl py-3 pl-10 pr-4 font-medium focus:ring-2 focus:ring-[#c25134] outline-none" placeholder="Anant Thakkur" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#3a3832] uppercase tracking-wider">Roll Number</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><FileText className="h-5 w-5 text-[#1a1917]/50" /></div>
                    <input required name="roll_number" value={formData.roll_number} onChange={handleChange} className="w-full bg-[#cbc4b1] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),_inset_-1px_-1px_2px_rgba(255,255,255,0.7)] border-none rounded-xl py-3 pl-10 pr-4 font-medium focus:ring-2 focus:ring-[#c25134] outline-none" placeholder="2023CS01" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#3a3832] uppercase tracking-wider">WhatsApp Number</label>
                  <div className="flex items-stretch bg-[#cbc4b1] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),_inset_-1px_-1px_2px_rgba(255,255,255,0.7)] rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[#c25134] transition-all">
                    <div className="flex items-center pl-4 pr-3 border-r border-black/10">
                      <Phone className="h-5 w-5 text-[#1a1917]/50 mr-2" />
                      <span className="text-[#1a1917] font-bold text-base">+91</span>
                    </div>
                    <input required type="tel" name="whatsapp_number" value={formData.whatsapp_number} onChange={handleChange} pattern="[0-9]{10}" maxLength="10" className="w-full bg-transparent border-none py-3 px-4 font-medium focus:outline-none" placeholder="9876543210" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#3a3832] uppercase tracking-wider">Quantity</label>
                  <input required type="number" min="1" name="quantity" value={formData.quantity} onChange={handleChange} className="w-full bg-[#cbc4b1] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),_inset_-1px_-1px_2px_rgba(255,255,255,0.7)] border-none rounded-xl py-3 px-4 font-medium focus:ring-2 focus:ring-[#c25134] outline-none" />
                </div>
              </div>

              <button type="submit" className="w-full bg-[#1a1917] hover:bg-[#2a2927] text-[#d4cebd] font-bold py-5 px-10 rounded-xl transition-all flex items-center justify-center gap-3 text-xl shadow-xl tracking-wide mt-4">
                <ShoppingCart className="w-6 h-6" /> Add to Cart — ₹{1000 * parseInt(formData.quantity || 1)}
              </button>
            </form>

          </div>
        </div>
      </div>
    </div>
  )
}