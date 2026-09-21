import React, { useState, useEffect, useMemo } from 'react'
import { supabase } from './supabaseClient'
import { CheckCircle2, Loader2, Link as LinkIcon, FileText, User, Phone, Package, Printer, BookOpen, Calculator, Home, Wallet, Zap, MessageCircle, Users } from 'lucide-react'

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
    pages: 20,
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
      if (p < 20) return 0; // Invalid, handled on submit
      
      if (formData.print_type === 'Color') {
        price = p * 10;
      } else {
        price = 25 + ((p - 20) * 1.5);
      }
      
      if (formData.sides === 'Double-Sided') {
        price += 10;
      }
      
      price = price * (parseInt(formData.copies) || 1);
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
      if (itemType === 'Print' && parseInt(formData.pages) < 20) {
        throw new Error("Minimum 20 pages required for print orders.");
      }

      const { data: activeOrders, error: checkError } = await supabase
        .from('orders')
        .select('id')
        .eq('roll_number', formData.roll_number.trim())
        .in('status', ['Pending', 'Accepted', 'Printed']);

      if (checkError) throw checkError;

      if (activeOrders && activeOrders.length > 0) {
        throw new Error("Your previous order is still pending. You can only have one active order at a time.");
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
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 max-w-md w-full text-center space-y-4 shadow-2xl">
          <div className="mx-auto w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-white">Order Placed!</h2>
          <p className="text-zinc-400">
            We've received your request. We will message you on WhatsApp when it's ready.
          </p>
          <button
            onClick={() => {
              setSuccess(false);
              setFormData(prev => ({ ...prev, document_url: '', pages: 20, copies: 1, quantity: 1 }));
            }}
            className="mt-6 w-full bg-zinc-800 hover:bg-zinc-700 text-white font-medium py-3 px-4 rounded-xl transition-colors"
          >
            Place Another Order
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 w-full max-w-5xl mx-auto py-8 space-y-12">
      
      {/* HERO SECTION */}
      <div className="text-center space-y-4 px-4 mt-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Skip the Line. Order from your Room.<br className="hidden sm:block" />
          <span className="text-zinc-300">Get it in your Hand.</span>
        </h1>
        <p className="text-zinc-400 text-lg sm:text-xl max-w-2xl mx-auto">
          Print Studio ABESEC is the most affordable and convenient print & stationery provider on campus.
        </p>
      </div>

      {/* FEATURES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 max-w-4xl mx-auto">
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 space-y-4 hover:border-zinc-700 transition-colors">
          <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
            <Home className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-white font-semibold text-lg">Hand-to-Hand Delivery</h3>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Place orders from your hostel or home. We hand-deliver your prints directly to you on campus.
          </p>
        </div>
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 space-y-4 hover:border-zinc-700 transition-colors">
          <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
            <Wallet className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-white font-semibold text-lg">Unbeatable Prices</h3>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Why overpay at standard shops? Our prints, registers, and calculators are priced significantly lower than any other campus stationery.
          </p>
        </div>
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 space-y-4 hover:border-zinc-700 transition-colors">
          <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-white font-semibold text-lg">Premium Quality & Speed</h3>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Crisp pages, perfectly bound, delivered fast so you never miss a submission deadline.
          </p>
        </div>
      </div>

      {/* FORM SECTION */}
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-zinc-900/80 border border-zinc-800/80 rounded-3xl p-6 sm:p-10 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
          {/* subtle gradient glow behind the form */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Start Your Order</h2>
            <p className="text-zinc-400 text-sm">Select what you need below and we'll handle the rest.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center font-medium">
              {error}
            </div>
          )}

          <div className="flex gap-2 sm:gap-4 mb-8 bg-zinc-950 p-1 rounded-xl border border-zinc-800 overflow-x-auto">
            {[
              { id: 'Print', icon: Printer, label: 'Print Document' },
              { id: 'Register', icon: BookOpen, label: 'Registers' },
              { id: 'Calculator', icon: Calculator, label: 'Calculator' }
            ].map(type => (
              <button
                key={type.id}
                onClick={() => { setItemType(type.id); setError(''); }}
                className={`flex-1 min-w-[100px] flex items-center justify-center gap-2 py-3 px-3 rounded-lg text-sm font-semibold transition-all ${
                  itemType === type.id 
                  ? 'bg-white text-zinc-950 shadow-md' 
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                <type.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{type.label}</span>
                <span className="sm:hidden">{type.id}</span>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-5 bg-zinc-950/50 rounded-xl border border-zinc-800/50">
              <div className="space-y-1.5 sm:col-span-2">
                <h3 className="text-white font-medium mb-2 border-b border-zinc-800 pb-2">Personal Details</h3>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-zinc-300">Student Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-zinc-500" />
                  </div>
                  <input required name="student_name" value={formData.student_name} onChange={handleChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all placeholder:text-zinc-600" placeholder="Anant Thakkur" />
                </div>
              </div>
              
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-zinc-300">Roll Number/Admission Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FileText className="h-4 w-4 text-zinc-500" />
                  </div>
                  <input required name="roll_number" value={formData.roll_number} onChange={handleChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all placeholder:text-zinc-600" placeholder="2023CS01" />
                </div>
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-sm font-medium text-zinc-300">WhatsApp Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-4 w-4 text-zinc-500" />
                  </div>
                  <input required type="tel" name="whatsapp_number" value={formData.whatsapp_number} onChange={handleChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all placeholder:text-zinc-600" placeholder="+91 98765 43210" />
                </div>
              </div>
            </div>

            {/* PRINT SECTION */}
            {itemType === 'Print' && (
              <div className="space-y-5 p-5 bg-zinc-950/50 rounded-xl border border-zinc-800/50">
                 <div className="space-y-1.5">
                  <h3 className="text-white font-medium mb-2 border-b border-zinc-800 pb-2">Print Details</h3>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-zinc-300 flex justify-between">
                    Document Link
                    <span className="text-zinc-500 text-xs font-normal">Must be "Anyone with link"</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <LinkIcon className="h-4 w-4 text-zinc-500" />
                    </div>
                    <input required type="url" name="document_url" value={formData.document_url} onChange={handleChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all placeholder:text-zinc-600" placeholder="https://drive.google.com/file/d/..." />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-zinc-300">Color Type</label>
                    <div className="flex bg-zinc-950 rounded-xl border border-zinc-800 p-1">
                      {['Black & White', 'Color'].map((type) => (
                        <button key={type} type="button" onClick={() => setFormData(prev => ({ ...prev, print_type: type }))} className={`flex-1 text-xs py-2 rounded-lg font-medium transition-all ${ formData.print_type === type ? 'bg-white text-zinc-950 shadow-sm' : 'text-zinc-400 hover:text-zinc-200' }`}>
                          {type === 'Black & White' ? 'B&W' : 'Color'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-medium text-zinc-300">Sides</label>
                    <div className="flex bg-zinc-950 rounded-xl border border-zinc-800 p-1">
                      {['Single-Sided', 'Double-Sided'].map((side) => (
                        <button key={side} type="button" onClick={() => setFormData(prev => ({ ...prev, sides: side }))} className={`flex-1 text-xs py-2 rounded-lg font-medium transition-all ${ formData.sides === side ? 'bg-white text-zinc-950 shadow-sm' : 'text-zinc-400 hover:text-zinc-200' }`}>
                          {side.split('-')[0]}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5 pt-2">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-zinc-300 flex flex-col gap-0.5">
                      <span>Total Pages (in PDF)</span>
                      <span className="text-zinc-500 text-xs font-normal">Only 20+ pages are allowed</span>
                    </label>
                    <input required type="number" min="20" name="pages" value={formData.pages} onChange={handleChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all" />
                    {parseInt(formData.pages) < 20 && (
                      <p className="text-red-400 text-xs mt-1">Minimum 20 pages required.</p>
                    )}
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-zinc-300">Number of Copies</label>
                    <input required type="number" min="1" name="copies" value={formData.copies} onChange={handleChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all" />
                  </div>
                </div>
              </div>
            )}

            {/* REGISTER SECTION */}
            {itemType === 'Register' && (
              <div className="space-y-5 p-5 bg-zinc-950/50 rounded-xl border border-zinc-800/50">
                <div className="space-y-1.5">
                  <h3 className="text-white font-medium mb-2 border-b border-zinc-800 pb-2">Register Details</h3>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-zinc-300">Select Register</label>
                  <select name="register_type" value={formData.register_type} onChange={handleChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all text-white appearance-none">
                    <option value="Spiral (~400 pages) - ₹180">Spiral (~400 pages) - ₹180</option>
                    <option value="Register (~200 pages) - ₹70">Register (~200 pages) - ₹70</option>
                    <option value="Register (~200 pages) - ₹60">Register (~200 pages) - ₹60</option>
                    <option value="Yellow Pages Register (~200 pages) - ₹50">Yellow Pages Register (~200 pages) - ₹50</option>
                    <option value="Copy - ₹30">Copy - ₹30</option>
                    <option value="Copy - ₹20">Copy - ₹20</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-zinc-300">Quantity</label>
                  <input required type="number" min="1" name="quantity" value={formData.quantity} onChange={handleChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all" />
                </div>
              </div>
            )}

            {/* CALCULATOR SECTION */}
            {itemType === 'Calculator' && (
              <div className="space-y-5 p-5 bg-zinc-950/50 rounded-xl border border-zinc-800/50">
                <div className="space-y-1.5">
                  <h3 className="text-white font-medium mb-2 border-b border-zinc-800 pb-2">Calculator Details</h3>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-zinc-300">Select Calculator</label>
                  <select name="calculator_type" value={formData.calculator_type} onChange={handleChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all text-white appearance-none">
                    <option value="100MS - ₹1000">100MS - ₹1000</option>
                    <option value="991ES - ₹1250">991ES - ₹1250</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-zinc-300">Quantity</label>
                  <input required type="number" min="1" name="quantity" value={formData.quantity} onChange={handleChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all" />
                </div>
              </div>
            )}

            {/* PRICE SUMMARY */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-400">Estimated Total</p>
                <p className="text-xs text-zinc-500 mt-0.5">Pay upon pickup</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-white">
                  ₹{calculatedPrice}
                </p>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || (itemType === 'Print' && parseInt(formData.pages) < 20)}
              className="w-full bg-white hover:bg-zinc-200 text-zinc-950 font-bold py-4 px-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg shadow-lg"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                `Place Order • ₹${calculatedPrice}`
              )}
            </button>
          </form>
        </div>
      </div>
      {/* OUR INITIATIVE SECTION */}
      <div className="max-w-4xl mx-auto px-4 pb-4">
        <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-3xl p-8 sm:p-12 text-center space-y-6">
          <div className="inline-flex items-center justify-center p-3 bg-zinc-800/50 rounded-2xl mb-2">
            <Users className="w-6 h-6 text-zinc-300" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">A Student-Led Initiative</h2>
          <p className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
            Print Studio ABESEC is a self-funded, independent initiative started by <strong className="text-zinc-200">Anant Thakkur</strong> and <strong className="text-zinc-200">Sribendu Prasad Muduli</strong>. We built this to solve a problem we faced every day: the hassle of overpriced, slow, and inconvenient printing. We are dedicated to providing our fellow engineering students with a seamless, affordable alternative.
          </p>
          <p className="text-zinc-500 italic text-sm mt-6">
            🤫 Legend says if the faculty finds out about these prices, the matrix will collapse. Let's keep this our little secret.
          </p>
        </div>
      </div>

      {/* CUSTOM BANNER */}
      <div className="max-w-2xl mx-auto px-4 pb-8">
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-zinc-500 to-transparent opacity-20"></div>
          
          <div className="text-center sm:text-left flex-1">
            <h3 className="text-xl font-bold text-white mb-2">Custom Orders & Lab Manuals</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Need full Lab Manuals, bulk Xeroxes, or custom spiral binding? We do that too at heavy student discounts.
            </p>
          </div>
          
          <a
            href="https://wa.me/917982350793"
            target="_blank"
            rel="noreferrer"
            className="shrink-0 bg-white hover:bg-zinc-200 text-zinc-950 font-bold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            <MessageCircle className="w-5 h-5" />
            Message Us
          </a>
        </div>
      </div>
    </div>
  )
}
