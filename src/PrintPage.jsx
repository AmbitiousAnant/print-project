import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Link as LinkIcon, FileText, User, Phone, ShoppingCart, ArrowLeft } from 'lucide-react'
import { useCart } from './CartContext'

export default function PrintPage() {
  const { addToCart } = useCart()
  
  const [formData, setFormData] = useState({
    student_name: '',
    roll_number: '',
    whatsapp_number: '',
    document_url: '',
    print_type: 'Black & White',
    sides: 'Single-Sided',
    pages: 1,
    copies: 1,
  })
  
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'whatsapp_number') {
      const numbersOnly = value.replace(/\D/g, '')
      if (numbersOnly.length <= 10) setFormData(prev => ({ ...prev, [name]: numbersOnly }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const calculatedPrice = useMemo(() => {
    const p = parseInt(formData.pages) || 0;
    const c = parseInt(formData.copies) || 1;
    const totalPages = p * c;
    
    if (totalPages < 20) return 0;
    
    let price = formData.print_type === 'Color' ? (totalPages * 10) : (25 + ((totalPages - 20) * 1.5));
    if (formData.sides === 'Double-Sided') price += 10;
    
    return price;
  }, [formData.pages, formData.print_type, formData.sides, formData.copies]);

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    
    const p = parseInt(formData.pages) || 0;
    const c = parseInt(formData.copies) || 1;
    
    if ((p * c) < 20) {
      setError("Total combined pages (Pages × Copies) must be at least 20.");
      return;
    }

    if (formData.whatsapp_number.length !== 10) {
      setError("Please enter exactly 10 digits for your WhatsApp number.");
      return;
    }

    const cartItem = {
      student_name: formData.student_name,
      roll_number: formData.roll_number,
      whatsapp_number: `+91${formData.whatsapp_number}`,
      item_type: 'Print',
      total_price: calculatedPrice,
      document_url: formData.document_url,
      print_type: formData.print_type,
      sides: formData.sides,
      copies: parseInt(formData.copies),
      item_details: `${formData.pages} Pages`
    }

    addToCart(cartItem)
    setSuccess(true)
  }

  if (success) {
    return (
      <div className="flex-1 w-full flex items-center justify-center bg-[#d4cebd] p-4 font-sans min-h-[80vh]">
        <div className="bg-[#cbc4b1] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),_inset_-1px_-1px_2px_rgba(255,255,255,0.7)] rounded-3xl p-8 sm:p-12 max-w-md w-full text-center space-y-6">
          <div className="mx-auto w-20 h-20 bg-[#1a1917] rounded-full flex items-center justify-center shadow-xl">
            <ShoppingCart className="w-10 h-10 text-[#d4cebd]" />
          </div>
          <h2 className="text-3xl font-bold font-serif text-[#1a1917] [text-shadow:-1px_-1px_1px_rgba(0,0,0,0.2),_1px_1px_1px_rgba(255,255,255,0.8)]">Added to Cart!</h2>
          <p className="text-[#3a3832] font-medium text-lg leading-relaxed">
            Your document print has been queued.
          </p>
          <div className="flex flex-col gap-4 mt-8">
            <Link to="/cart" className="w-full bg-[#1a1917] hover:bg-[#2a2927] text-[#d4cebd] font-bold py-4 px-6 rounded-xl transition-all shadow-lg tracking-wide block">
              View Cart & Checkout
            </Link>
            <button onClick={() => { setSuccess(false); setFormData(prev => ({ ...prev, document_url: '', pages: 1, copies: 1 })); }} className="w-full bg-[#c25134] hover:bg-[#a6432a] text-[#d4cebd] font-bold py-4 px-6 rounded-xl transition-all shadow-lg tracking-wide">
              Print Another Document
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 w-full bg-[#d4cebd] text-[#1a1917] font-sans pb-32 pt-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        
        <Link to="/" className="inline-flex items-center gap-2 text-[#5a5750] hover:text-[#1a1917] font-bold mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5" /> Back to Store
        </Link>

        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold font-serif text-[#1a1917] [text-shadow:-1px_-1px_1px_rgba(0,0,0,0.2),_1px_1px_1px_rgba(255,255,255,0.8)]">Document Printing</h2>
          <p className="text-[#5a5750] font-medium mt-3 text-lg">Configure your prints below. We handle the rest.</p>
        </div>

        <form onSubmit={handleSubmit} className="relative space-y-12">
          {error && <div className="p-4 bg-[#c25134]/10 border border-[#c25134]/30 rounded-xl text-[#c25134] text-sm text-center font-bold">{error}</div>}

          {/* Personal Details */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold font-serif text-[#1a1917] border-b-2 border-black/10 pb-2">1. Your Details</h3>
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
              <div className="space-y-2 sm:col-span-2">
                <label className="text-sm font-bold text-[#3a3832] uppercase tracking-wider">WhatsApp Number</label>
                <div className="flex items-stretch bg-[#cbc4b1] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),_inset_-1px_-1px_2px_rgba(255,255,255,0.7)] rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[#c25134]">
                  <div className="flex items-center pl-4 pr-3 border-r border-black/10">
                    <Phone className="h-5 w-5 text-[#1a1917]/50 mr-2" />
                    <span className="text-[#1a1917] font-bold">+91</span>
                  </div>
                  <input required type="tel" name="whatsapp_number" value={formData.whatsapp_number} onChange={handleChange} pattern="[0-9]{10}" maxLength="10" className="w-full bg-transparent border-none py-3 px-4 font-medium focus:outline-none" placeholder="9876543210" />
                </div>
              </div>
            </div>
          </div>

          {/* Print Configuration */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold font-serif text-[#1a1917] border-b-2 border-black/10 pb-2">2. Print Configuration</h3>
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#3a3832] uppercase tracking-wider flex justify-between">Document Link <span className="text-[#1a1917]/50 normal-case font-medium">Must be "Anyone with link"</span></label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><LinkIcon className="h-5 w-5 text-[#1a1917]/50" /></div>
                <input required type="url" name="document_url" value={formData.document_url} onChange={handleChange} className="w-full bg-[#cbc4b1] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),_inset_-1px_-1px_2px_rgba(255,255,255,0.7)] border-none rounded-xl py-3 pl-10 pr-4 font-medium focus:ring-2 focus:ring-[#c25134] outline-none" placeholder="https://drive.google.com/file/d/..." />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#3a3832] uppercase tracking-wider">Color Type</label>
                <div className="flex bg-[#cbc4b1] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),_inset_-1px_-1px_2px_rgba(255,255,255,0.7)] rounded-xl p-1.5">
                  {['Black & White', 'Color'].map((type) => (
                    <button key={type} type="button" onClick={() => setFormData(prev => ({ ...prev, print_type: type }))} className={`flex-1 text-sm py-2.5 rounded-lg font-bold transition-all ${ formData.print_type === type ? 'bg-[#1a1917] text-[#d4cebd] shadow-md' : 'text-[#3a3832] hover:text-[#1a1917]' }`}>{type === 'Black & White' ? 'B&W' : 'Color'}</button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#3a3832] uppercase tracking-wider">Sides</label>
                <div className="flex bg-[#cbc4b1] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),_inset_-1px_-1px_2px_rgba(255,255,255,0.7)] rounded-xl p-1.5">
                  {['Single-Sided', 'Double-Sided'].map((side) => (
                    <button key={side} type="button" onClick={() => setFormData(prev => ({ ...prev, sides: side }))} className={`flex-1 text-sm py-2.5 rounded-lg font-bold transition-all ${ formData.sides === side ? 'bg-[#1a1917] text-[#d4cebd] shadow-md' : 'text-[#3a3832] hover:text-[#1a1917]' }`}>{side.split('-')[0]}</button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-2">
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#3a3832] uppercase tracking-wider flex flex-col gap-0.5"><span>Pages (in PDF)</span><span className="text-[#1a1917]/50 normal-case font-medium text-xs">Min. 20 total printed pages</span></label>
                <input required type="number" min="1" name="pages" value={formData.pages} onChange={handleChange} className="w-full bg-[#cbc4b1] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),_inset_-1px_-1px_2px_rgba(255,255,255,0.7)] border-none rounded-xl py-3 px-4 font-medium focus:ring-2 focus:ring-[#c25134] outline-none" />
                {(parseInt(formData.pages) * parseInt(formData.copies)) < 20 && (
                  <p className="text-[#c25134] text-xs mt-1 font-bold">Total (Pages × Copies) must be 20+.</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#3a3832] uppercase tracking-wider">Copies</label>
                <input required type="number" min="1" name="copies" value={formData.copies} onChange={handleChange} className="w-full bg-[#cbc4b1] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),_inset_-1px_-1px_2px_rgba(255,255,255,0.7)] border-none rounded-xl py-3 px-4 font-medium focus:ring-2 focus:ring-[#c25134] outline-none" />
              </div>
            </div>
          </div>

          {/* Floating Checkout */}
          <div className="sticky bottom-0 w-full z-40 bg-[#d4cebd]/95 backdrop-blur-xl border-t-2 border-[#1a1917]/10 p-6 mt-12 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-sm font-bold text-[#3a3832] uppercase tracking-wider">Estimated Total</p>
                <p className="text-4xl font-black text-[#1a1917] font-serif [text-shadow:-1px_-1px_1px_rgba(0,0,0,0.2),_1px_1px_1px_rgba(255,255,255,0.8)]">₹{calculatedPrice}</p>
              </div>
              <button type="submit" disabled={(parseInt(formData.pages) * parseInt(formData.copies)) < 20} className="w-full sm:w-auto bg-[#c25134] hover:bg-[#a6432a] text-[#d4cebd] font-bold py-4 px-10 rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-lg shadow-lg tracking-wide">
                <ShoppingCart className="w-5 h-5" /> Add to Cart
              </button>
            </div>
          </div>
        </form>

      </div>
    </div>
  )
}