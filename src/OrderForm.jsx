import React, { useState, useMemo } from 'react'
import { supabase } from './supabaseClient'
import { CheckCircle2, Loader2, Link as LinkIcon, FileText, User, Phone, MessageCircle, Users } from 'lucide-react'

export default function OrderForm() {
  const [itemType, setItemType] = useState('Print') // 'Print', 'Register', 'Calculator'

  const [formData, setFormData] = useState({
    student_name: '',
    roll_number: '',
    whatsapp_number: '',
    // Print fields
    document_url: '',
    print_type: 'Black & White',
    sides: 'Single-Sided',
    pages: 1,
    copies: 1,
    // Stationery fields
    register_type: 'Spiral (~400 pages) - ₹180',
    calculator_type: '100MS - ₹1000',
    quantity: 1
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const calculatedPrice = useMemo(() => {
    let price = 0;
    if (itemType === 'Print') {
      const p = parseInt(formData.pages) || 0;
      const c = parseInt(formData.copies) || 1;
      const totalPages = p * c;

      if (totalPages < 20) return 0; // Invalid, handled on submit

      if (formData.print_type === 'Color') {
        price = totalPages * 10;
      } else {
        price = 25 + ((totalPages - 20) * 1.5);
      }

      if (formData.sides === 'Double-Sided') {
        price += 10;
      }
    } else if (itemType === 'Register') {
      let base = 180;
      if (formData.register_type.includes('₹70')) base = 70;
      else if (formData.register_type.includes('₹60')) base = 60;
      else if (formData.register_type.includes('₹50')) base = 50;
      else if (formData.register_type.includes('₹30')) base = 30;
      else if (formData.register_type.includes('₹20')) base = 20;
      price = base * (parseInt(formData.quantity) || 1);
    } else if (itemType === 'Calculator') {
      let base = formData.calculator_type.includes('991ES') ? 1250 : 1000;
      price = base * (parseInt(formData.quantity) || 1);
    }
    return price;
  }, [itemType, formData.pages, formData.print_type, formData.sides, formData.copies, formData.register_type, formData.calculator_type, formData.quantity]);

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const p = parseInt(formData.pages) || 0;
      const c = parseInt(formData.copies) || 1;

      if (itemType === 'Print' && (p * c) < 20) {
        throw new Error("Total combined pages (Pages × Copies) must be at least 20.");
      }

      const { data: activeOrders, error: checkError } = await supabase
        .from('orders')
        .select('id')
        .eq('roll_number', formData.roll_number.trim())
        .in('status', ['Pending', 'Accepted', 'Printed']);

      if (checkError) throw checkError;

      if (activeOrders && activeOrders.length > 0) {
        throw new Error("Your previous order is still active. You can only have one active order at a time.");
      }

      const orderData = {
        student_name: formData.student_name,
        roll_number: formData.roll_number,
        whatsapp_number: formData.whatsapp_number,
        item_type: itemType,
        total_price: calculatedPrice
      }

      if (itemType === 'Print') {
        orderData.document_url = formData.document_url
        orderData.print_type = formData.print_type
        orderData.sides = formData.sides
        orderData.copies = parseInt(formData.copies)
        orderData.item_details = `${formData.pages} Pages`
      } else if (itemType === 'Register') {
        orderData.item_details = formData.register_type
        orderData.copies = parseInt(formData.quantity) // using copies column to store quantity
      } else if (itemType === 'Calculator') {
        orderData.item_details = formData.calculator_type
        orderData.copies = parseInt(formData.quantity)
      }

      const { error: submitError } = await supabase
        .from('orders')
        .insert([orderData])

      if (submitError) throw submitError

      setSuccess(true)
    } catch (err) {
      console.error(err)
      setError(err.message || 'Failed to place order. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="flex-1 w-full flex items-center justify-center bg-[#d4cebd] p-4 font-sans min-h-[60vh]">
        <div className="bg-[#cbc4b1] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),_inset_-1px_-1px_2px_rgba(255,255,255,0.7)] rounded-3xl p-8 sm:p-12 max-w-md w-full text-center space-y-6">
          <div className="mx-auto w-20 h-20 bg-[#1a1917] rounded-full flex items-center justify-center shadow-xl">
            <CheckCircle2 className="w-10 h-10 text-[#d4cebd]" />
          </div>
          <h2 className="text-3xl font-bold font-serif text-[#1a1917] [text-shadow:-1px_-1px_1px_rgba(0,0,0,0.2),_1px_1px_1px_rgba(255,255,255,0.8)]">Order Placed!</h2>
          <p className="text-[#3a3832] font-medium text-lg leading-relaxed">
            We've received your request. We will message you on WhatsApp when it's ready.
          </p>
          <button
            onClick={() => {
              setSuccess(false);
              setFormData(prev => ({ ...prev, document_url: '', pages: 1, copies: 1, quantity: 1 }));
            }}
            className="mt-8 w-full bg-[#c25134] hover:bg-[#a6432a] text-[#d4cebd] font-bold py-4 px-6 rounded-xl transition-all shadow-lg tracking-wide"
          >
            Place Another Order
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 w-full flex flex-col font-sans">

      {/* HERO SECTION - DARK PAPER */}
      <div className="bg-[#1a1917] pt-16 pb-24 px-4 text-center">
        <h1 className="text-5xl sm:text-7xl font-black text-[#d4cebd] tracking-tighter leading-tight max-w-4xl mx-auto">
          Skip the Line. Order from your Room.<br className="hidden sm:block" />
          <span className="text-white">Get it in your Hand.</span>
        </h1>
        <p className="text-[#a09c91] text-lg sm:text-2xl max-w-2xl mx-auto mt-6 font-medium font-serif italic">
          Place orders from your hostel or home. We provide <strong className="text-[#c25134]">Hand-to-Hand Delivery</strong> directly to you on campus.
        </p>
      </div>

      {/* TORN PAPER SVG TRANSITION */}
      <div className="w-full -mt-8 relative z-10">
        <svg viewBox="0 0 1440 48" className="w-full h-8 sm:h-12 fill-[#d4cebd] preserve-3d" preserveAspectRatio="none">
          <path d="M0 48h1440V0c-25.6 0-51.2 12-76.8 16-25.6 4-51.2-4-76.8 0-25.6 4-51.2 16-76.8 20-25.6 4-51.2-4-76.8 0-25.6 4-51.2 12-76.8 16-25.6 4-51.2-4-76.8 0-25.6 4-51.2 16-76.8 20-25.6 4-51.2-4-76.8 0-25.6 4-51.2 12-76.8 16-25.6 4-51.2-4-76.8 0v48z"></path>
        </svg>
      </div>

      {/* MAIN FORM SECTION - LIGHT PAPER */}
      <div className="bg-[#d4cebd] flex-1 w-full text-[#1a1917]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-12 pb-32 space-y-16">

          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4 font-serif text-[#1a1917] [text-shadow:-1px_-1px_1px_rgba(0,0,0,0.2),_1px_1px_1px_rgba(255,255,255,0.8)]">What do you need today?</h2>
            <p className="text-[#5a5750] font-medium">Select a category below to configure your order.</p>
          </div>

          {/* PRODUCT SELECTION GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Print Card */}
            <div
              onClick={() => { setItemType('Print'); setError(''); }}
              className={`cursor-pointer group relative rounded-2xl overflow-hidden transition-all duration-300 ${itemType === 'Print' ? 'ring-2 ring-[#c25134] shadow-lg bg-[#d4cebd]' : 'bg-[#cbc4b1] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),_inset_-1px_-1px_2px_rgba(255,255,255,0.7)]'
                }`}
            >
              <div className="h-48 p-6 flex items-center justify-center border-b border-black/5">
                <img src="/print.jpg" alt="Document Printing" className="h-48 w-full object-contain grayscale contrast-125 mix-blend-multiply opacity-80 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="p-6">
                <h3 className={`text-xl font-bold mb-2 flex items-center justify-between ${itemType === 'Print' ? 'text-[#c25134] [text-shadow:-1px_-1px_1px_rgba(0,0,0,0.2),_1px_1px_1px_rgba(255,255,255,0.8)]' : 'text-[#1a1917]'}`}>
                  Document Printing
                  {itemType === 'Print' && <CheckCircle2 className="w-5 h-5 text-[#c25134]" />}
                </h3>
                <p className="text-[#5a5750] text-sm mb-4 font-medium">High-quality B&W or Color prints.</p>
                <div className="inline-block bg-[#1a1917] px-3 py-1.5 rounded text-sm text-[#d4cebd] font-bold tracking-wide">Starting at ₹25</div>
              </div>
            </div>

            {/* Register Card */}
            <div
              onClick={() => { setItemType('Register'); setError(''); }}
              className={`cursor-pointer group relative rounded-2xl overflow-hidden transition-all duration-300 ${itemType === 'Register' ? 'ring-2 ring-[#c25134] shadow-lg bg-[#d4cebd]' : 'bg-[#cbc4b1] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),_inset_-1px_-1px_2px_rgba(255,255,255,0.7)]'
                }`}
            >
              <div className="h-48 p-6 flex items-center justify-center border-b border-black/5">
                <img src="/register.jpg" alt="College Registers" className="h-48 w-full object-contain grayscale contrast-125 mix-blend-multiply opacity-80 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="p-6">
                <h3 className={`text-xl font-bold mb-2 flex items-center justify-between ${itemType === 'Register' ? 'text-[#c25134] [text-shadow:-1px_-1px_1px_rgba(0,0,0,0.2),_1px_1px_1px_rgba(255,255,255,0.8)]' : 'text-[#1a1917]'}`}>
                  College Registers
                  {itemType === 'Register' && <CheckCircle2 className="w-5 h-5 text-[#c25134]" />}
                </h3>
                <p className="text-[#5a5750] text-sm mb-4 font-medium">Rough, Fair, and Spiral notebooks.</p>
                <div className="inline-block bg-[#1a1917] px-3 py-1.5 rounded text-sm text-[#d4cebd] font-bold tracking-wide">Starting at ₹50</div>
              </div>
            </div>

            {/* Calculator Card */}
            <div
              onClick={() => { setItemType('Calculator'); setError(''); }}
              className={`cursor-pointer group relative rounded-2xl overflow-hidden transition-all duration-300 ${itemType === 'Calculator' ? 'ring-2 ring-[#c25134] shadow-lg bg-[#d4cebd]' : 'bg-[#cbc4b1] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),_inset_-1px_-1px_2px_rgba(255,255,255,0.7)]'
                }`}
            >
              <div className="h-48 p-6 flex items-center justify-center border-b border-black/5">
                <img src="/calculator.jpg" alt="Scientific Calculators" className="h-48 w-full object-contain grayscale contrast-125 mix-blend-multiply opacity-80 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="p-6">
                <h3 className={`text-xl font-bold mb-2 flex items-center justify-between ${itemType === 'Calculator' ? 'text-[#c25134] [text-shadow:-1px_-1px_1px_rgba(0,0,0,0.2),_1px_1px_1px_rgba(255,255,255,0.8)]' : 'text-[#1a1917]'}`}>
                  Calculators
                  {itemType === 'Calculator' && <CheckCircle2 className="w-5 h-5 text-[#c25134]" />}
                </h3>
                <p className="text-[#5a5750] text-sm mb-4 font-medium">100MS and 991ES Engineering models.</p>
                <div className="inline-block bg-[#1a1917] px-3 py-1.5 rounded text-sm text-[#d4cebd] font-bold tracking-wide">Starting at ₹1000</div>
              </div>
            </div>
          </div>

          {/* DYNAMIC CONFIGURATION SECTION */}
          <form onSubmit={handleSubmit} className="relative mt-12 max-w-4xl mx-auto">

            {error && (
              <div className="mb-8 p-4 bg-[#c25134]/10 border border-[#c25134]/30 rounded-xl text-[#c25134] text-sm text-center font-bold">
                {error}
              </div>
            )}

            <div className="space-y-12">

              {/* Personal Details */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold font-serif text-[#1a1917] border-b-2 border-black/10 pb-2 [text-shadow:-1px_-1px_1px_rgba(0,0,0,0.2),_1px_1px_1px_rgba(255,255,255,0.8)]">Personal Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#3a3832] uppercase tracking-wider">Student Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-[#1a1917]/50" />
                      </div>
                      <input required name="student_name" value={formData.student_name} onChange={handleChange} className="w-full bg-[#cbc4b1] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),_inset_-1px_-1px_2px_rgba(255,255,255,0.7)] border-none rounded-xl py-3 pl-10 pr-4 text-base font-medium text-[#1a1917] focus:outline-none focus:ring-2 focus:ring-[#c25134] transition-all placeholder:text-[#1a1917]/40" placeholder="Anant Thakkur" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#3a3832] uppercase tracking-wider">Roll Number</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FileText className="h-5 w-5 text-[#1a1917]/50" />
                      </div>
                      <input required name="roll_number" value={formData.roll_number} onChange={handleChange} className="w-full bg-[#cbc4b1] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),_inset_-1px_-1px_2px_rgba(255,255,255,0.7)] border-none rounded-xl py-3 pl-10 pr-4 text-base font-medium text-[#1a1917] focus:outline-none focus:ring-2 focus:ring-[#c25134] transition-all placeholder:text-[#1a1917]/40" placeholder="2023CS01" />
                    </div>
                  </div>

                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-sm font-bold text-[#3a3832] uppercase tracking-wider">WhatsApp Number</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-[#1a1917]/50" />
                      </div>
                      <input required type="tel" name="whatsapp_number" value={formData.whatsapp_number} onChange={handleChange} className="w-full bg-[#cbc4b1] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),_inset_-1px_-1px_2px_rgba(255,255,255,0.7)] border-none rounded-xl py-3 pl-10 pr-4 text-base font-medium text-[#1a1917] focus:outline-none focus:ring-2 focus:ring-[#c25134] transition-all placeholder:text-[#1a1917]/40" placeholder="+91 98765 43210" />
                    </div>
                  </div>
                </div>
              </div>

              {/* PRINT SECTION */}
              {itemType === 'Print' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold font-serif text-[#1a1917] border-b-2 border-black/10 pb-2 [text-shadow:-1px_-1px_1px_rgba(0,0,0,0.2),_1px_1px_1px_rgba(255,255,255,0.8)]">Print Details</h3>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#3a3832] uppercase tracking-wider flex justify-between">
                      Document Link
                      <span className="text-[#1a1917]/50 normal-case font-medium">Must be "Anyone with link"</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <LinkIcon className="h-5 w-5 text-[#1a1917]/50" />
                      </div>
                      <input required type="url" name="document_url" value={formData.document_url} onChange={handleChange} className="w-full bg-[#cbc4b1] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),_inset_-1px_-1px_2px_rgba(255,255,255,0.7)] border-none rounded-xl py-3 pl-10 pr-4 text-base font-medium text-[#1a1917] focus:outline-none focus:ring-2 focus:ring-[#c25134] transition-all placeholder:text-[#1a1917]/40" placeholder="https://drive.google.com/file/d/..." />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-[#3a3832] uppercase tracking-wider">Color Type</label>
                      <div className="flex bg-[#cbc4b1] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),_inset_-1px_-1px_2px_rgba(255,255,255,0.7)] rounded-xl p-1.5">
                        {['Black & White', 'Color'].map((type) => (
                          <button key={type} type="button" onClick={() => setFormData(prev => ({ ...prev, print_type: type }))} className={`flex-1 text-sm py-2.5 rounded-lg font-bold transition-all ${formData.print_type === type ? 'bg-[#1a1917] text-[#d4cebd] shadow-md' : 'text-[#3a3832] hover:text-[#1a1917]'}`}>
                            {type === 'Black & White' ? 'B&W' : 'Color'}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-[#3a3832] uppercase tracking-wider">Sides</label>
                      <div className="flex bg-[#cbc4b1] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),_inset_-1px_-1px_2px_rgba(255,255,255,0.7)] rounded-xl p-1.5">
                        {['Single-Sided', 'Double-Sided'].map((side) => (
                          <button key={side} type="button" onClick={() => setFormData(prev => ({ ...prev, sides: side }))} className={`flex-1 text-sm py-2.5 rounded-lg font-bold transition-all ${formData.sides === side ? 'bg-[#1a1917] text-[#d4cebd] shadow-md' : 'text-[#3a3832] hover:text-[#1a1917]'}`}>
                            {side.split('-')[0]}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6 pt-2">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-[#3a3832] uppercase tracking-wider flex flex-col gap-0.5">
                        <span>Pages (in PDF)</span>
                        <span className="text-[#1a1917]/50 normal-case font-medium text-xs">Min. 20 total printed pages</span>
                      </label>
                      <input required type="number" min="1" name="pages" value={formData.pages} onChange={handleChange} className="w-full bg-[#cbc4b1] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),_inset_-1px_-1px_2px_rgba(255,255,255,0.7)] border-none rounded-xl py-3 px-4 text-base font-medium text-[#1a1917] focus:outline-none focus:ring-2 focus:ring-[#c25134] transition-all" />
                      {(parseInt(formData.pages) * parseInt(formData.copies)) < 20 && (
                        <p className="text-[#c25134] text-xs mt-1 font-bold">Total (Pages × Copies) must be 20+.</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-[#3a3832] uppercase tracking-wider">Copies</label>
                      <input required type="number" min="1" name="copies" value={formData.copies} onChange={handleChange} className="w-full bg-[#cbc4b1] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),_inset_-1px_-1px_2px_rgba(255,255,255,0.7)] border-none rounded-xl py-3 px-4 text-base font-medium text-[#1a1917] focus:outline-none focus:ring-2 focus:ring-[#c25134] transition-all" />
                    </div>
                  </div>
                </div>
              )}

              {/* REGISTER SECTION */}
              {itemType === 'Register' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold font-serif text-[#1a1917] border-b-2 border-black/10 pb-2 [text-shadow:-1px_-1px_1px_rgba(0,0,0,0.2),_1px_1px_1px_rgba(255,255,255,0.8)]">Register Details</h3>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#3a3832] uppercase tracking-wider">Select Register</label>
                    <select name="register_type" value={formData.register_type} onChange={handleChange} className="w-full bg-[#cbc4b1] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),_inset_-1px_-1px_2px_rgba(255,255,255,0.7)] border-none rounded-xl py-3 px-4 text-base font-medium text-[#1a1917] focus:outline-none focus:ring-2 focus:ring-[#c25134] transition-all appearance-none">
                      <option value="Spiral (~400 pages) - ₹180">Spiral (~400 pages) - ₹180</option>
                      <option value="Register (~200 pages) - ₹70">Register (~200 pages) - ₹70</option>
                      <option value="Register (~200 pages) - ₹60">Register (~200 pages) - ₹60</option>
                      <option value="Yellow Pages Register (~200 pages) - ₹50">Yellow Pages Register (~200 pages) - ₹50</option>
                      <option value="Copy - ₹30">Copy - ₹30</option>
                      <option value="Copy - ₹20">Copy - ₹20</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#3a3832] uppercase tracking-wider">Quantity</label>
                    <input required type="number" min="1" name="quantity" value={formData.quantity} onChange={handleChange} className="w-full bg-[#cbc4b1] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),_inset_-1px_-1px_2px_rgba(255,255,255,0.7)] border-none rounded-xl py-3 px-4 text-base font-medium text-[#1a1917] focus:outline-none focus:ring-2 focus:ring-[#c25134] transition-all" />
                  </div>
                </div>
              )}

              {/* CALCULATOR SECTION */}
              {itemType === 'Calculator' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold font-serif text-[#1a1917] border-b-2 border-black/10 pb-2 [text-shadow:-1px_-1px_1px_rgba(0,0,0,0.2),_1px_1px_1px_rgba(255,255,255,0.8)]">Calculator Details</h3>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#3a3832] uppercase tracking-wider">Select Calculator</label>
                    <select name="calculator_type" value={formData.calculator_type} onChange={handleChange} className="w-full bg-[#cbc4b1] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),_inset_-1px_-1px_2px_rgba(255,255,255,0.7)] border-none rounded-xl py-3 px-4 text-base font-medium text-[#1a1917] focus:outline-none focus:ring-2 focus:ring-[#c25134] transition-all appearance-none">
                      <option value="100MS - ₹1000">100MS - ₹1000</option>
                      <option value="991ES - ₹1250">991ES - ₹1250</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#3a3832] uppercase tracking-wider">Quantity</label>
                    <input required type="number" min="1" name="quantity" value={formData.quantity} onChange={handleChange} className="w-full bg-[#cbc4b1] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),_inset_-1px_-1px_2px_rgba(255,255,255,0.7)] border-none rounded-xl py-3 px-4 text-base font-medium text-[#1a1917] focus:outline-none focus:ring-2 focus:ring-[#c25134] transition-all" />
                  </div>
                </div>
              )}
            </div>

            {/* FLOATING CHECKOUT BAR */}
            <div className="sticky bottom-0 w-full z-40 bg-[#d4cebd]/95 backdrop-blur-xl border-t-2 border-[#1a1917]/10 p-6 mt-12 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <p className="text-sm font-bold text-[#3a3832] uppercase tracking-wider">Estimated Total</p>
                  <p className="text-4xl font-black text-[#1a1917] font-serif [text-shadow:-1px_-1px_1px_rgba(0,0,0,0.2),_1px_1px_1px_rgba(255,255,255,0.8)]">₹{calculatedPrice}</p>
                </div>
                <button
                  type="submit"
                  disabled={loading || (itemType === 'Print' && (parseInt(formData.pages) * parseInt(formData.copies)) < 20)}
                  className="w-full sm:w-auto bg-[#c25134] hover:bg-[#a6432a] text-[#d4cebd] font-bold py-4 px-10 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg shadow-lg tracking-wide"
                >
                  {loading ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
                  ) : (
                    'Confirm Request'
                  )}
                </button>
              </div>
            </div>
          </form>

          {/* OUR INITIATIVE SECTION */}
          <div className="max-w-4xl mx-auto mt-24">
            <div className="bg-[#cbc4b1] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),_inset_-1px_-1px_2px_rgba(255,255,255,0.7)] rounded-3xl p-8 sm:p-12 text-center space-y-6">
              <div className="inline-flex items-center justify-center p-3 bg-[#1a1917] rounded-2xl mb-2 shadow-lg">
                <Users className="w-6 h-6 text-[#d4cebd]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#1a1917] tracking-tight [text-shadow:-1px_-1px_1px_rgba(0,0,0,0.2),_1px_1px_1px_rgba(255,255,255,0.8)]">A Student-Led Initiative</h2>
              <p className="text-[#3a3832] text-base sm:text-lg leading-relaxed max-w-3xl mx-auto font-medium">
                Print Studio ABESEC is a self-funded, independent initiative started by <strong className="text-[#1a1917]">Anant Thakkur</strong> and <strong className="text-[#1a1917]">Sribendu Prasad Muduli</strong>. We built this to solve a problem we faced every day: the hassle of overpriced, slow, and inconvenient printing. We are dedicated to providing our fellow engineering students with a seamless, affordable alternative.
              </p>
              <p className="text-[#c25134] font-serif italic text-sm mt-6 font-semibold">
                🤫 Legend says if the faculty finds out about these prices, the matrix will collapse. Let's keep this our little secret.
              </p>
            </div>
          </div>

          {/* CUSTOM BANNER */}
          <div className="max-w-4xl mx-auto pb-16">
            <div className="bg-[#1a1917] rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
              <div className="text-center sm:text-left flex-1">
                <h3 className="text-xl font-bold text-[#d4cebd] mb-2 font-serif">Custom Orders & Lab Manuals</h3>
                <p className="text-[#a09c91] text-sm leading-relaxed font-medium">
                  Need full Lab Manuals, bulk Xeroxes, or custom spiral binding? We do that too at heavy student discounts.
                </p>
              </div>

              <a
                href="https://wa.me/917982350793"
                target="_blank"
                rel="noreferrer"
                className="shrink-0 bg-[#c25134] hover:bg-[#a6432a] text-[#d4cebd] font-bold py-3 px-8 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <MessageCircle className="w-5 h-5" />
                Message Us
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}