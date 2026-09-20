import React, { useState, useEffect, useMemo } from 'react'
import { supabase } from './supabaseClient'
import { CheckCircle2, Loader2, Link as LinkIcon, FileText, User, Phone, Package, Printer, BookOpen, Calculator } from 'lucide-react'

export default function OrderForm() {
  const [itemType, setItemType] = useState('Print') // 'Print', 'Register', 'Calculator'
  
  const [formData, setFormData] = useState({
    student_name: '',
    roll_number: '',
    whatsapp_number: '',
    // Print fields
    document_url: '',
    print_type: 'Black & White',
    sides: 'Double-Sided',
    pages: 20,
    copies: 1,
    // Stationery fields
    register_type: 'Rough Register (~200 pages)',
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
      
      let base = formData.print_type === 'Color' ? 50 : 25;
      let extra = formData.print_type === 'Color' ? 3 : 1.5;
      
      const extraPages = p - 20;
      price = base + (extraPages * extra);
      price = price * (parseInt(formData.copies) || 1);
    } else if (itemType === 'Register') {
      const base = formData.register_type.includes('Fair') ? 60 : 50;
      price = base * (parseInt(formData.quantity) || 1);
    } else if (itemType === 'Calculator') {
      price = 500 * (parseInt(formData.quantity) || 1);
    }
    return price;
  }, [itemType, formData.pages, formData.print_type, formData.copies, formData.register_type, formData.quantity]);

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      if (itemType === 'Print' && parseInt(formData.pages) < 20) {
        throw new Error("Minimum 20 pages required for print orders.");
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
        orderData.item_details = 'Scientific Calculator'
        orderData.copies = parseInt(formData.quantity)
      }

      const { error: submitError } = await supabase
        .from('orders')
        .insert([orderData])

      if (submitError) throw submitError
      
      setSuccess(true)
      // reset logic here...
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
    <div className="flex-1 flex items-center justify-center py-4">
      <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-6 sm:p-8 max-w-2xl w-full backdrop-blur-xl shadow-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Place an Order</h1>
          <p className="text-zinc-400 text-sm">Select what you need below.</p>
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
                <input
                  required
                  name="student_name"
                  value={formData.student_name}
                  onChange={handleChange}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all placeholder:text-zinc-600"
                  placeholder="Anant Thakkur"
                />
              </div>
            </div>
            
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-zinc-300">Roll Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FileText className="h-4 w-4 text-zinc-500" />
                </div>
                <input
                  required
                  name="roll_number"
                  value={formData.roll_number}
                  onChange={handleChange}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all placeholder:text-zinc-600"
                  placeholder="2023CS01"
                />
              </div>
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-sm font-medium text-zinc-300">WhatsApp Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-4 w-4 text-zinc-500" />
                </div>
                <input
                  required
                  type="tel"
                  name="whatsapp_number"
                  value={formData.whatsapp_number}
                  onChange={handleChange}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all placeholder:text-zinc-600"
                  placeholder="+91 98765 43210"
                />
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
                <div className=